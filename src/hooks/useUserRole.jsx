import { use, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { Authcontext } from '../Context/Authcontext';


const useUserRole = () => {
  const { user } = use(Authcontext);
  const axiosSecure = useAxiosSecure();

  const { data: role = 'user', isLoading, isError } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email, // only run if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
