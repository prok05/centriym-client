import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const token = req.cookies.get('token')?.value;
    let session;
    if (token) {
        session = jwt.decode(token);
    }
    if (path === "/") {
        // Если есть токен, перенаправляем на "/dashboard"
        // @ts-ignore
        if (session?.userID) {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
        // Если нет токена, доступ к "/login" и "/register"
        // return NextResponse.next();
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // @ts-ignore
    if (isProtectedRoute && !session?.userID) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (
        isPublicRoute &&
        // @ts-ignore
        session?.userID &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
