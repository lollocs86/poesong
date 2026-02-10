import { createHmac } from 'crypto';

const SECRET = 'poesong-blog-admin';
export const COOKIE_NAME = 'admin_session';

export function generateSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD || '';
  return createHmac('sha256', SECRET).update(password).digest('hex');
}

export function verifySessionToken(token: string): boolean {
  return token === generateSessionToken();
}
