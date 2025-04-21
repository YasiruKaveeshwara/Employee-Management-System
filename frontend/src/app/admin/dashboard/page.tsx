"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Optional: install react-icons

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/admin/employees");
      setEmployees(res.data);
    } catch (err: any) {
      console.error("Failed to fetch employees:", err);
      setError("Failed to fetch employee list. Please login again or check permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/admin/employee/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Failed to delete employee:", err);
      alert("Could not delete the employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className='min-h-screen bg-blue-50 px-6 py-10'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold text-blue-700 mb-6'>Admin Dashboard</h1>

        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-700'>Employees</h2>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded' onClick={() => router.push("/admin/add-employee")}>
            + Add Employee
          </button>
        </div>

        {loading && <p className='text-gray-600'>Loading employees...</p>}
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {!loading && !error && employees.length === 0 && <p className='text-gray-500'>No employees found.</p>}

        {!loading && !error && employees.length > 0 && (
          <div className='bg-white shadow rounded-lg overflow-auto'>
            <table className='w-full text-left table-auto'>
              <thead className='bg-blue-100 text-blue-800'>
                <tr>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Email</th>
                  <th className='p-3'>Phone</th>
                  <th className='p-3'>Username</th>
                  <th className='p-3'>Role</th>
                  <th className='p-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className='border-t hover:bg-gray-50'>
                    <td className='p-3'>{emp.name}</td>
                    <td className='p-3'>{emp.email}</td>
                    <td className='p-3'>{emp.phone}</td>
                    <td className='p-3'>{emp.username}</td>
                    <td className='p-3 capitalize'>{emp.role}</td>
                    <td className='p-3 flex gap-6'>
                      <button
                        onClick={() => router.push(`/admin/edit-employee/${emp.id}`)}
                        className='text-blue-600 hover:text-blue-800 font-medium text-sm'>
                        <FiEdit size={18} />
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className='text-red-600 hover:text-red-800' title='Delete Employee'>
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
