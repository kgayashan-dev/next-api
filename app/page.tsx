"use client";
import React from "react";

import EmployeesAndCars from "@/Components/employees";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   username: string;
//   password: string;
//   role: string;
// };

export default function Home() {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await fetch(`${DOMAIN}/api/users`, {
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">
        User Management
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
        <div className="w-full">
          <UserForm />
        </div>
        <div className="w-full">
          <UserList users={users} />
        </div>
      </div> */}

      {/* <Employees/> */}
      <h1>Home page</h1>
    </main>
  );
}
