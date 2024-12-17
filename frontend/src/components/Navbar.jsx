import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LogOutIcon,
  PackagePlusIcon,
  BackpackIcon,
  UploadIcon,
  Trash2Icon,
  PlusIcon,
} from "lucide-react";
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
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-md">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-gray-200 transition duration-300 flex items-center"
        >
          <BackpackIcon className="h-7 w-7 mr-2" />
          TravelBuddy
        </Link>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/manage-packages"
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition duration-300 flex items-center"
            >
              <Trash2Icon className="mr-2" />
              Delete Packages
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/add-packages"
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition duration-300 flex items-center"
            >
              <PlusIcon className="mr-2" />
              Add Packages
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition duration-300 flex items-center"
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
