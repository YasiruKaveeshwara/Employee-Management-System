export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">Welcome, Admin! 🎉</p>
        <p className="mt-2 text-gray-600">Here you can manage employees, attendance, and schedules.</p>
      </div>
    </div>
  );
}
