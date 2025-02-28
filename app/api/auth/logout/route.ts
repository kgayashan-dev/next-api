// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
// serverside
export async function GET() {
    const response = NextResponse.json({ message: "Logged out" });

    response.headers.set('Set-Cookie', 'auth-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');

    return response;
}
