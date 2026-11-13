import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity webhook → on-demand revalidation.
 *
 * Sanity signs every request with the webhook secret (`sanity-webhook-signature`
 * header); the secret is `SANITY_REVALIDATE_SECRET`. Configure the webhook with
 * the projection `{ _type, "slug": slug.current }` so only the affected pages are
 * expired. Tags are expired immediately (`expire: 0`): the first visitor after a
 * publish already gets the fresh page instead of a stale-while-revalidate copy.
 */
type WebhookBody = { _type?: string; slug?: string | null };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('[Revalidate] SANITY_REVALIDATE_SECRET is not configured.');
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }

  try {
    // `true`: wait for Content Lake eventual consistency, so the regenerated
    // page does not read the previous version of the document.
    const { isValidSignature, body } = await parseBody<WebhookBody>(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    const type = typeof body?._type === 'string' ? body._type : null;
    if (!type) {
      return NextResponse.json({ message: 'Bad request: missing _type' }, { status: 400 });
    }

    const tags = [type];
    if (typeof body?.slug === 'string' && body.slug) {
      tags.push(`${type}:${body.slug}`.replace(/[^a-zA-Z0-9_\-:]/g, '-'));
    }
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ revalidated: true, tags, now: Date.now() });
  } catch (error) {
    console.error('[Revalidate] Webhook error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
