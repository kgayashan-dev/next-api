"use client";
import { useState } from "react";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "User",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.username || !formData.password || !formData.email) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5246/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User added successfully!");
        setFormData({ username: "", password: "", email: "", role: "User" });
      } else {
        setMessage("Error adding user.");
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Connection error, check if the server is running"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-medium mb-3">Add New User</h2>
      {message && <p className="text-red-500 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
