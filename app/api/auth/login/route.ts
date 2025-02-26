// app/api/auth/login/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    console.log("Received login request:", username, password);

    // Simulate user authentication (Replace with DB check)
    if (username === 'user' && password === 'password') {
      console.log("Login successful for:", username);
      const response = NextResponse.json({ message: 'Logged in successfully' });

      // Set session cookie with the auth token
      response.cookies.set({
        name: 'auth-token',
        value: 'your-secure-session-token', // Replace with a real token or session data
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day expiration
      });

      // Set session data in sessionStorage (on the client side)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('auth-token', 'your-secure-session-token'); // Store token in sessionStorage
      }

      return response;
    }

    return new NextResponse('Invalid credentials', { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse('Server error', { status: 500 });
  }
}
