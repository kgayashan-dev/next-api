// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Import the correct type

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (token) {
    return NextResponse.json({ message: "Session active", token });
  } else {
    return NextResponse.json({ message: "No active session" }, { status: 401 });
  }
}
