"use client";
import React, { useState, useEffect } from "react";

// Define the Employee type for better type safety
interface Employee {
  id: number;
  name: string;
  address: string;
}

const Employees = () => {
  // State to store the employee data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employee data from the API when the component is mounted
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("Fetching employees...");
        const response = await fetch("http://localhost:5246/api/employees");
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data: Employee[] = await response.json(); // Type the response data
        setEmployees(data);
      } catch (error: string) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
