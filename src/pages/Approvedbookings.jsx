import React, { use, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';


import Swal from 'sweetalert2';

import { Authcontext } from '../Context/Authcontext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const Approvedbookings = () => {
  const { user } = use(Authcontext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Fetch approved bookings
  const {
    data: approvedBookings = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['approvedBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Cancel Booking
  const cancelBooking = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
      refetch(); // ✅ refetch after delete
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to cancel booking.', 'error');
    }
  });

  // ✅ Handle cancel
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This booking will be removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking.mutate(id);
      }
    });
  };

  // ✅ Handle payment redirect
  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}` );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Approved Bookings ({approvedBookings.length})</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Court</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Slots</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="p-2 border">{booking.courtType}</td>
                <td className="p-2 border">{booking.date}</td>
                <td className="p-2 border">
                  <ul className="list-disc list-inside">
                    {booking.slots.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border">৳{booking.totalPrice}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Pay Now
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvedbookings;
