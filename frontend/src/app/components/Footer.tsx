"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 py-6 text-center text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="mb-2 sm:mb-0">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-blue-600">Employee Management System</span>. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
