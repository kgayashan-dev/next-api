"use client";

import { FC, FormEvent } from 'react';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const UserForm: FC = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");
    const status = formData.get("status");
    const name = formData.get("name");
    const email = formData.get("email");
  
    try {
      const response = await fetch(`${DOMAIN}/api/users`, {
        method: "POST",// create 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role, status, name, email }),
      });
  
      const data = await response.json(); // Always parse JSON response
  
      if (response.ok) {
        alert(data.message); // "User created successfully"
        form.reset();
        window.location.reload();
      } else {
        alert(data.error || "Failed to create user");// an error occurred while creating user 
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error creating user:", error);
    }
  };
  

  const handlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");
    const status = formData.get("status");
    const name = formData.get("name");
    const email = formData.get("email");
  
    try {
      const response = await fetch(`${DOMAIN}/api/users`, {
        method: "POST",// create 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role, status, name, email }),
      });
  
      const data = await response.json(); // Always parse JSON response
  
      if (response.ok) {
        alert(data.message); // "User created successfully"
        form.reset();
        window.location.reload();
      } else {
        alert(data.error || "Failed to create user");// an error occurred while creating user 
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error creating user:", error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            name="role"
            placeholder="Enter role"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Add User
        </button>

 
        <button
       
          onClick={handlSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Add User2
        </button> 
      </form>
    </div>
  );
};

export default UserForm;