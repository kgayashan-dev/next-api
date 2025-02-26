"use client";
// import EmployeesAndCars from "@/Components/employees";
import EmployeesAndCars2 from "@/Components/employees2";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Managementsystem
        </h1>
        <p className="text-lg text-gray-600">
          Manage users, roles, and settings effortlessly.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard
          icon="👥"
          title="User Management"
          description="Easily manage users, update profiles, and handle permissions."
        />
        <FeatureCard
          icon="⚙️"
          title="System Settings"
          description="Configure application settings and preferences with ease."
        />
        <FeatureCard
          icon="🔒"
          title="Secure Authentication"
          description="Ensure secure login and session management for users."
        />
      </section>

      <EmployeesAndCars2 />
    </main>
  );
}

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition duration-300">
    <div className="flex justify-center text-4xl">{icon}</div>
    <h3 className="text-xl font-semibold text-center mt-4">{title}</h3>
    <p className="text-gray-600 text-center mt-2">{description}</p>
  </div>
);
