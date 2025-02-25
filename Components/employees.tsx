"use client";
import React, { useState, useEffect } from 'react';

// Define the Employee type
interface Employee {
  id: number;
  name: string;
  address: string;
}

// Define the Car type
interface Car {
  id: number;
  make: string;
  model: string;
}

const EmployeesAndCars = () => {
  // States for employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [errorEmployee, setErrorEmployee] = useState<string | null>(null);

  // States for cars
  const [cars, setCars] = useState<Car[]>([]);
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [loadingCars, setLoadingCars] = useState(true);
  const [errorCar, setErrorCar] = useState<string | null>(null);

  // Fetch employees and cars from the API
  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const response = await fetch('http://localhost:5246/api/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data: Employee[] = await response.json();
      setEmployees(data);
      setErrorEmployee(null);
    } catch (error: any) {
      setErrorEmployee(error.message);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchCars = async () => {
    setLoadingCars(true);
    try {
      const response = await fetch('http://localhost:5246/api/cars');
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data: Car[] = await response.json();
      setCars(data);
      setErrorCar(null);
    } catch (error) {
      setErrorCar(error.message);
    } finally {
      setLoadingCars(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchCars();
  }, []);

  // Handle adding a new employee
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeName || !employeeAddress) {
      setErrorEmployee('Please fill in both name and address.');
      return;
    }

    const newEmployee = {
      name: employeeName,
      address: employeeAddress,
    };

    try {
      const response = await fetch('http://localhost:5246/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        const addedEmployee = await response.json();
        setEmployees((prev) => [...prev, addedEmployee]);
        setEmployeeName('');
        setEmployeeAddress('');
        setErrorEmployee(null);
      } else {
        setErrorEmployee('Failed to add employee');
      }
    } catch (error: any) {
      setErrorEmployee(error.message);
    }
  };

  // Handle adding a new car
  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!carMake || !carModel) {
      setErrorCar('Please fill in both make and model.');
      return;
    }

    const newCar = {
      make: carMake,
      model: carModel,
    };

    try {
      const response = await fetch('http://localhost:5246/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        const addedCar = await response.json();
        setCars((prev) => [...prev, addedCar]);
        setCarMake('');
        setCarModel('');
        setErrorCar(null);
      } else {
        setErrorCar('Failed to add car');
      }
    } catch (error: any) {
      setErrorCar(error.message);
    }
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Employees and Cars Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Employees Panel */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Employees</h2>
            <button 
              onClick={fetchEmployees} 
              className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded text-sm transition"
              disabled={loadingEmployees}
            >
              {loadingEmployees ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          <div className="p-4">
            {loadingEmployees ? (
              <div className="text-center py-4">Loading employees...</div>
            ) : employees.length > 0 ? (
              <div className="max-h-64 overflow-y-auto mb-4  text-sm">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left border-b">ID</th>
                      <th className="p-2 text-left border-b">Name</th>
                      <th className="p-2 text-left border-b">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 text-sm">
                        <td className="p-2 border-b">{employee.id}</td>
                        <td className="p-2 border-b font-medium">{employee.name}</td>
                        <td className="p-2 border-b">{employee.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">No employees found</div>
            )}
            
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Add New Employee</h3>
              <form onSubmit={handleAddEmployee} className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="border rounded p-2"
                    placeholder="Enter employee name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Address</label>
                  <input
                    type="text"
                    value={employeeAddress}
                    onChange={(e) => setEmployeeAddress(e.target.value)}
                    className="border rounded p-2"
                    placeholder="Enter employee address"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Employee
                </button>
              </form>
              {errorEmployee && (
                <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">{errorEmployee}</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Cars Panel */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cars</h2>
            <button 
              onClick={fetchCars} 
              className="px-3 py-1 bg-green-700 hover:bg-green-800 rounded text-sm transition"
              disabled={loadingCars}
            >
              {loadingCars ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          <div className="p-4">
            {loadingCars ? (
              <div className="text-center py-4">Loading cars...</div>
            ) : cars.length > 0 ? (
              <div className="max-h-64 overflow-y-auto mb-4  text-sm">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left border-b">ID</th>
                      <th className="p-2 text-left border-b">Make</th>
                      <th className="p-2 text-left border-b">Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr key={car.id} className="hover:bg-gray-50">
                        <td className="p-2 border-b">{car.id}</td>
                        <td className="p-2 border-b font-medium">{car.make}</td>
                        <td className="p-2 border-b">{car.model}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">No cars found</div>
            )}
            
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Add New Car</h3>
              <form onSubmit={handleAddCar} className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Make</label>
                  <input
                    type="text"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    className="border rounded p-2"
                    placeholder="Enter car make"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Model</label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="border rounded p-2"
                    placeholder="Enter car model"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Add Car
                </button>
              </form>
              {errorCar && (
                <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">{errorCar}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesAndCars;