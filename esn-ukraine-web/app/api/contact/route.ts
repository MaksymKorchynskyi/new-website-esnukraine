import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { clientKey, getRatelimit, isAllowedOrigin, isProduction } from '@/lib/server/request-guards';

/** Where contact-form messages are delivered. */
const CONTACT_TO = process.env.CONTACT_EMAIL_TO || 'ukraine-nr@esn.org';
/** Sender address: must belong to a domain verified in Resend. */
const CONTACT_FROM = process.env.CONTACT_EMAIL_FROM;

export const SUBJECTS = {
  general: 'General Inquiry',
  buddy: 'Buddy System',
  partnership: 'Partnership',
  'new-section': 'Start a New Section',
  media: 'Media Request',
  other: 'Other',
} as const;

const ContactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Please enter your name.' }).max(100, { message: 'Name is too long.' }),
  email: z
    .string()
    .trim()
    .max(254, { message: 'Email is too long.' })
    .email({ message: 'Please enter a valid email address.' }),
  subject: z.enum(Object.keys(SUBJECTS) as [keyof typeof SUBJECTS, ...(keyof typeof SUBJECTS)[]], {
    message: 'Please select a topic.',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Please write a few more words.' })
    .max(5000, { message: 'Message is too long (max 5000 characters).' }),
  // Trap field for bots: real users never see it
  honeypot: z.string().optional(),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized origin.' }, { status: 403 });
    }

    // 3 messages per 10 minutes per (hashed) IP
    const ratelimit = getRatelimit('contact', 3, '10 m');
    if (ratelimit) {
      const { success, reset } = await ratelimit.limit(clientKey(req));
      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Too many messages. Please try again in a few minutes.' },
          { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.floor((reset - Date.now()) / 1000))) } },
        );
      }
    } else if (isProduction) {
      console.error('[Contact] Upstash Redis credentials missing: refusing to run without rate limiting.');
      return NextResponse.json({ success: false, error: 'Service Unavailable' }, { status: 503 });
    }

    let bodyData: unknown;
    try {
      bodyData = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
    }

    const result = ContactSchema.safeParse(bodyData);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || 'Invalid input data.' },
        { status: 400 },
      );
    }

    const { name, email, subject, message, honeypot } = result.data;

    if (honeypot) {
      // Pretend it worked so bots do not retry
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || !CONTACT_FROM) {
      console.error('[Contact] RESEND_API_KEY or CONTACT_EMAIL_FROM is not configured.');
      return NextResponse.json(
        { success: false, error: `The contact form is temporarily unavailable. Please email us at ${CONTACT_TO}.` },
        { status: 503 },
      );
    }

    const topic = SUBJECTS[subject];
    const text = [
      `New message from the esnukraine.org contact form`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      ``,
      message,
    ].join('\n');

    const html = `
      <p><strong>New message from the esnukraine.org contact form</strong></p>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
         <strong>Email:</strong> ${escapeHtml(email)}<br/>
         <strong>Topic:</strong> ${escapeHtml(topic)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Website] ${topic}: ${name}`,
      text,
      html,
    });

    if (error) {
      console.error('[Contact] Resend API error:', error);
      return NextResponse.json(
        { success: false, error: `We could not send your message. Please email us at ${CONTACT_TO}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
