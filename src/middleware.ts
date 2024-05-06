import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/login', '/signup', '/', '/verifyemail', '/cart', '/order'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
      (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verifyemail'))
  ) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!token && 
        ( url.pathname.startsWith('/profile') ||
          url.pathname.startsWith('/cart') ||
          url.pathname.startsWith('/order') 
        )   
    ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();

}