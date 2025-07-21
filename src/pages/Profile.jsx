import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Authcontext } from '../Context/Authcontext';
import AdminProfile from '../Components/AdminProfile';
import MemberProfile from '../Components/MemberProfile';
import UserProfile from '../Components/UserProfile';

const ProfileInfo = () => {
  const { user } = use(Authcontext);
  const axiosSecure = useAxiosSecure();

  // const { data: userInfo = {}, isLoading, isError } = useQuery({
  //   queryKey: ['userInfo', user?.email],
  //   enabled: !!user?.email,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users/${user.email}`);
  //     return res.data;
  //   },
  // });
  const { data: currentUser = {}, isLoading } = useQuery({
  queryKey: ['currentUser', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email
});

  if (isLoading) return <p className="text-center">Loading profile...</p>;
  // if (isError) return <p className="text-center text-red-500">Failed to load user info</p>;

  return (
  <div className="p-6">
    {currentUser.role === 'admin' ? (
      <AdminProfile currentUser={currentUser} />
    ) : currentUser.role === 'member' ? (
      <MemberProfile currentUser={currentUser} />
    ) : (
      <UserProfile currentUser={currentUser} />
    )}
  </div>
);
};

export default ProfileInfo;


