// app/login/actions.ts

"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

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

export async function login(prevState: undefined, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id, testUser.role); // Pass the role here
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
