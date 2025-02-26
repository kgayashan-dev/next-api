"use client";

import EmployeesAndCars2 from "@/Components/employees2";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // Log out the user on the server-side
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });

    // Remove sessionStorage (or localStorage) on the client-side after logout
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth-token"); // Remove token from sessionStorage
    }

    // Redirect to the login page after logout
    router.push("/login");

    // Use window.location.replace to clear the browser's history and avoid going back
    window.location.replace("/login");
  };

  const [sessionStatus, setSessionStatus] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setSessionStatus(data.message); // active session
    };

    checkSession();
  }, []);

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the Dashboard {sessionStatus}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        You have logged in successfully.
      </p>

      <EmployeesAndCars2 />
      <button
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
