
"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-[#2563eb]">Employee Manager</h1>
      <nav className="space-x-6">
        <Link href="/" className="text-gray-700 hover:text-[#2563eb] font-medium transition">Home</Link>
        <Link href="/dashboard" className="text-gray-700 hover:text-[#2563eb] font-medium transition">Dashboard</Link>
        <Link href="/employees" className="text-gray-700 hover:text-[#2563eb] font-medium transition">Employees</Link>
        <Link href="/attendance" className="text-gray-700 hover:text-[#2563eb] font-medium transition">Attendance</Link>
        <Link href="/scheduling" className="text-gray-700 hover:text-[#2563eb] font-medium transition">Scheduling</Link>
      </nav>
    </header>
  );
};

export default Navbar;
