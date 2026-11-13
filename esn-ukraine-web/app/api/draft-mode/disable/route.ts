import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { safeRedirectPath } from '@/lib/server/safe-path';

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  redirect(safeRedirectPath(searchParams.get('slug')));
}
