// "use client";
// import React, { useState, useEffect } from "react";

// // Define the Employee type
// interface Employee {
//   id: number;
//   name: string;
//   address: string;
// }

// // Define the Car type
// interface Car {
//   id: number;
//   make: string;
//   model: string;
// }

// const EmployeesAndCars2 = () => {
//   // States for employees
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [employeeName, setEmployeeName] = useState("");
//   const [employeeAddress, setEmployeeAddress] = useState("");
//   const [loadingEmployees, setLoadingEmployees] = useState(true);
//   const [errorEmployee, setErrorEmployee] = useState<string | null>(null);
//   const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

//   // States for cars
//   const [cars, setCars] = useState<Car[]>([]);
//   const [carMake, setCarMake] = useState("");
//   const [carModel, setCarModel] = useState("");
//   const [loadingCars, setLoadingCars] = useState(true);
//   const [errorCar, setErrorCar] = useState<string | null>(null);
//   const [editingCar, setEditingCar] = useState<Car | null>(null);

//   // Fetch employees and cars from the API
//   const fetchEmployees = async () => {
//     setLoadingEmployees(true);
//     try {
//       const response = await fetch("http://localhost:5246/api/employees");
//       if (!response.ok) throw new Error("Failed to fetch employees");
//       const data: Employee[] = await response.json();
//       setEmployees(data);
//       setErrorEmployee(null);
//     } catch (error: unknown) {
//       setErrorEmployee(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setLoadingEmployees(false);
//     }
//   };

//   const fetchCars = async () => {
//     setLoadingCars(true);
//     try {
//       const response = await fetch("http://localhost:5246/api/cars");
//       if (!response.ok) throw new Error("Failed to fetch cars");
//       const data: Car[] = await response.json();
//       setCars(data);
//       setErrorCar(null);
//     } catch (error: unknown) {
//       setErrorCar(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setLoadingCars(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchCars();
//   }, []);

//   // Set employee form for editing
//   const handleEditEmployee = (employee: Employee) => {
//     setEditingEmployee(employee);
//     setEmployeeName(employee.name);
//     setEmployeeAddress(employee.address);
//   };

//   // Set car form for editing
//   const handleEditCar = (car: Car) => {
//     setEditingCar(car);
//     setCarMake(car.make);
//     setCarModel(car.model);
//   };

//   // Reset employee form
//   const resetEmployeeForm = () => {
//     setEditingEmployee(null);
//     setEmployeeName("");
//     setEmployeeAddress("");
//   };

//   // Reset car form
//   const resetCarForm = () => {
//     setEditingCar(null);
//     setCarMake("");
//     setCarModel("");
//   };

//   // Handle employee form submission (add or update)
//   const handleEmployeeSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!employeeName || !employeeAddress) {
//       setErrorEmployee("Please fill in both name and address.");
//       return;
//     }

//     const employeeData = {
//       name: employeeName,
//       address: employeeAddress,
//     };

//     try {
//       let response;

//       if (editingEmployee) {
//         // Update existing employee
//         response = await fetch(
//           `http://localhost:5246/api/employees/${editingEmployee.id}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ...employeeData, id: editingEmployee.id }),
//           }
//         );
//       } else {
//         // Add new employee
//         response = await fetch("http://localhost:5246/api/employees", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(employeeData),
//         });
//       }

//       if (response.ok) {
//         if (editingEmployee) {
//           const updatedEmployee = { ...employeeData, id: editingEmployee.id };
//           setEmployees(
//             employees.map((emp) =>
//               emp.id === editingEmployee.id ? updatedEmployee : emp
//             )
//           );
//         } else {
//           const addedEmployee = await response.json();
//           setEmployees([...employees, addedEmployee]);
//         }
//         resetEmployeeForm();
//         setErrorEmployee(null);
//       } else {
//         setErrorEmployee(
//           `Failed to ${editingEmployee ? "update" : "add"} employee`
//         );
//       }
//     } catch (error: unknown) {
//       setErrorEmployee(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     }
//   };

//   // Handle car form submission (add or update)
//   const handleCarSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!carMake || !carModel) {
//       setErrorCar("Please fill in both make and model.");
//       return;
//     }

//     const carData = {
//       make: carMake,
//       model: carModel,
//     };

//     try {
//       let response;

//       if (editingCar) {
//         // Update existing car
//         response = await fetch(
//           `http://localhost:5246/api/cars/${editingCar.id}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ...carData, id: editingCar.id }),
//           }
//         );
//       } else {
//         // Add new car
//         response = await fetch("http://localhost:5246/api/cars", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(carData),
//         });
//       }

//       if (response.ok) {
//         if (editingCar) {
//           const updatedCar = { ...carData, id: editingCar.id };
//           setCars(cars.map((c) => (c.id === editingCar.id ? updatedCar : c)));
//         } else {
//           const addedCar = await response.json();
//           setCars([...cars, addedCar]);
//         }
//         resetCarForm();
//         setErrorCar(null);
//       } else {
//         setErrorCar(`Failed to ${editingCar ? "update" : "add"} car`);
//       }
//     } catch (error: unknown) {
//       setErrorCar(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     }
//   };

//   // Handle employee deletion
//   const handleDeleteEmployee = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this employee?")) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5246/api/employees/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         setEmployees(employees.filter((emp) => emp.id !== id));
//         if (editingEmployee?.id === id) {
//           resetEmployeeForm();
//         }
//       } else {
//         setErrorEmployee("Failed to delete employee");
//       }
//     } catch (error: unknown) {
//       setErrorEmployee(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     }
//   };

//   // Handle car deletion
//   const handleDeleteCar = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this car?")) return;

//     try {
//       const response = await fetch(`http://localhost:5246/api/cars/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setCars(cars.filter((car) => car.id !== id));
//         if (editingCar?.id === id) {
//           resetCarForm();
//         }
//       } else {
//         setErrorCar("Failed to delete car");
//       }
//     } catch (error: unknown) {
//       setErrorCar(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
//         Employees and Cars Management
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Employees Panel */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Employees</h2>
//             <button
//               onClick={fetchEmployees}
//               className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded text-sm transition"
//               disabled={loadingEmployees}
//             >
//               {loadingEmployees ? "Loading..." : "Refresh"}
//             </button>
//           </div>

//           <div className="p-4">
//             {loadingEmployees ? (
//               <div className="text-center py-4">Loading employees...</div>
//             ) : employees.length > 0 ? (
//               <div className="max-h-64 overflow-y-auto mb-4">
//                 <table className="w-full border-collapse">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-2 text-left border-b">ID</th>
//                       <th className="p-2 text-left border-b">Name</th>
//                       <th className="p-2 text-left border-b">Address</th>
//                       <th className="p-2 text-center border-b">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employees.map((employee) => (
//                       <tr key={employee.id} className="hover:bg-gray-50">
//                         <td className="p-2 border-b">{employee.id}</td>
//                         <td className="p-2 border-b font-medium">
//                           {employee.name}
//                         </td>
//                         <td className="p-2 border-b">{employee.address}</td>
//                         <td className="p-2 border-b text-center">
//                           <div className="flex justify-center space-x-2">
//                             <button
//                               onClick={() => handleEditEmployee(employee)}
//                               className="px-2 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteEmployee(employee.id)}
//                               className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-4 text-gray-500">
//                 No employees found
//               </div>
//             )}

//             <div className="mt-4">
//               <h3 className="font-semibold text-lg mb-2">
//                 {editingEmployee ? "Edit Employee" : "Add New Employee"}
//               </h3>
//               <form onSubmit={handleEmployeeSubmit} className="space-y-3">
//                 <div className="flex flex-col">
//                   <label className="text-sm text-gray-600 mb-1">Name</label>
//                   <input
//                     type="text"
//                     value={employeeName}
//                     onChange={(e) => setEmployeeName(e.target.value)}
//                     className="border rounded p-2"
//                     placeholder="Enter employee name"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-sm text-gray-600 mb-1">Address</label>
//                   <input
//                     type="text"
//                     value={employeeAddress}
//                     onChange={(e) => setEmployeeAddress(e.target.value)}
//                     className="border rounded p-2"
//                     placeholder="Enter employee address"
//                   />
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     type="submit"
//                     className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                   >
//                     {editingEmployee ? "Update Employee" : "Add Employee"}
//                   </button>
//                   {editingEmployee && (
//                     <button
//                       type="button"
//                       onClick={resetEmployeeForm}
//                       className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </div>
//               </form>
//               {errorEmployee && (
//                 <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
//                   {errorEmployee}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Cars Panel */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="bg-green-600 text-white p-4 flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Cars</h2>
//             <button
//               onClick={fetchCars}
//               className="px-3 py-1 bg-green-700 hover:bg-green-800 rounded text-sm transition"
//               disabled={loadingCars}
//             >
//               {loadingCars ? "Loading..." : "Refresh"}
//             </button>
//           </div>

//           <div className="p-4">
//             {loadingCars ? (
//               <div className="text-center py-4">Loading cars...</div>
//             ) : cars.length > 0 ? (
//               <div className="max-h-64 overflow-y-auto mb-4">
//                 <table className="w-full border-collapse">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-2 text-left border-b">ID</th>
//                       <th className="p-2 text-left border-b">Make</th>
//                       <th className="p-2 text-left border-b">Model</th>
//                       <th className="p-2 text-center border-b">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cars.map((car) => (
//                       <tr key={car.id} className="hover:bg-gray-50">
//                         <td className="p-2 border-b">{car.id}</td>
//                         <td className="p-2 border-b font-medium">{car.make}</td>
//                         <td className="p-2 border-b">{car.model}</td>
//                         <td className="p-2 border-b text-center">
//                           <div className="flex justify-center space-x-2">
//                             <button
//                               onClick={() => handleEditCar(car)}
//                               className="px-2 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteCar(car.id)}
//                               className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-4 text-gray-500">
//                 No cars found
//               </div>
//             )}

//             <div className="mt-4">
//               <h3 className="font-semibold text-lg mb-2">
//                 {editingCar ? "Edit Car" : "Add New Car"}
//               </h3>
//               <form onSubmit={handleCarSubmit} className="space-y-3">
//                 <div className="flex flex-col">
//                   <label className="text-sm text-gray-600 mb-1">Make</label>
//                   <input
//                     type="text"
//                     value={carMake}
//                     onChange={(e) => setCarMake(e.target.value)}
//                     className="border rounded p-2"
//                     placeholder="Enter car make"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-sm text-gray-600 mb-1">Model</label>
//                   <input
//                     type="text"
//                     value={carModel}
//                     onChange={(e) => setCarModel(e.target.value)}
//                     className="border rounded p-2"
//                     placeholder="Enter car model"
//                   />
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     type="submit"
//                     className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//                   >
//                     {editingCar ? "Update Car" : "Add Car"}
//                   </button>
//                   {editingCar && (
//                     <button
//                       type="button"
//                       onClick={resetCarForm}
//                       className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </div>
//               </form>
//               {errorCar && (
//                 <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
//                   {errorCar}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeesAndCars2;
