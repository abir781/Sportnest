import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Authcontext } from '../Context/Authcontext';

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(Authcontext);

  const { isLoading, error, data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error fetching payment history</p>;

  return (
    <div className="p-4  mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Payment History ({payments.length})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">Booking ID</th>
              <th className="p-3 border">Court Type</th>
              <th className="p-3 border">Slots</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Method</th>
              <th className="p-3 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="text-center hover:bg-blue-50">
                <td className="p-3 border">{payment.bookingId}</td>
                <td className="p-3 border">{payment.courtType}</td>
                <td className="p-3 border">
                  <ul className="list-disc list-inside text-left">
                    {payment.slots?.map((slot, idx) => (
                      <li key={idx}>{slot}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 border">৳{payment.price}</td>
                <td className="p-3 border">{payment.transactionId}</td>
                <td className="p-3 border">{payment.paymentMethod?.join(', ')}</td>
                <td className="p-3 border">
                  {new Date(payment.createdAt).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
