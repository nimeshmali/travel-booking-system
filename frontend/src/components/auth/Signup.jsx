import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/services/authService";
import { GiStripedSun } from "react-icons/gi";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await authService.signup(username, email, password);

			if (response.status) {
				navigate("/login");
			} else {
				setError(response.message || "Signup failed");
			}
		} catch (error) {
			console.error("Signup failed", error);
			setError(error.response?.data?.message || "Signup failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left Hero Section */}
			<div className="w-1/2 bg-gradient-to-br from-primary-400 to-primary-700 text-white flex flex-col justify-center items-center p-12">
				<h1 className="text-5xl font-extrabold mb-4 flex">
					<GiStripedSun className="w-8 h-8 mt-2 mr-2" />
					Tripzy</h1>
				<p className="text-xl text-center max-w-md">
					Join us today and make your travel adventures unforgettable!
				</p>
			</div>

			{/* Signup Form Section */}
			<div className="w-1/2 flex items-center justify-center bg-gray-100">
				<div className="bg-white p-10 rounded-xl shadow-2xl w-96">
					<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
						Create an Account
					</h2>

					{error && (
						<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
							<p className="text-red-700">{error}</p>
						</div>
					)}

					<form onSubmit={handleSignup}>
						{/* Username */}
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
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300"
								required
							/>
						</div>

						{/* Email */}
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-semibold mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300"
								required
							/>
						</div>

						{/* Password */}
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
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300"
								required
							/>
						</div>

						{/* Submit */}
						<button
							type="submit"
							disabled={loading}
							className={`w-full bg-gradient-to-r from-primary-400 to-primary-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 ${loading ? "opacity-70 cursor-not-allowed" : ""
								}`}
						>
							{loading ? "Creating Account..." : "Sign Up"}
						</button>

						{/* Redirect to Login */}
						<div className="text-center mt-4">
							<span
								onClick={() => navigate("/login")}
								className="text-sm text-primary-600 hover:text-primary-800 cursor-pointer transition duration-300"
							>
								Already have an account? Login
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
