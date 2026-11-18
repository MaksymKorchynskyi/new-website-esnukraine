import { timingSafeEqual } from 'node:crypto';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { safeRedirectPath } from '@/lib/server/safe-path';

function secretsMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Enables Draft Mode for previewing unpublished content:
 *   /api/draft-mode/enable?secret=<SANITY_DRAFT_MODE_SECRET>&slug=/news/my-article
 *
 * The secret is a dedicated random string, never the Sanity read token (which
 * would otherwise end up in browser history, logs and Referer headers).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provided = searchParams.get('secret') ?? searchParams.get('token');

  if (!secretsMatch(provided, process.env.SANITY_DRAFT_MODE_SECRET)) {
    return new Response('Invalid secret', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(safeRedirectPath(searchParams.get('slug')));
}
