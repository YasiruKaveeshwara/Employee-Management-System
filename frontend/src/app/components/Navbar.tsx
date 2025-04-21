"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // Sync with localStorage values
  const syncAuth = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || "");
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  };

  useEffect(() => {
    syncAuth();

    const handleStorageChange = () => syncAuth();
    const handleCustomAuthUpdate = () => syncAuth();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-updated", handleCustomAuthUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-updated", handleCustomAuthUpdate);
    };
  }, [pathname]);

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
    setIsLoggedIn(false);
    setRole("");
    window.dispatchEvent(new Event("auth-updated")); // 🔄 notify others
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
        {isLoggedIn && role === "ADMIN" && (
          <>
            <Link href='/admin/dashboard' className={linkClass("/admin/dashboard")}>
              Dashboard
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
            
          </>
        )}

        {isLoggedIn && (
          <Link href='/profile' className={linkClass("/profile")}>
            Profile
          </Link>
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
