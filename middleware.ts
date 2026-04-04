import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('admin_token')?.value;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/doctor')) {
    if (pathname === '/doctor/login') return NextResponse.next();
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/doctor/login';
      return NextResponse.redirect(url);
    }
  }

  if (token && (pathname.startsWith('/admin') || pathname.startsWith('/doctor'))) {
    try {
      const secretText = process.env.JWT_SECRET || 'fallback_secret_for_dev';
      const secret = new TextEncoder().encode(secretText);
      const { payload } = await jwtVerify(token, secret);
      if (pathname.startsWith('/admin') && payload.role !== "admin") {
        const url = request.nextUrl.clone();
        url.pathname = '/doctor/dashboard';
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/doctor') && payload.role !== "doctor") {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    } catch (error) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/doctor/:path*'],
};
