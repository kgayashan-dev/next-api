// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session"; // Your JWT session utility

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const session = await verifySession();
    
    if (session) {
      return NextResponse.json({
        message: "Session active",
        user: session.role, // From JWT payload
      });
    } else {
      return NextResponse.json({ message: "No active session" }, { status: 401 });
    }
  } catch (error) {
    console.error("Session verification failed:", error);
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }
}