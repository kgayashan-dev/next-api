// app/api/auth/session/route.js

import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.cookies.get("auth-token");

  if (token) {
    return NextResponse.json({ message: 'Session active', token });
  } else {
    return NextResponse.json({ message: 'No active session' }, { status: 401 });
  }
}
