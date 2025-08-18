import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const [form, setForm] = useState({ title: '', message: '' });
  const [editId, setEditId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  // Add or Update announcement
  const saveAnnouncement = useMutation({
    mutationFn: async (data) => {
      if (editId) {
        return axiosSecure.patch(`/announcements/${editId}`, data);
      }
      return axiosSecure.post('/announcements', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      setForm({ title: '', message: '' });
      setEditId(null);
      Swal.fire('Success!', `Announcement ${editId ? 'updated' : 'added'} successfully`, 'success');
    }
  });

  // Delete announcement
  const deleteAnnouncement = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/announcements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      Swal.fire('Deleted!', 'Announcement deleted successfully', 'success');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return;
    saveAnnouncement.mutate(form);
  };

  const handleEdit = (a) => {
    setForm({ title: a.title, message: a.message });
    setEditId(a._id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnnouncement.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Make Announcement</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Announcement Title"
          className="input input-bordered w-full"
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Announcement Message"
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-accent block mx-auto">
          {editId ? 'Update' : 'Add'} Announcement
        </button>
      </form>

      {/* List */}
      {isLoading ? (
        <p>Loading announcements...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.map((a) => (
            <div key={a._id} className="card bg-white text-gray-600 shadow-md p-4">
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p>{a.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(a.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end gap-2 mt-3">
                <button className="btn btn-xs btn-accent" onClick={() => handleEdit(a)}>Edit</button>
                <button className="btn btn-xs btn-accent" onClick={() => handleDelete(a._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MakeAnnouncement;
