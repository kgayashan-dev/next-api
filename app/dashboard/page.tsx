// app/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "../login/actions"; // Import the server action

export default function Dashboard() {
  const router = useRouter();
  const [sessionStatus, setSessionStatus] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      // Use the server action for logout
      await logout();

      // Clear client-side storage
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-role");
      }

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();

      if (data.message === "Session active") {
        setSessionStatus(data.message);
        setUser(data.user); // Set the user data from the session
        sessionStorage.setItem("auth-role", data.user); // role

        // Set the user data from the session
        console.log(data, "data");
      } else {
        setSessionStatus(data.message);
      }
    };

    checkSession();
  }, []);

  console.log(user);
  return (
    <div className="font-sans p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Dashboard, {user ? user : "Guest"}, {sessionStatus}
        </h1>
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <p className="text-lg text-gray-600 mb-8">
        {sessionStatus === "Session active"
          ? "You have logged in successfully."
          : "Please log in."}
      </p>
    </div>
  );
}
