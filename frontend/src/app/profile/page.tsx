"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token || !userRole) {
      router.push("/login");
      return;
    }

    setRole(userRole);
    fetchProfile(userRole);
  }, []);

  const fetchProfile = async (userRole: string) => {
    try {
      const res = await api.get(`/profile`, {
        baseURL: `http://localhost:8081/api/${userRole.toLowerCase()}`
      });
      setProfile({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        username: res.data.username,
      });
    } catch (err) {
      console.error(err);
      setError("Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put(`/profile`, profile, {
        baseURL: `http://localhost:8081/api/${role.toLowerCase()}`
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">My Profile ({role})</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Username (read-only)</label>
              <input
                type="text"
                value={profile.username}
                disabled
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
