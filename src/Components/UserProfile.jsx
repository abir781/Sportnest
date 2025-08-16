import React from 'react';

const UserProfile = ({ currentUser }) => {
  return (
    <div className="card p-6 shadow">
      <img
        src={currentUser.photo}
        alt="User"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-center text-xl font-bold mt-2">{currentUser.name}</h2>
      <p className="text-center">{currentUser.email}</p>
      {/* Phone Number */}
      {currentUser.phone && (
        <p className="text-center">{currentUser.phone}</p>
      )}
      {/* Address */}
      {currentUser.address && (
        <p className="text-center">{currentUser.address}</p>
      )}
      <p className="text-center text-sm text-gray-500">
        Joined: {new Date(currentUser.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default UserProfile;
