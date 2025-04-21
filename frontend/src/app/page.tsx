"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "./utils/auth";
import { decodeToken } from "./utils/decodeToken";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (decoded?.role === "employee") {
        router.replace("/employee/dashboard");
      } else {
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return null; // no UI here
}
