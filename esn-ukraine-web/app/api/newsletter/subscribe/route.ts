import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { clientKey, getRatelimit, isAllowedOrigin, isProduction } from '@/lib/server/request-guards';

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

const SUCCESS_MESSAGE = "Welcome aboard! You've been subscribed to our newsletter.";

// ==========================================
// POST HANDLER
// ==========================================
export async function POST(req: NextRequest) {
  try {
    // 1. Origin / Referer check (basic CSRF protection, production only)
    if (!isAllowedOrigin(req)) {
      console.warn('[Newsletter] Blocked request from an unauthorized origin.');
      return NextResponse.json({ success: false, error: 'Unauthorized origin.' }, { status: 403 });
    }

    // 2. Upstash Redis rate limiting: 5 requests per minute per (hashed) IP
    const ratelimit = getRatelimit('newsletter', 5, '1 m');
    if (ratelimit) {
      const { success, reset } = await ratelimit.limit(clientKey(req));
      if (!success) {
        const retryAfter = Math.max(1, Math.floor((reset - Date.now()) / 1000));
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again later.' },
          { status: 429, headers: { 'Retry-After': String(retryAfter) } },
        );
      }
    } else if (isProduction) {
      console.error('[Newsletter] CRITICAL: Upstash Redis credentials missing! Rate limiting disabled in production.');
      return NextResponse.json({ success: false, error: 'Service Unavailable' }, { status: 503 });
    }

    // 3. Parse request body
    let bodyData: unknown;
    try {
      bodyData = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
    }

    // 4. Schema validation
    const result = SubscribeSchema.safeParse(bodyData);
    if (!result.success) {
      const errorMessage = result.error.issues?.[0]?.message || 'Invalid input data.';
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    const { email, honeypot } = result.data;

    // 5. Honeypot check for bots
    if (honeypot) {
      // Silently accept without subscribing to fool bots
      return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
    }

    const normalizedEmail = email.toLowerCase();

    // 6. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('[Newsletter] RESEND_API_KEY or RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { success: false, error: 'Newsletter service is temporarily unavailable.' },
        { status: 503 },
      );
    }

    // 7. Add contact to Resend Audience
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email: normalizedEmail,
      unsubscribed: false,
      audienceId,
    });

    if (error) {
      // Already subscribed: answer exactly like a fresh subscription so the
      // endpoint cannot be used to check whether an address is on the list.
      const isDuplicate = /already exists|already subscribed|already a member/i.test(error.message ?? '');
      if (isDuplicate) {
        return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
      }

      // Resend rejected the address itself (e.g. a non-existent domain)
      if (error.name === 'validation_error') {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address.' },
          { status: 400 },
        );
      }

      console.error('[Newsletter] Resend API error:', error);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again later.' },
        { status: 500 },
      );
    }

    // 8. Success (the Resend contact id is internal and is not returned)
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error('[Newsletter] Unexpected subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
