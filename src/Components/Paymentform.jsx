// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import { useParams } from 'react-router';
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const Paymentform = () => {
//     const stripe=useStripe();
//     const elements=useElements();
//     const {id}=useParams();
//     const axiosSecure=useAxiosSecure();
//     const [error,seterror]=useState('');

//     const {isLoading,data:approved=[]}=useQuery({
//         queryKey:['approved',id],
//         queryFn:async()=>{
//             const res=await axiosSecure.get(`/bookings/approved/${id}`);
//             return res.data;

//         }
//     })
//     console.log(approved)
//     const handlesubmit=async(e)=>{
//         e.preventDefault();
//         if(!stripe || !elements){
//             return;
//         }
//         const card=elements.getElement(CardElement);
//         if(!card){
//             return;
//         }
//         const {error,paymentMethod}=await stripe.createPaymentMethod({
//             type:'card',
//             card,
//         })
//         if(error){
//             seterror(error.message)
//         }
//         else{
//             seterror('')
//             console.log('payment method',paymentMethod)
//         }
//     }

//     if (isLoading) return <p>Loading...</p>;
//     return (
//         <div>
//             <form onSubmit={handlesubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
//                 <CardElement className='p-2 border rounded'>
                     
//                 </CardElement>
//                  <button type="submit" disabled={!stripe} className='btn btn-primary text-black w-full'>
//                            Pay
//                        </button>
//                        {
//                         error && <p className='text-red-500'>{error}</p>
//                        }

//             </form>
            
//         </div>
//     );
// };

// export default Paymentform;


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import { Authcontext } from '../Context/Authcontext';

import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';

const Paymentform = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const {user}=use (Authcontext)

  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [processing, setProcessing] = useState(false);

  // ✅ TanStack Query in your style
  const { isLoading, data: approved = {} } = useQuery({
    queryKey: ['approved', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${id}`);
      return res.data;
    }
  });

  // ✅ Update final price when approved data arrives
  useEffect(() => {
    if (approved.totalPrice) {
      setFinalPrice(approved.totalPrice);
    }
  }, [approved]);

  // ✅ Apply Coupon Logic
  // const handleApplyCoupon = () => {
  //   if (coupon === 'SAVE20') {
  //     const discountAmount = approved.totalPrice * 0.2;
  //     setDiscount(discountAmount);
  //     setFinalPrice(approved.totalPrice - discountAmount);
  //     Swal.fire('Success!', 'Coupon applied successfully!', 'success');
  //   } else {
  //     setDiscount(0);
  //     setFinalPrice(approved.totalPrice);
  //     Swal.fire('Invalid Coupon', 'This coupon is not valid', 'error');
  //   }
  // };

  const handleApplyCoupon = async () => {
  if (!coupon) return Swal.fire('Warning', 'Please enter a coupon code.', 'warning');

  try {
    const res = await axiosSecure.get(`/coupons/${coupon}`);
    const foundCoupon = res.data;

    const discountAmount = approved.totalPrice * (foundCoupon.discount / 100);
    setDiscount(discountAmount);
    setFinalPrice(approved.totalPrice - discountAmount);

    Swal.fire('Success!', `Coupon applied (${foundCoupon.discount}% off)`, 'success');
  } catch (err) {
    setDiscount(0);
    setFinalPrice(approved.totalPrice);
    Swal.fire('Invalid Coupon', 'This coupon is not valid or expired.', 'error');
  }
};

  const amountincents=finalPrice*100;
  console.log(amountincents);

  // ✅ Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    setError('');
    // console.log('payment method',paymentMethod)

    const res= await axiosSecure.post('/create-payment-intent',{
      amount: amountincents,
      id
    })

    const clientSecret=res.data.clientSecret;

    const result=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
          name: user.displayName,
          email: user.email,
        },
      }
    })
    if(result.error){
      setError(result.error.message);
    }else{
      setError('');
      if(result.paymentIntent.status==='succeeded'){
        console.log('payment secceeded');
        console.log(result);
        // ✅ Store payment data
    const paymentInfo = {
      bookingId: approved._id,
      email: approved.userEmail,
      courtType: approved.courtType,
      slots: approved.slots,
      date: approved.date,
      price: finalPrice,
      status: 'confirmed',
      transactionId: result.paymentIntent.id,
      paymentMethod: result.paymentIntent.payment_method_types,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/payments', paymentInfo);
      if (res.data?.insertedId) {
        Swal.fire('Payment Successful!', 'Your booking is confirmed.', 'success');
        // navigate('/dashboard/confirmed-bookings');
      }
    } catch (err) {
      console.error('Payment storage failed', err.response?.data || err.message);
      Swal.fire('Error', 'Failed to store payment data', 'error');
    } finally {
      setProcessing(false);
    }
      }
    }
    console.log('res from intent',res)



    
  };

  if (isLoading) return <p className="text-center">Loading booking info...</p>;
  if (!approved?._id) return <p className="text-red-500 text-center">Booking not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>

      {/* Coupon Field */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="input input-bordered w-full"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={handleApplyCoupon} className="btn btn-accent">
          Apply
        </button>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={approved.userEmail} readOnly className="input input-bordered w-full" />
        <input type="text" value={approved.courtType} readOnly className="input input-bordered w-full" />
        <input type="text" value={approved.date} readOnly className="input input-bordered w-full" />
        <input type="text" value={approved.slots?.join(', ')} readOnly className="input input-bordered w-full" />
        <input type="text" value={`৳${finalPrice}`} readOnly className="input input-bordered w-full" />

        <CardElement className="p-3 border rounded-md" />

        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary w-full"
        >
          {processing ? 'Processing...' : `Pay ${finalPrice}`}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Paymentform;
