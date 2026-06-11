import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Отримуємо токен з заголовків або параметрів запиту
    const authHeader = req.headers.get('authorization');
    const customHeader = req.headers.get('x-sanity-secret');
    const secretFromUrl = req.nextUrl.searchParams.get('secret');
    
    const token = (authHeader ? authHeader.replace('Bearer ', '') : customHeader) || secretFromUrl;

    // 2. Захист: Перевіряємо секретний токен (SANITY_REVALIDATE_SECRET з .env)
    if (!token || token !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    // 3. Зчитуємо тіло запиту після авторизації (webhook payload від Sanity)
    const body = await req.json().catch(() => ({}));
    const type = body?._type;

    // 4. Логіка ревалідації
    // Завжди ревалідуємо загальний тег 'sanity'
    revalidateTag('sanity', 'max');

    // Якщо Sanity надсилає `_type` (наприклад, 'news', 'event'), ревалідуємо й його
    if (type && typeof type === 'string') {
      revalidateTag(type, 'max');
    }

    // 5. Успішна відповідь
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error: any) {
    console.error('Webhook revalidation error:', error.message);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
