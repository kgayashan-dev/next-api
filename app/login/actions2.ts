// app/login/actions.ts

"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";


type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  success?: boolean;
  redirectTo?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});

export async function login(prevState: LoginState, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;

  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) {
      return { errors: { username: ["Invalid username or password"] } };
    }

    const user = await response.json();
    await createSession(user.id, user.role);

    // ✅ Return the correct redirect path based on role
    return { success: true, redirectTo: "/dashboard" };
  } catch (error) {
    console.error("Login error:", error); // ✅ Log error to console
    return { errors: { username: ["An error occurred during login"] } };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
