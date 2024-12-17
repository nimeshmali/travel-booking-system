import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOutIcon, PackagePlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status from localStorage when component mounts
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-8 mb-5 pt-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition duration-300"
        >
          TravelBuddy
        </Link>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/manage-packages"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 flex items-center"
            >
              <PackagePlusIcon className="mr-2" />
              Manage Packages
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <LogOutIcon className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
