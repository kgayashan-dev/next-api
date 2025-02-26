// app/api/auth/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import { setSession } from "../session/setSession"; // Ensure the path is correct

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Simulate user authentication (replace with your real authentication logic)
  if (username === "user" && password === "password") {
    const sessionData = JSON.stringify({ username }); // Store username in session
    const res = NextResponse.json({ message: "Logged in successfully" });

    setSession(res, sessionData); // Store session data as a cookie
    return res;
  }

  return new NextResponse("Invalid credentials", { status: 401 });
}
