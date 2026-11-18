import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity webhook → on-demand revalidation. The secret is `SANITY_REVALIDATE_SECRET`.
 *
 * Two ways to authenticate are accepted, so the webhook keeps working without
 * any change in sanity.io/manage:
 * - the Sanity signature (`sanity-webhook-signature` header), sent when the
 *   webhook's "Secret" field is filled in;
 * - the secret itself, as `Authorization: Bearer …`, an `x-sanity-secret`
 *   header or `?secret=…` in the URL (the setup the site has always used).
 *
 * The payload may be the full document (default) or the projection
 * `{ _type, "slug": slug.current }`. Tags are expired immediately
 * (`expire: 0`), so the first visitor after a publish gets the fresh page.
 */
type WebhookBody = { _type?: unknown; slug?: unknown };

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function legacyToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice('Bearer '.length).trim();
  return req.headers.get('x-sanity-secret') || req.nextUrl.searchParams.get('secret');
}

/** Same eventual-consistency pause that `parseBody` applies for signed requests. */
const waitForContentLake = () => new Promise((resolve) => setTimeout(resolve, 3000));

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('[Revalidate] SANITY_REVALIDATE_SECRET is not configured.');
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }

  try {
    let body: WebhookBody | null;

    if (req.headers.has('sanity-webhook-signature')) {
      const parsed = await parseBody<WebhookBody>(req, secret, true);
      if (!parsed.isValidSignature) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
      }
      body = parsed.body;
    } else {
      const token = legacyToken(req);
      if (!token || !safeEqual(token, secret)) {
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
      }
      body = await req.json().catch(() => null);
      await waitForContentLake();
    }

    const type = typeof body?._type === 'string' ? body._type : null;
    if (!type) {
      return NextResponse.json({ message: 'Bad request: missing _type' }, { status: 400 });
    }

    // `slug` is a string with the projection, or `{ current }` in the full document
    const rawSlug = body?.slug;
    const slug =
      typeof rawSlug === 'string'
        ? rawSlug
        : rawSlug && typeof rawSlug === 'object' && typeof (rawSlug as { current?: unknown }).current === 'string'
          ? (rawSlug as { current: string }).current
          : null;

    const tags = [type];
    if (slug) tags.push(`${type}:${slug}`.replace(/[^a-zA-Z0-9_\-:]/g, '-'));
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ revalidated: true, tags, now: Date.now() });
  } catch (error) {
    console.error('[Revalidate] Webhook error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
