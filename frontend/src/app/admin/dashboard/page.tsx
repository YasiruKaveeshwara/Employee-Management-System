'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  username: string;
}

const BASE_URL = 'http://localhost:8081';

export default function AdminDashboard() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Employee List</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            onClick={() => router.push('/admin/add-employee')}
          >
            + Add Employee
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-t">
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3">{emp.username}</td>
                    <td className="p-3 capitalize">{emp.role}</td>
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
