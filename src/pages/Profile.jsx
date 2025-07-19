import React, { use, useContext } from 'react';
// import { AuthContext } from '../providers/AuthProvider'; // adjust path as needed
import { Authcontext } from '../Context/Authcontext';

const Profile = () => {
  const { user } = use (Authcontext);

//   if (!user) {
//     return <p className="text-center mt-10">You must be logged in to view your profile.</p>;
//   }

  const { displayName, email, photoURL, metadata } = user;
  const registrationDate = new Date(user.metadata?.creationTime).toLocaleDateString();

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex flex-col items-center text-center">
        <img
          src={photoURL}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{displayName}</h2>
        <p className="text-gray-600">{email}</p>
        <p className="text-sm text-gray-500 mt-2">Registered on: {registrationDate}</p>
      </div>
    </div>
  );
};

export default Profile;

