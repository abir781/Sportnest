import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Authcontext } from '../Context/Authcontext';

const ConfirmedBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(Authcontext);

  const { isLoading, error, data: bookings = [] } = useQuery({
    queryKey: ['confirmedBookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center mt-6">Loading confirmed bookings...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error loading bookings</p>;

  return (
    <div className="p-6  mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Confirmed Bookings ({bookings.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">Court Type</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Slots</th>
              <th className="p-3 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center hover:bg-green-50">
                <td className="p-3 border">{booking.courtType}</td>
                <td className="p-3 border">{booking.date}</td>
                <td className="p-3 border">
                  <ul className="list-disc list-inside text-left">
                    {booking.slots?.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 border">৳{booking.totalPrice || booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
