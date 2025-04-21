import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Admin panel for managing employees, attendance, and scheduling",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-[#f7faff] text-gray-800 min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow px-6 py-4'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
