import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const OverviewPage = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch stats from backend
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  // Data for charts
  const pieData = [
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Members', value: stats.totalMembers || 0 },
    { name: 'Courts', value: stats.totalCourts || 0 }
  ];

  const barData = [
    { name: 'Users', count: stats.totalUsers || 0 },
    { name: 'Members', count: stats.totalMembers || 0 },
    { name: 'Courts', count: stats.totalCourts || 0 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Members</h2>
          <p className="text-2xl font-bold">{stats.totalMembers || 0}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Courts</h2>
          <p className="text-2xl font-bold">{stats.totalCourts || 0}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-center mb-4">Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-center mb-4">Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
