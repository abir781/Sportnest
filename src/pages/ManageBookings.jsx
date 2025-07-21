import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['manageBookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/manage?search=${search}`);
      return res.data;
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Bookings</h2>

      <input
        type="text"
        placeholder="Search by court title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-sm block mx-auto mb-4"
      />

      {isLoading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-blue-200 text-black">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Court</th>
                <th>Slots</th>
                <th>Price</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.userName || 'N/A'}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.slots?.join(', ')}</td>
                  <td>${booking.totalPrice}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
