import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Runs before every page listed in `config.matcher` below
export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  // No login cookie: send the visitor to Login and remember where they wanted to go
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only these pages are private. "/books" (All Books) stays public,
// while "/books/anything" (Book Details) is private.
export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/books/:id",
  ],
};
