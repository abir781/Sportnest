import React, { useState } from 'react';

import { Menu, X } from 'lucide-react'; // icon package, optional
import { FaHome, FaUser, FaClipboardList, FaBullhorn } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { name: 'Home', to: '/', icon: <FaHome /> },
//     { name: 'Profile', to: '/dashboard/profile', icon: <FaUser /> },
//     { name: 'Bookings', to: '/dashboard/bookings', icon: <FaClipboardList /> },
//     // Add more routes here
//   ];

  return (
    <div className="flex min-h-screen bg-blue-900">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 top-0 left-0  text-white w-64 h-full p-5 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="text-xl font-bold mb-8">🏀 Sports Club</div>
        <nav className="flex flex-col gap-3">
          
            <NavLink
             
              to='/dashboard'
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-blue-900 font-semibold' : 'hover:bg-blue-800'
                }`
              }
              onClick={() => setIsOpen(false)} // close on small screen click
            >
              <FaUser /> Profile
            </NavLink>

             <NavLink
             
              to='/dashboard/pending-bookings'
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-blue-900 font-semibold' : 'hover:bg-blue-800'
                }`
              }
              onClick={() => setIsOpen(false)} // close on small screen click
            >
              <FaClipboardList /> Pending Booking
            </NavLink>

             <NavLink
             
              to='/dashboard/announcements'
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-blue-900 font-semibold' : 'hover:bg-blue-800'
                }`
              }
              onClick={() => setIsOpen(false)} // close on small screen click
            >
              <FaBullhorn /> Announcement
            </NavLink>
        
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Topbar for small screens */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center sticky top-0 z-30">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="text-2xl" />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet /> {/* Your child route components will render here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
