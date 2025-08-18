import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Promotions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: promotions = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    }
  });

  return (
    <div className="py-12 px-4 md:px-0 ">
      <h2 className="text-3xl font-bold text-center mb-6">🎁 Exclusive Promotions</h2>

      {isLoading ? (
        <p className="text-center">Loading promotions...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-10/12 mx-auto">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="bg-white text-gray-600  p-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Coupon Code</h3>
              <div className="text-3xl font-bold tracking-widest  px-4 py-2 inline-block rounded-md shadow-inner">
                {promo.code}
              </div>
              <p className="mt-4 text-lg">
                Get <span className="font-bold">{promo.discount}%</span> off on your booking!
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Promotions;
