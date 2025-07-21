import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminProfile = ({ currentUser }) => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  return (
    <div className="card p-6 shadow">
      <img src={currentUser.photo} alt="Admin" className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="text-center text-xl font-bold mt-2">{currentUser.name}</h2>
      <p className="text-center">{currentUser.email}</p>
      <div className="mt-4 text-center space-y-2">
        <p>Total Courts: {stats.totalCourts}</p>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Members: {stats.totalMembers}</p>
      </div>
    </div>
  );
};

export default AdminProfile;