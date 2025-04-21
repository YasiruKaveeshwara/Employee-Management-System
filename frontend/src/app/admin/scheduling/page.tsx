'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/app/lib/api';

interface Schedule {
  id?: number;
  date: string;
  shiftType: string;
  user: {
    name: string;
  };
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchSchedules = async () => {
    try {
      const res = await api.get('/admin/schedules'); 
      setSchedules(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load schedules.');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="min-h-screen px-8 py-6 bg-blue-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">Scheduled Shifts</h1>
          <Link href="/admin/scheduling/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
            + Add Schedule
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <table className="w-full table-auto">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Shift</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{schedule.user.name}</td>
                <td className="p-3">{schedule.date}</td>
                <td className="p-3">{schedule.shiftType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
