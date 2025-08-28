import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

// 2. Middleware Function
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Check for the session cookie
  const cookie = (await cookies()).get("session")?.value;

  // 4. If no session cookie, redirect to /login for protected routes
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. If a session exists, decrypt it
  const session = cookie ? await decrypt(cookie) : null;

  // 6. Redirect to /login if the session is invalid and on a protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 7. Redirect to /dashboard if the user is authenticated and on a public route
  if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
