import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all announcements
  const { data: announcements = [], isLoading, isError, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-8">Loading announcements...</p>;
  if (isError) return <p className="text-center text-red-500 py-8">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">📢 Club Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements yet.</p>
      ) : (
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-blue-800">{announcement.title}</h3>
              <p className="mt-2 text-gray-700">{announcement.message}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(announcement.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;
