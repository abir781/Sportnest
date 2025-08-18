import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mt-2 mb-4 text-center">All Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered w-full block max-w-md mx-auto mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user._id} className="card bg-base-100 shadow-xl p-4">
            <img src={user.photo} alt={user.name} className="rounded-full w-24 h-24 mx-auto" />
            <div className="text-center mt-4">
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm">{user.email}</p>
              <p className="text-xs mt-1">Role: {user.role}</p>
              <p className="text-xs text-gray-500">Joined: {new Date(user.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allusers;