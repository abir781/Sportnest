import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    role: "Club Member",
    review:
      "This club has completely changed my fitness journey! The courts are excellent and booking is super easy.",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    role: "Tennis Player",
    review:
      "Amazing facilities and friendly staff. I love the smooth booking process and community vibe.",
    rating: 4,
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Basketball Enthusiast",
    review:
      "Great experience every time. The management team really listens to members’ feedback!",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const Reviews = () => {
  return (
    <section className="py-12 ">
      <div className="max-w-10/12 mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-500"
              />
              <h3 className="text-xl text-gray-600 font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{review.role}</p>
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
