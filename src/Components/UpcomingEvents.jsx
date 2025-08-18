import React from "react";

const events = [
  {
    id: 1,
    title: "Summer Basketball Tournament",
    date: "2025-09-10",
    location: "Main Court, SportNest",
    description:
      "Join our annual summer basketball tournament! Open for all skill levels. Prizes for winners.",
    image: "https://i.ibb.co.com/WXsb75V/n1.jpg",
  },
  {
    id: 2,
    title: "Tennis Open Day",
    date: "2025-09-20",
    location: "Tennis Court 3",
    description:
      "Try our tennis courts for free, meet our trainers, and participate in mini-games!",
    image: "https://i.ibb.co.com/ksvLBrkY/n2.jpg",
  },
  {
    id: 3,
    title: "Table Tennis Championship",
    date: "2025-10-05",
    location: "Indoor Table Tennis Court",
    description:
      "Compete with other members in our exciting table tennis championship. Fun and prizes await!",
    image: "https://i.ibb.co.com/7xNd7sjt/n3.jpg",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-12 ">
      <div className="max-w-10/12 mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events & Tournaments</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl text-gray-600 font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-1">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm mb-3">📍 {event.location}</p>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
