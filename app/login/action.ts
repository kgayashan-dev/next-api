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
  // Extract form data with proper field names
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Form data:", rawFormData); // Debug log

  const result = loginSchema.safeParse(rawFormData);

  console.log("Validation result:", result); // Debug log

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