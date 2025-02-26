"use client";

import EmployeesAndCars from "@/Components/employees";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        You have logged in successfully.
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>

      <EmployeesAndCars />
    </div>
  );
}
