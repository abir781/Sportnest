import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const BookingModal = ({ court, user, onClose }) => {
  const { register, handleSubmit, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedSlots = watch('slots') || [];

  useEffect(() => {
    setTotalPrice(selectedSlots.length * court.pricePerSession);
  }, [selectedSlots, court.pricePerSession]);

  const onSubmit = async (data) => {
    const bookingInfo = {
      courtId: court._id,
      courtType: court.courtType,
      userName: user.displayName,
      userEmail: user.email,
      slots: data.slots,
      date: data.date,
      totalPrice,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/bookings', bookingInfo);
      // console.log('Booking response:', res.data);
      // alert('Booking request sent!');
      toast.success("Booking request sent!");
      onClose(); // close modal
    } catch (error) {
      // console.error('Booking error:', error);
      // alert('Something went wrong');
      toast.warning("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✖</button>
        <h2 className="text-xl font-semibold mb-4">Book {court.courtType}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Read-only court info */}
          <div>
            <label>Court Type</label>
            <input value={court.courtType} readOnly className="w-full border rounded p-2" />
          </div>

          <div>
            <label>Price per Session</label>
            <input value={`৳${court.pricePerSession}`} readOnly className="w-full border rounded p-2" />
          </div>

          {/* Editable fields */}
         <div>
  <label className="block font-medium mb-1">Select Slot(s)</label>
  <div className="grid gap-2">
    {court.slotTimes.map((slot, idx) => (
      <label key={idx} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={slot}
          {...register('slots')}
          className="accent-blue-600"
        />
        <span>{slot}</span>
      </label>
    ))}
  </div>
</div>

          <div>
            <label>Select Date</label>
            <input type="date" {...register('date', { required: true })} className="w-full border rounded p-2" />
          </div>

          {/* Total price */}
          <p className="font-semibold">Total Price: ৳{totalPrice}</p>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
