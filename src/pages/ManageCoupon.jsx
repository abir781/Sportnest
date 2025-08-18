import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageCoupon = () => {
  const [form, setForm] = useState({ code: '', discount: '' });
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all coupons
  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  // Add coupon
  const addCoupon = useMutation({
    mutationFn: async (coupon) => {
      return await axiosSecure.post('/coupons', coupon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      Swal.fire('Added!', 'Coupon added successfully.', 'success');
      setForm({ code: '', discount: '' });
    },
  });

  // Delete coupon
  const deleteCoupon = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      Swal.fire('Deleted!', 'Coupon deleted.', 'success');
    },
  });

  // Update coupon
  const updateCoupon = useMutation({
    mutationFn: async ({ id, updated }) => {
      return await axiosSecure.patch(`/coupons/${id}`, updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      Swal.fire('Updated!', 'Coupon updated.', 'success');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const coupon = { code: form.code.trim().toUpperCase(), discount: parseInt(form.discount) };
    if (!coupon.code || isNaN(coupon.discount)) {
      return Swal.fire('Error', 'Please provide valid inputs', 'error');
    }
    addCoupon.mutate(coupon);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Manage Coupons</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="input input-bordered"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="input input-bordered"
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      {/* Coupon List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(coupon => (
          <div key={coupon._id} className="bg-white shadow-md p-4 rounded-lg text-gray-600">
            <h3 className="text-xl font-bold text-purple-700">{coupon.code}</h3>
            <p className="text-lg">Discount: {coupon.discount}%</p>

            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-accent btn-sm"
                onClick={() => {
                  Swal.fire({
                    title: 'Update Coupon',
                    html: `
                      <input id="swal-code" class="swal2-input" value="${coupon.code}" />
                      <input id="swal-discount" class="swal2-input" type="number" value="${coupon.discount}" />
                    `,
                    showCancelButton: true,
                    preConfirm: () => {
                      const code = document.getElementById('swal-code').value;
                      const discount = parseInt(document.getElementById('swal-discount').value);
                      if (!code || isNaN(discount)) {
                        Swal.showValidationMessage('Both fields are required and must be valid.');
                        return;
                      }
                      updateCoupon.mutate({ id: coupon._id, updated: { code, discount } });
                    }
                  });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-accent btn-sm"
                onClick={() =>
                  Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteCoupon.mutate(coupon._id);
                    }
                  })
                }
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

export default ManageCoupon;
