"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || "");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/");
  };

  const linkClass = (path: string) =>
    `text-gray-700 hover:text-[#2563eb] font-medium transition ${pathname === path ? "text-[#2563eb] font-semibold underline" : ""}`;

  return (
    <header className='bg-white shadow-md py-4 px-8 flex items-center justify-between'>
      <h1 className='text-2xl font-bold text-[#2563eb] cursor-pointer' onClick={() => router.push("/")}>
        Employee Manager
      </h1>

      <nav className='space-x-6 flex items-center'>
        <Link href='/' className={linkClass("/")}>
          Home
        </Link>

        {isLoggedIn && role === "ADMIN" && (
          <>
            <Link href='/admin/dashboard' className={linkClass("/admin/dashboard")}>
              Dashboard
            </Link>
            <Link href='/admin/add-employee' className={linkClass("/admin/add-employee")}>
              Employees
            </Link>
            <Link href='/admin/scheduling' className={linkClass("/admin/scheduling")}>
              Scheduling
            </Link>
          </>
        )}

        {isLoggedIn && role === "EMPLOYEE" && (
          <>
            <Link href='/employee/dashboard' className={linkClass("/employee/dashboard")}>
              Dashboard
            </Link>
            <Link href='/employee/schedules' className={linkClass("/employee/schedules")}>
              Schedules
            </Link>
            <Link href='/employee/attendance' className={linkClass("/employee/attendance")}>
              Attendance
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button onClick={logout} className='text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-1 rounded transition'>
            Logout
          </button>
        ) : (
          <Link href='/login' className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition'>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
