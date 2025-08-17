// AboutUs.jsx
import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-0">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About the Club</h2>
        <p className="text-gray-600 text-lg">
          Explore our journey, mission, and values through these core pillars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-10/12 mx-auto">
        {/* Card: History */}
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 min-h-[250px] flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">🏛 History</h3>
          <p className="leading-relaxed">
            Founded in 2010, our club started with a mission to promote sports and fitness in the community.
            Since then, we've expanded into a top-tier facility hosting events, training programs, and more.
          </p>
        </div>

        {/* Card: Mission */}
        <div className="bg-cyan-600 text-white rounded-xl shadow-lg p-6 min-h-[250px] flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">🎯 Mission</h3>
          <p className="leading-relaxed">
            To build a vibrant environment where individuals of all ages can grow through physical activity,
            teamwork, and a love for sports — all while staying healthy and connected.
          </p>
        </div>

        {/* Card: Vision */}
        <div className="bg-green-700 text-white rounded-xl shadow-lg p-6 min-h-[250px] flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">🌟 Vision</h3>
          <p className="leading-relaxed">
            We strive to become a regional leader in athletic excellence, known for inclusivity,
            innovation, and a lasting impact on every player, member, and visitor.
          </p>
        </div>

        {/* Card: Core Values */}
        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6 min-h-[250px] flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">💡 Core Values</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Respect and integrity</li>
            <li>Teamwork and fair play</li>
            <li>Diversity and inclusion</li>
            <li>Commitment to health</li>
            <li>Community engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
