// import React, { use } from 'react';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import { Authcontext } from '../Context/Authcontext';

// const Pendingbookings = () => {

//     const axiosSecure = useAxiosSecure();
//   const { user } = use (Authcontext);

//      const { data: allbookings = [], isLoading, isError, error } = useQuery({
//     queryKey: ['bookings', user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings?email=${user.email}`);
//       return res.data;
//     },
//   });

//     if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;
//     return (
//         <div>
//             {allbookings.length}
            
//         </div>
//     );
// };

// export default Pendingbookings;

import React, { use } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Authcontext } from '../Context/Authcontext';
import Swal from 'sweetalert2';


const Pendingbookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use (Authcontext);
  const queryClient = useQueryClient();

  const { data: allbookings = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['bookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });


  const deleteBooking = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings', user.email]);
      Swal.fire('Deleted!', 'Your booking has been cancelled.', 'success');
      refetch();
      
    },
    onError: () => {
      
      console.error(error.response?.data || error.message);
      Swal.fire('Error!', 'Failed to cancel booking.', 'error');
    }
  });

   const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status });
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

    const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking.mutate(id);
      }
    });
  };

  const handleStatusChange = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Pending Bookings ({allbookings.length})</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">Court Type</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Slots</th>
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
                <td className="p-2 border">৳{booking.totalPrice}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel
                  </button>

                     <button
                        onClick={() => handleStatusChange(booking._id, 'approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Accept
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

export default Pendingbookings;



// import React, { use } from 'react';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Authcontext } from '../Context/Authcontext';
// import Swal from 'sweetalert2';


// const Pendingbookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = use (Authcontext);
//   const queryClient = useQueryClient();

//   const { data: allbookings = [], isLoading, isError, error, refetch } = useQuery({
//     queryKey: ['bookings', user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings?email=${user.email}`);
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

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">My Pending Bookings ({allbookings.length})</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-300">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="p-2 border">Court Type</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Slots</th>
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
//                 <td className="p-2 border">৳{booking.totalPrice}</td>
//                 <td className="p-2 border">
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(booking._id)}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Pendingbookings;

