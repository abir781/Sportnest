// import { useQuery } from '@tanstack/react-query';
// import React, { useEffect } from 'react';
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const Courtpage = () => {
//     const axiosSecure=useAxiosSecure();
//     const {data: allcourts}=useQuery({
//         queryKey:['courts'],
//         queryFn: async()=>{
//             const res= await axiosSecure.get('/courts');
//             return res.data;     
//         }
//     })

// //     useEffect(() => {
// //   axiosSecure.get('/courts')
// //     .then(res => console.log('Manual axiosSecure:', res.data))
// //     .catch(err => console.error('Error:', err));
// // }, []);
//     console.log(allcourts);
//     return (
//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {allcourts.map((court) => (
//         <div
//           key={court._id}
//           className="border rounded-2xl shadow-lg p-4 space-y-3 bg-white"
//         >
//           <img
//             src={court.courtImage}
//             alt={court.courtType}
//             className="w-full h-48 object-cover rounded-xl"
//           />
//           <h2 className="text-xl font-semibold">{court.courtType}</h2>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-600">
//               Available Slots:
//             </label>
//             <select className="w-full border rounded-lg p-2">
//               {court.slotTimes.map((slot, index) => (
//                 <option key={index} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <p className="text-gray-700">
//             <span className="font-medium">Price per session:</span> ৳{court.pricePerSession}
//           </p>

//           <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
//             Book Now
//           </button>
//         </div>
//       ))}
//     </div>
//     );
// };

// export default Courtpage;


import React, { use, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
 // update path as needed

 // Modal component we'll create
import { Authcontext } from '../Context/Authcontext';
import BookingModal from '../Components/BookingModal';
import { useNavigate } from 'react-router';

const Courtpage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use (Authcontext); // assumes user object or null
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null); // for modal

  const { data: allcourts = [], isLoading, isError, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCourt(court); // open modal
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {allcourts.map((court) => (
        <div key={court._id} className="border rounded-2xl shadow-lg p-4 bg-white">
          <img src={court.courtImage} alt={court.courtType} className="w-full h-48 object-cover rounded-xl" />
          <h2 className="text-xl font-semibold">{court.courtType}</h2>

          <div>
            <label className="block mb-1 text-sm font-medium">Available Slots:</label>
            <select className="w-full border rounded-lg p-2">
              {court.slotTimes.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <p className="text-gray-700">
            <span className="font-medium">Price per session:</span> ৳{court.pricePerSession}
          </p>

          <button
            onClick={() => handleBookNow(court)}
            className="bg-blue-600 text-white w-full py-2 mt-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      ))}

      {selectedCourt && (
        <BookingModal
          court={selectedCourt}
          user={user}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default Courtpage;



