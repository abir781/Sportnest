import React from 'react';

import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 text-center">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold  mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
      
    </div>
  );
};

export default Forbidden;
