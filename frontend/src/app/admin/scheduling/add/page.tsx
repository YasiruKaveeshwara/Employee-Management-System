'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';

export default function AddSchedulePage() {
  const router = useRouter();
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('DAY');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/admin/employees');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post(`/admin/schedule/${selectedUser}`, null, {
        params: { date, shiftType: shift },
      });
      router.push('/admin/scheduling');
    } catch (err) {
      console.error(err);
      setError('Failed to assign schedule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-blue-50">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Assign Shift to Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Select Employee</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required className="w-full mt-1 border rounded px-4 py-2">
              <option value="">-- Choose Employee --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full mt-1 border rounded px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Shift Type</label>
            <select value={shift} onChange={(e) => setShift(e.target.value)} required className="w-full mt-1 border rounded px-4 py-2">
              <option value="DAY">Day</option>
              <option value="AFTERNOON">Afternoon</option>
              <option value="NIGHT">Night</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium" disabled={loading}>
            {loading ? 'Assigning...' : 'Assign Schedule'}
          </button>
        </form>
      </div>
    </div>
  );
}
