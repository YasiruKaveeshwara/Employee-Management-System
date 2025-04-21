"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface Schedule {
  date: string;
  shiftType: string;
  startTime: string;
  endTime: string;
}

interface Profile {
  name: string;
  email: string;
}

interface Attendance {
  date: string;
  inTime: string | null;
  outTime: string | null;
}

export default function EmployeeDashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({ name: "", email: "" });
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [todaySchedule, setTodaySchedule] = useState<Schedule | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const loadProfile = async () => {
    try {
      const res = await api.get("/employee/profile");
      setProfile(res.data);
    } catch {
      router.push("/login");
    }
  };

  const loadAttendance = async () => {
    try {
      const res = await api.get("/employee/attendance");
      setAttendance(res.data);
    } catch {
      console.error("Failed to load attendance.");
    }
  };

  const loadSchedules = async () => {
    try {
      const res = await api.get("/employee/schedules");
      setSchedules(res.data);
      const today = dayjs().format("YYYY-MM-DD");
      const todayShift = res.data.find((s: Schedule) => s.date === today);
      setTodaySchedule(todayShift || null);
    } catch (err) {
      setError("Failed to load schedules.");
    }
  };

  const markAttendance = async (type: "IN" | "OUT") => {
    setMessage("");
    setError("");
    try {
      const res = await api.post(`/employee/attendance?type=${type}`);
      const time = type === "IN" ? res.data.inTime : res.data.outTime;
      setMessage(`Marked ${type} time at ${dayjs(time).format("HH:mm:ss")}`);
    } catch {
      setError(`Failed to mark ${type} time.`);
    }
  };

  useEffect(() => {
    loadProfile();
    loadSchedules();
    loadAttendance();
  }, []);

  return (
    <div className='min-h-screen bg-blue-50 p-6'>
      <div className='max-w-4xl mx-auto bg-white rounded shadow p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-blue-700'>Welcome, {profile.name}</h1>
          
        </div>

        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>Attendance History</h2>
          <table className='w-full text-sm border rounded overflow-hidden'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='text-left p-2'>Date</th>
                <th className='text-left p-2'>In Time</th>
                <th className='text-left p-2'>Out Time</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i} className='border-t'>
                  <td className='p-2'>{a.date ? dayjs(new Date(a.date)).format("YYYY-MM-DD") : "-"}</td>
                  <td className='p-2'>{a.inTime ? dayjs(new Date(a.inTime)).format("HH:mm:ss") : "-"}</td>
                  <td className='p-2'>{a.outTime ? dayjs(new Date(a.outTime)).format("HH:mm:ss") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {todaySchedule && (
          <div className='bg-yellow-100 border border-yellow-300 p-4 rounded mb-6'>
            <h2 className='text-lg font-semibold text-yellow-700 mb-1'>Today’s Shift</h2>
            <p>
              {todaySchedule.shiftType} Shift ({todaySchedule.startTime} - {todaySchedule.endTime})
            </p>
          </div>
        )}

        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>Upcoming Schedules</h2>
          <ul className='space-y-2'>
            {schedules.map((s, idx) => (
              <li key={idx} className='p-3 bg-gray-100 rounded shadow-sm'>
                <span className='block font-medium'>{s.date}</span>
                <span className='block text-sm'>
                  {s.shiftType} shift ({s.startTime} - {s.endTime})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-4 mb-4'>
          <button onClick={() => markAttendance("IN")} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
            Mark IN
          </button>
          <button onClick={() => markAttendance("OUT")} className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>
            Mark OUT
          </button>
        </div>

        {typeof message === "string" && <p className='text-green-600'>{message}</p>}

        {error && <p className='text-red-600'>{error}</p>}
      </div>
    </div>
  );
}
