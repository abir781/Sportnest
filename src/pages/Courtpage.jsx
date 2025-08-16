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


// import React, { use, useContext, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../hooks/useAxiosSecure';
//  // update path as needed

//  // Modal component we'll create
// import { Authcontext } from '../Context/Authcontext';
// import BookingModal from '../Components/BookingModal';
// import { useNavigate } from 'react-router';

// const Courtpage = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = use (Authcontext); // assumes user object or null
//   const navigate = useNavigate();
//   const [selectedCourt, setSelectedCourt] = useState(null); // for modal
//   const [itemperpage,setitemperpage]=useState(6);
//   const [currentpage,setcurrentpage]=useState(0);

//    const { data: courtscount = []} = useQuery({
//     queryKey: ['courtsnumber'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/courtscount');
//       return res.data;
//     },
//   });
//   // console.log(courtscount)
//   // const {count}=courtscount;
//   const count = courtscount?.count || 0;
//   // console.log(count)
//   // const itemperpage=6;
//   const numberofpage= Math.ceil(count/itemperpage);
//   // console.log(numberofpage)
//   const pages= [...Array(numberofpage).keys()]
//   // console.log(pages)

//   const { data: allcourts = [], isLoading, isError, error } = useQuery({
//     queryKey: ['courts',currentpage, itemperpage],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/courts?page=${currentpage}&size=${itemperpage}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   const handleBookNow = (court) => {
//     if (!user) {
//       navigate('/login');
//     } else {
//       setSelectedCourt(court); // open modal
//     }
//   };

//   const handleitemperpage = (e) =>{
//     console.log(e.target.value);
//     const val=parseInt(e.target.value);
//     setitemperpage(val);
//     setcurrentpage(0);

//   }

//   const handleprev = ()=>{
//     if(currentpage >0){
//       setcurrentpage(currentpage-1)
//     }
//   }

//    const handlenext = ()=>{
//     if(currentpage < pages.length-1){
//       setcurrentpage(currentpage+1)
//     }
//   }

//   return (
//     <div className='pb-4'>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {allcourts.map((court) => (
//         <div key={court._id} className="border rounded-2xl shadow-lg p-4 bg-white">
//           <img src={court.courtImage} alt={court.courtType} className="w-full h-48 object-cover rounded-xl" />
//           <h2 className="text-xl font-semibold">{court.courtType}</h2>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Available Slots:</label>
//             <select className="w-full border rounded-lg p-2">
//               {court.slotTimes.map((slot, index) => (
//                 <option key={index} value={slot}>{slot}</option>
//               ))}
//             </select>
//           </div>

//           <p className="text-gray-700">
//             <span className="font-medium">Price per session:</span> ৳{court.pricePerSession}
//           </p>

//           <button
//             onClick={() => handleBookNow(court)}
//             className="bg-blue-600 text-white w-full py-2 mt-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Book Now
//           </button>
//         </div>
//       ))}

      

//       {selectedCourt && (
//         <BookingModal
//           court={selectedCourt}
//           user={user}
//           onClose={() => setSelectedCourt(null)}
//         />
//       )}
//     </div>
//     <div className='flex justify-center gap-3'>
//       <button onClick={handleprev} className='px-3 py-2 bg-green-700 rounded text-white'>Prev</button>

//        {
//         pages.map(page=><button onClick={()=>setcurrentpage(page)} key={page}  className={`px-3 py-2 rounded bg-gray-600 text-white  ${currentpage === page ? 'bg-orange-500' : 'bg-gray-600'}`}>{page}</button>)
//       }
//       <select value={itemperpage} onChange={handleitemperpage} name='' id=''>
//         <option value="6">6</option>
//         <option value="10">10</option>
//         <option value="20">20</option>
//       </select>

//        <button onClick={handlenext} className='px-3 py-2 bg-green-700 rounded text-white'>Next</button>

//     </div>

   

//     </div>
    
//   );
// };

// export default Courtpage;

import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Authcontext } from '../Context/Authcontext';
import BookingModal from '../Components/BookingModal';
import { useNavigate } from 'react-router';

const Courtpage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(Authcontext); 
  const navigate = useNavigate();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [itemperpage, setitemperpage] = useState(6);
  const [currentpage, setcurrentpage] = useState(0);
  const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc" | ""

  const { data: courtscount = [] } = useQuery({
    queryKey: ['courtsnumber'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courtscount');
      return res.data;
    },
  });

  const count = courtscount?.count || 0;
  const numberofpage = Math.ceil(count / itemperpage);
  const pages = [...Array(numberofpage).keys()];

  const { data: allcourts = [], isLoading, isError, error } = useQuery({
    queryKey: ['courts', currentpage, itemperpage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/courts?page=${currentpage}&size=${itemperpage}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // 🔹 Sorting logic
  const sortedCourts = [...allcourts].sort((a, b) => {
    if (sortOrder === "asc") return a.pricePerSession - b.pricePerSession;
    if (sortOrder === "desc") return b.pricePerSession - a.pricePerSession;
    return 0;
  });

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCourt(court);
    }
  };

  const handleitemperpage = (e) => {
    const val = parseInt(e.target.value);
    setitemperpage(val);
    setcurrentpage(0);
  };

  const handleprev = () => {
    if (currentpage > 0) {
      setcurrentpage(currentpage - 1);
    }
  };

  const handlenext = () => {
    if (currentpage < pages.length - 1) {
      setcurrentpage(currentpage + 1);
    }
  };

  return (
    <div className="pb-4">
      {/* 🔹 Sorting Dropdown */}
      <div className="flex justify-end p-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* 🔹 Courts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {sortedCourts.map((court) => (
          <div
            key={court._id}
            className="flex flex-col justify-between border rounded-2xl shadow-lg p-4 bg-white h-[400px]"
          >
            {/* Card Content */}
            <div>
              <img
                src={court.courtImage}
                alt={court.courtType}
                className="w-full h-48 object-cover rounded-xl"
              />
              <h2 className="text-xl font-semibold mt-2">{court.courtType}</h2>

              <div className="mt-2">
                <label className="block mb-1 text-sm font-medium">
                  Available Slots:
                </label>
                <select className="w-full border rounded-lg p-2">
                  {court.slotTimes.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-gray-700 mt-2">
                <span className="font-medium">Price per session:</span> ৳
                {court.pricePerSession}
              </p>
            </div>

            {/* Book Now Button stays inside card */}
            <button
              onClick={() => handleBookNow(court)}
              className="bg-blue-600 text-white w-full py-2 mt-1 rounded-lg hover:bg-blue-700 transition"
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

      {/* 🔹 Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={handleprev}
          className="px-3 py-2 bg-green-700 rounded text-white"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            onClick={() => setcurrentpage(page)}
            key={page}
            className={`px-3 py-2 rounded text-white ${
              currentpage === page ? "bg-orange-500" : "bg-gray-600"
            }`}
          >
            {page}
          </button>
        ))}

        <select value={itemperpage} onChange={handleitemperpage}>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <button
          onClick={handlenext}
          className="px-3 py-2 bg-green-700 rounded text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courtpage;






