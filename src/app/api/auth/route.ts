import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateSessionToken, verifySessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Password errata' }, { status: 401 });
  }

  const token = generateSessionToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  const authenticated = session ? verifySessionToken(session.value) : false;
  return NextResponse.json({ authenticated });
}
