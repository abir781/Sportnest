const promotions = [
  { code: 'ABC', discount: 5 },
  { code: 'SPORT10', discount: 10 },
  { code: 'ELITE15', discount: 15 },
  { code: 'CLUB20', discount: 20 },
  { code: 'PRO25', discount: 25 },
   { code: 'WIN30', discount: 30 },
];

const Promotions = () => {
  return (
    <div className="py-12 px-4 md:px-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">🎁 Exclusive Promotions</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-10/12 mx-auto">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">Coupon Code</h3>
            <div className="text-3xl font-bold tracking-widest bg-white text-purple-700 px-4 py-2 inline-block rounded-md shadow-inner">
              {promo.code}
            </div>
            <p className="mt-4 text-lg">Get <span className="font-bold">{promo.discount}%</span> off on your booking!</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
