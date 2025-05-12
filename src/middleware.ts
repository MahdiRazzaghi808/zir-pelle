import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/','/products', '/auth/login', '/auth/register'];

const protectedRoutes: Record<string, string[]> = {
  '/admin': ['admin'],
  '/dashboard': ['user', 'admin'],
  '/settings': ['user', 'admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

 
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken');
  const role = request.cookies.get('userRole'); 

  if (!token) {
    return NextResponse.redirect(new URL(`/auth/login?next=${pathname}`, request.url));
  }

  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const allowedRoles = protectedRoutes[route];
      if (!role || !allowedRoles.includes(role.value)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], 
};
