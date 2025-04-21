'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://localhost:8081';

export default function AddEmployeePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: 'employee'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(`${BASE_URL}/api/admin/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ✅ Auth header
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
  
      if (!res.ok) {
        const result = await res.json(); // log response
        console.error('Server responded with:', result);
        throw new Error('Failed to create employee');
      }
  
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error(err.message);
      setError('Failed to create employee. Check the console for more details.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-blue-50 px-8 py-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Add New Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}
