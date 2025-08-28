// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.json({ message: "Logged out" });

    // Clear both cookies
    response.headers.set('Set-Cookie', [
        'auth-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
        'session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    ].join(', '));

    return response;
}