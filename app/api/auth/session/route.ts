// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (token) {
    const sessionData = JSON.parse(token.value); // Use .value to access the cookie value
    return NextResponse.json({ message: "Session active", user: sessionData.username });
  } else {
    return NextResponse.json({ message: "No active session" }, { status: 401 });
  }
}
