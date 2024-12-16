import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    // This might include:
    // - Clearing authentication tokens
    // - Resetting user session
    // - Redirecting to login page
    console.log("Logout clicked");
    // Example: localStorage.removeItem('token');
    // Example: navigate('/login');
  };

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
        >
          TravelBuddy
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
