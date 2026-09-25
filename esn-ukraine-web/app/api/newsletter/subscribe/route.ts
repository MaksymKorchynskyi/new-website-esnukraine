import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ipAddress } from '@vercel/functions';

export const runtime = 'edge';

// ==========================================
// RATE LIMITING (Upstash Redis)
// ==========================================
const redisUrl = process.env.KV_REST_API_URL;
const redisToken = process.env.KV_REST_API_TOKEN;

// Initialize ratelimit only if credentials are provided (graceful degradation for local dev)
const ratelimit = redisUrl && redisToken
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute per IP
      analytics: false,
    })
  : null;

// ==========================================
// VALIDATION SCHEMA
// ==========================================
const SubscribeSchema = z.object({
  email: z.string().trim().max(254, { message: 'Email is too long.' }).email({ message: 'Please enter a valid email address.' }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Privacy consent is required.',
  }),
  // Trap field for dumb bots
  honeypot: z.string().optional(),
});

// ==========================================
// POST HANDLER
// ==========================================
export async function POST(req: NextRequest) {
  try {
    // 1. CORS / Origin Check (Basic CSRF protection)
    const referer = req.headers.get('referer') || '';
    const origin = req.headers.get('origin') || '';
    
    // True only in production (ignores Vercel Preview deployments to allow testing)
    const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';
    
    // In production, ensure the request comes from the ESN Ukraine domain
    if (isProd) {
      let isAllowed = false;

      try {
        const originUrl = origin ? new URL(origin) : null;
        const refererUrl = referer ? new URL(referer) : null;
        
        const isValidOrigin = originUrl && (originUrl.hostname === 'esnukraine.org' || originUrl.hostname.endsWith('.esnukraine.org'));
        const isValidReferer = refererUrl && (refererUrl.hostname === 'esnukraine.org' || refererUrl.hostname.endsWith('.esnukraine.org'));
        
        isAllowed = !!(isValidOrigin || isValidReferer);
      } catch (e) {
        // Invalid URL format
        isAllowed = false;
      }

      if (!isAllowed) {
        console.warn(`[Newsletter] Blocked unauthorized origin/referer: Origin=${origin}, Referer=${referer}`);
        return NextResponse.json(
          { success: false, error: 'Unauthorized origin.' },
          { status: 403 }
        );
      }
    }

    // 2. Secure IP Extraction
    // Using official @vercel/functions to securely extract the client IP.
    const ip = ipAddress(req) ?? '127.0.0.1';

    // 3. Upstash Redis Rate Limiting
    if (ratelimit) {
      const { success, reset } = await ratelimit.limit(ip);
      
      if (!success) {
        const retryAfter = Math.floor((reset - Date.now()) / 1000);
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again later.' },
          { 
            status: 429,
            headers: { 'Retry-After': String(retryAfter) }
          }
        );
      }
    } else if (isProd) {
      console.error('[Newsletter] CRITICAL: Upstash Redis credentials missing! Rate limiting disabled in production.');
      return NextResponse.json(
        { success: false, error: 'Service Unavailable' },
        { status: 503 }
      );
    }

    // 4. Parse request body
    let bodyData: unknown;
    try {
      bodyData = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' }, 
        { status: 400 }
      );
    }

    // 5. Schema Validation
    const result = SubscribeSchema.safeParse(bodyData);
    if (!result.success) {
      const errorMessage = result.error.issues?.[0]?.message || 'Invalid input data.';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

    const { email, honeypot } = result.data;

    // 6. Honeypot check for bots
    if (honeypot) {
      // Silently accept without subscribing to fool bots
      return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
    }

    const normalizedEmail = email.toLowerCase();

    // 7. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('[Newsletter] RESEND_API_KEY or RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { success: false, error: 'Newsletter service is temporarily unavailable.' },
        { status: 503 }
      );
    }

    // 8. Add contact to Resend Audience
    const resend = new Resend(apiKey);
    const { data, error } = await resend.contacts.create({
      email: normalizedEmail,
      unsubscribed: false,
      audienceId,
    });

    if (error) {
      // Improved duplicate checking
      const isDuplicate = error.name === 'validation_error' || error.message?.toLowerCase().includes('already exists');
      
      if (isDuplicate) {
        console.log('[Newsletter] Duplicate subscription attempt blocked.');
        return NextResponse.json({
          success: true,
          message: "Welcome aboard! You've been subscribed to our newsletter.",
        });
      }

      console.error('[Newsletter] Resend API error:', error);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again later.' },
        { status: 500 }
      );
    }

    // 9. Success
    return NextResponse.json({
      success: true,
      message: 'Welcome aboard! You\'ve been subscribed to our newsletter.',
      contactId: data?.id,
    });
  } catch (error) {
    console.error('[Newsletter] Unexpected subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
