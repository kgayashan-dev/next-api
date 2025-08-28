// app/login/actions.ts

"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
  redirectTo?: string;
};

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const testUser = {
  id: "1",
  email: "admin@gmail.com",
  password: "12345678",
  role: "admin",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: LoginState, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    // For demo purposes - using test user
    if (email !== testUser.email || password !== testUser.password) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    // Uncomment for real API integration:
    /*
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      return { errors: { email: ["Invalid email or password"] } };
    }

    const user = await response.json();
    */

    // Using test user for demo
    const user = testUser;
    
    await createSession(user.id, user.role);

    // Return the correct redirect path based on role
    return { success: true, redirectTo: "/dashboard" };
  } catch (error) {
    console.error("Login error:", error);
    return { errors: { email: ["An error occurred during login"] } };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}