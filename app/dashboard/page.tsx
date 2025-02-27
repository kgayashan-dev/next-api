"use client";

import EmployeesAndCars2 from "@/Components/employees2";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [sessionStatus, setSessionStatus] = useState(null);
  const [user, setUser] = useState([]);

  const handleLogout = async () => {
    // Log out the user on the server-side
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });

    // Remove sessionStorage (or localStorage) on the client-side after logout
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth-token"); // Remove token from sessionStorage
      sessionStorage.removeItem("auth-role"); // Remove token from sessionStorage
    }

    // Redirect to the login page after logout
    router.push("/login");

    // Use window.location.replace to clear the browser's history and avoid going back
    window.location.replace("/login");
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

  return (
    <div className="font-sans">
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

      <EmployeesAndCars2 />
    </div>
  );
}
