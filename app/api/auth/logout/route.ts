// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Remove the auth-token cookie
  response.cookies.set({
    name: "auth-token",
    value: "",
    path: "/",
    maxAge: 0, // Expire immediately
  });



  return response;
}
