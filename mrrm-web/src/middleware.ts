import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/utils";


export async function middleware(request: NextRequest) {
    // Add a new header x-current-path which passes the path to downstream components
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    const { pathname } = new URL(request.url);

  
    const token = request.cookies.get('token')?.value;
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // const decoded = await verifyToken(token.value);
    // if (decoded) {
    //     (request as NextRequestWithUser).user = decoded;
    //     // redirect to /dashboard when authenticated
    //     if (request.nextUrl.pathname === "/") {
    //         return NextResponse.redirect(new URL("/dashboard", request.url));
    //     }
    // } else if (request.nextUrl.pathname !== "/") {
    //     // if unauthenticated and not in login page, redirect to login page
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};