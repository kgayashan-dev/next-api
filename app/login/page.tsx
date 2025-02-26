"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Ensures cookies are sent
    });

    console.log(res);
    if (res.ok) {
      router.push("/dashboard");
        // Store token in sessionStorage (client-side)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('auth-token', username);
        }
    } else {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
