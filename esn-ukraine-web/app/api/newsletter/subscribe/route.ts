import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ==========================================
// RATE LIMITING (In-memory, IP-based)
// ==========================================

const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean expired entries periodically (every 100th check)
  if (Math.random() < 0.01) {
    for (const [key, val] of rateLimitMap) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ==========================================
// EMAIL VALIDATION
// ==========================================

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

// ==========================================
// POST HANDLER
// ==========================================

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    // 3. Honeypot check — if the hidden "website" field is filled, it's a bot
    if (body.honeypot) {
      // Silently accept to not reveal the trap, but don't actually subscribe
      return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
    }

    // 4. Consent check
    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: 'Privacy consent is required.' },
        { status: 400 }
      );
    }

    // 5. Email validation
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const email = (body.email as string).trim().toLowerCase();

    // 6. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('Newsletter: RESEND_API_KEY or RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { success: false, error: 'Newsletter service is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // 7. Add contact to Resend Audience
    const resend = new Resend(apiKey);

    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    if (error) {
      // Resend returns a specific error for duplicates — we treat it as success
      if (error.message?.toLowerCase().includes('already exists') || error.name === 'validation_error') {
        return NextResponse.json({
          success: true,
          message: 'You\'re already subscribed! Thank you for your interest.',
          alreadySubscribed: true,
        });
      }

      console.error('Resend API error:', error);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again later.' },
        { status: 500 }
      );
    }

    // 8. Success
    return NextResponse.json({
      success: true,
      message: 'Welcome aboard! You\'ve been subscribed to our newsletter.',
      contactId: data?.id,
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
