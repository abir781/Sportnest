import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const timeOptions = [
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
];

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    courtType: '',
    courtImage: '',
    slotTimes: [],
    pricePerSession: '',
  });
  const [editingCourtId, setEditingCourtId] = useState(null);

  // Fetch courts
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts');
      return res.data;
    },
  });

  // Add court mutation
  const addCourtMutation = useMutation({
    mutationFn: (court) => axiosSecure.post('/courts', court),
    onSuccess: () => {
      queryClient.invalidateQueries(['courts']);
      Swal.fire('Added!', 'Court added successfully.', 'success');
      resetForm();
    },
  });

  // Update court mutation
  const updateCourtMutation = useMutation({
    mutationFn: ({ id, updated }) => axiosSecure.patch(`/courts/${id}`, updated),
    onSuccess: () => {
      queryClient.invalidateQueries(['courts']);
      Swal.fire('Updated!', 'Court updated successfully.', 'success');
      resetForm();
      setEditingCourtId(null);
    },
  });

  // Delete court mutation
  const deleteCourtMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/courts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['courts']);
      Swal.fire('Deleted!', 'Court deleted successfully.', 'success');
    },
  });

  const resetForm = () => {
    setFormData({
      courtType: '',
      courtImage: '',
      slotTimes: [],
      pricePerSession: '',
    });
    setEditingCourtId(null);
  };

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === 'slotTimes') {
      // multiple select, gather selected options
      const selected = Array.from(options).filter(opt => opt.selected).map(opt => opt.value);
      setFormData((prev) => ({ ...prev, slotTimes: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { courtType, courtImage, slotTimes, pricePerSession } = formData;

    if (!courtType.trim() || !courtImage.trim() || slotTimes.length === 0 || !pricePerSession) {
      return Swal.fire('Error', 'Please fill in all fields.', 'error');
    }

    const courtData = {
      courtType: courtType.trim(),
      courtImage: courtImage.trim(),
      slotTimes,
      pricePerSession: Number(pricePerSession),
    };

    if (editingCourtId) {
      updateCourtMutation.mutate({ id: editingCourtId, updated: courtData });
    } else {
      addCourtMutation.mutate(courtData);
    }
  };

  const handleEdit = (court) => {
    setEditingCourtId(court._id);
    setFormData({
      courtType: court.courtType,
      courtImage: court.courtImage,
      slotTimes: court.slotTimes || [],
      pricePerSession: court.pricePerSession,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourtMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-8">Loading courts...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mt-2 mb-6 text-center">Manage Courts</h2>

      {/* Add / Update Court Form with border */}
      <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white shadow-sm">
        <h3 className="text-2xl font-semibold mb-4 text-center">{editingCourtId ? 'Update Court' : 'Add New Court'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="courtType"
            type="text"
            placeholder="Court Type"
            className="input input-bordered"
            value={formData.courtType}
            onChange={handleChange}
          />
          <input
            name="courtImage"
            type="text"
            placeholder="Image URL"
            className="input input-bordered"
            value={formData.courtImage}
            onChange={handleChange}
          />
          <input
            name="pricePerSession"
            type="number"
            placeholder="Price per Session"
            className="input input-bordered"
            value={formData.pricePerSession}
            onChange={handleChange}
          />
        {/* <select
  name="slotTimes"
  className="select select-bordered"
  value={formData.slotTimes[0] || ''}
  onChange={(e) => setFormData(prev => ({ ...prev, slotTimes: [e.target.value] }))}
>
  <option value="" disabled>
    Select a slot time
  </option>
  {timeOptions.map((slot) => (
    <option key={slot} value={slot}>
      {slot}
    </option>
  ))}
</select> */}

<select
  name="slotTimes"
  className="select select-bordered h-40"
  multiple
  value={formData.slotTimes}
  onChange={handleChange}
>
  {timeOptions.map((slot) => (
    <option key={slot} value={slot}>
      {slot}
    </option>
  ))}
</select>


          <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">
            {editingCourtId ? 'Update Court' : 'Add Court'}
          </button>
        </form>
      </div>

      {/* Courts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={court.courtImage}
              alt={court.courtType}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-xl font-semibold mb-1">{court.courtType}</h4>
            <p className="mb-1">
              <strong>Slots:</strong> {court.slotTimes.join(', ')}
            </p>
            <p className="mb-3">
              <strong>Price per Session:</strong> ৳{court.pricePerSession}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(court)}
                className="btn btn-warning btn-sm flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(court._id)}
                className="btn btn-error btn-sm flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourts;
