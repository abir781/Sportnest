// import React, { use } from 'react';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Authcontext } from '../Context/Authcontext';
// import Swal from 'sweetalert2';


// const Managebookingapproval = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = use (Authcontext);
//   const queryClient = useQueryClient();

//   const { data: allbookings = [], isLoading, isError, error, refetch } = useQuery({
//     queryKey: ['bookings', user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings`);
//       return res.data;
//     },
//   });


//   const deleteBooking = useMutation({
//     mutationFn: async (id) => {
//       const res = await axiosSecure.delete(`/bookings/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bookings', user.email]);
//       Swal.fire('Deleted!', 'Your booking has been cancelled.', 'success');
//       refetch();
      
//     },
//     onError: () => {
      
//       console.error(error.response?.data || error.message);
//       Swal.fire('Error!', 'Failed to cancel booking.', 'error');
//     }
//   });

//    const updateStatus = useMutation({
//     mutationFn: async ({ id, status,email }) => {
//       const res = await axiosSecure.patch(`/bookings/${id}`, { status,email });
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bookings', user.email]);
//       Swal.fire('Updated!', 'Booking status updated.', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error!', 'Failed to update status.', 'error');
//     }
//   });

//     const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, cancel it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteBooking.mutate(id);
//       }
//     });
//   };

//   const handleStatusChange = (id, status,email) => {
//     updateStatus.mutate({ id, status,email });
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">All the Pending Bookings ({allbookings.length})</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-300">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="p-2 border">Court Type</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Slots</th>
//                <th className="p-2 border">Email</th>
//               <th className="p-2 border">Total Price</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allbookings.map((booking) => (
//               <tr key={booking._id} className="text-center">
//                 <td className="p-2 border">{booking.courtType}</td>
//                 <td className="p-2 border">{booking.date}</td>
//                 <td className="p-2 border">
//                   <ul className="list-disc list-inside">
//                     {booking.slots.map((slot, idx) => (
//                       <li key={idx}>{slot}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="p-2 border">{booking.userEmail}</td>
//                 <td className="p-2 border">৳{booking.totalPrice}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(booking._id)}
//                   >
//                     Cancel
//                   </button>

//                      <button
//                         onClick={() => handleStatusChange(booking._id, 'approved',booking.userEmail)}
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                       >
//                         Accept
//                       </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Managebookingapproval;

import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Authcontext } from '../Context/Authcontext';
import Swal from 'sweetalert2';

const Managebookingapproval = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = React.useContext(Authcontext);
  const queryClient = useQueryClient();

  const { data: allbookings = [], isLoading, isError, error } = useQuery({
    queryKey: ['bookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, email }) => {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status, email });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings', user.email]);
      Swal.fire('Updated!', 'Booking status updated.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update status.', 'error');
    }
  });

  const handleStatusChange = (id, status, email) => {
    updateStatus.mutate({ id, status, email });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Pending Bookings ({allbookings.length})</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-blue-100 text-gray-600">
            <tr>
              <th className="p-2 border">Court Type</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Slots</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {allbookings.map((booking) => (
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
                <td className="p-2 border">{booking.userEmail}</td>
                <td className="p-2 border">৳{booking.totalPrice}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => handleStatusChange(booking._id, 'approved', booking.userEmail)}
                    className="btn btn-accent"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking._id, 'rejected', booking.userEmail)}
                    className="btn btn-accent"
                  >
                    Reject
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

export default Managebookingapproval;
