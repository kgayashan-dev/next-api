"use client";
import React, { useState, useEffect } from "react";
import UserList from "@/Components/UserList";
import UserForm from "@/Components/UserForm";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  username: string;
  password: string;
  role: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${DOMAIN}/api/users`, {
        cache: "no-store",
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">
        User Management
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
        <div className="w-full">
          <UserForm />
        </div>
        <div className="w-full">
          <UserList users={users} />
        </div>
      </div>
    </main>
  );
}
