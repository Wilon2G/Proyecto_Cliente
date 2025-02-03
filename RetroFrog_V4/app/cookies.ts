import { createCookie } from '@remix-run/node';

if (typeof process.env.AUTH_COOKIE_SECRET !== 'string') {
  throw new Error('Missing env: AUTH_COOKIE_SECRET');
}

export const sessionCookie = createCookie('sessionCookie', {
  secrets: [process.env.AUTH_COOKIE_SECRET],
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});
