import { NextResponse, NextRequest } from "next/server";
import { setSession } from "../session/setSession"; // Ensure the path is correct

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const response = await fetch("http://localhost:5246/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const userData = await response.json(); // taking from backend
    console.log("User data received:", userData); // Debugging

    // Store session data
    const res = NextResponse.json(userData);
    setSession(res, JSON.stringify(userData)); // pass the  session/ cookies
    console.log(res);
    console.log(userData);// store
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
