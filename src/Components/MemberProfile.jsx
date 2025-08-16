const MemberProfile = ({ currentUser }) => {
  return (
    <div className="card p-6 shadow">
      <img
        src={currentUser.photo}
        alt="Member"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-center text-xl font-bold mt-2">{currentUser.name}</h2>

      {/* Email */}
      {currentUser.email && (
        <p className="text-center">{currentUser.email}</p>
      )}

      {/* Phone Number */}
      {currentUser.phone && (
        <p className="text-center">{currentUser.phone}</p>
      )}

      {/* Address */}
      {currentUser.address && (
        <p className="text-center">{currentUser.address}</p>
      )}

      <p className="text-center text-sm text-gray-500">
        Became member: {new Date(currentUser.membership_created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default MemberProfile;
