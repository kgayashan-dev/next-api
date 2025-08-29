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

const API_URL = "";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export async function login(prevState: LoginState, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { 
        "accept": "*/*",
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return { 
        errors: { 
          username: ["Invalid username or password"],
          password: ["Invalid username or password"]
        } 
      };
    }

    const data = await response.json();
    
    if (data.message === "Login Successful" && data.user && data.user.length > 0) {
      const user = data.user[0];
      
      // Create session with user data from API
      await createSession(user.UserName, user.FullName);

      return { 
        success: true, 
        redirectTo: "/dashboard",
        user: user // Optional: you can return user data if needed
      };
    } else {
      return { 
        errors: { 
          username: ["Login failed"],
          password: ["Login failed"]
        } 
      };
    }

  } catch (error) {
    console.error("Login error:", error);
    return { 
      errors: { 
        username: ["Network error. Please try again."],
        password: ["Network error. Please try again."]
      } 
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}