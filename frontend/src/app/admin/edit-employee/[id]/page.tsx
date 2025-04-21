"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "EMPLOYEE",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployee = async () => {
    try {
      const res = await api.get(`/admin/employee/${employeeId}`);
      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role,
      });
    } catch {
      setError("Failed to load employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/admin/employee/${employeeId}`, form);
      router.push("/admin/dashboard");
    } catch {
      setError("Failed to update employee.");
    }
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-8 py-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Edit Employee</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
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
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
