import React, { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

import Swal from 'sweetalert2';
import { useContext } from 'react';
import { Authcontext } from '../Context/Authcontext';

const ManageMembers = () => {
  const [search, setSearch] = useState('');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(Authcontext);

  // ✅ Fetch Members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/members?search=${search}`);
      return res.data;
    }
  });

  // ✅ Delete Member
  const deleteMemberMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/members/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
      Swal.fire('Deleted!', 'Member has been deleted.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete member.', 'error');
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMemberMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mt-2 mb-4 text-center">Manage Members</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
        className="input input-bordered w-full max-w-xs block mx-auto mb-6"
      />

      {isLoading ? (
        <p>Loading members...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member) => (
            <div key={member._id} className="card bg-base-100 shadow-md p-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <h3 className="text-center font-bold mt-2">{member.name}</h3>
              <p className="text-center text-sm">{member.email}</p>
              <p className="text-center text-xs text-gray-500 mt-1">
                Joined: {new Date(member.created_at).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(member._id)}
                className="btn btn-error mt-4 w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;