"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // IMPORTANT: Ensures cookie is set
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Invalid login credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      console.log(
        error instanceof Error
          ? error.message
          : "An unknown error occurred from the server side!"
      );
      setError("An unknown error occurred ");
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
