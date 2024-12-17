import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://travel-booking-system-nine.vercel.app/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.status) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", response.data.admin ? "true" : "false");
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - App Introduction */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-bold mb-4">TravelBuddy</h1>
        <p className="text-xl text-center max-w-md">
          Your ultimate companion for seamless travel experiences, connecting
          wanderlust with convenience.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <div className="text-center mt-4">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
