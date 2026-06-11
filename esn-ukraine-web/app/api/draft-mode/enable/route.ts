import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Перевірка токену доступу
  if (token !== process.env.SANITY_API_READ_TOKEN) {
    return new Response('Invalid token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Перенаправлення на потрібну сторінку, або на головну
  const slug = searchParams.get('slug') || '/';
  redirect(slug);
}
