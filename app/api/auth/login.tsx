import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Ensures cookies are sent
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Forward the auth cookie from .NET API response
    const response = NextResponse.json({ message: "Login successful" });
    const authToken = res.headers.get('set-cookie');

    if (authToken) {
        response.headers.set('set-cookie', authToken); // Set cookie for client
    }

    return response;
}
