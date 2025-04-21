"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { LoginRequest, LoginResponse } from "../types/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>("/auth/login", formData);
      const { role, token } = res.data;

      // ✅ Store token in localStorage or cookie
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      Cookies.set("token", token, { expires: 1 });
      window.dispatchEvent(new Event("auth-updated")); //  trigger sync

      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-50'>
      <form onSubmit={handleLogin} className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-blue-600 mb-6 text-center'>Login</h2>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <input
          type='text'
          name='username'
          placeholder='Username'
          className='w-full px-4 py-2 border rounded-md mb-4'
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full px-4 py-2 border rounded-md mb-6'
          value={formData.password}
          onChange={handleChange}
        />

        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
          Login
        </button>
      </form>
    </div>
  );
}
