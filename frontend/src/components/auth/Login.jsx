import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/services/authService"; // Import authService for API calls

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await authService.login(email, password);
			if (response.status) {
				localStorage.setItem("isAuthenticated", "true");
				localStorage.setItem("isAdmin", response.admin ? "true" : "false");
				navigate("/");
			} else {
				setError(response.message || "Login failed");
			}
		} catch (error) {
			console.error("Login failed", error);
			setError(error.response?.data?.message || "Login failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md'>
				<div className='text-center'>
					<h1 className='text-3xl font-extrabold text-gray-900'>TravelBuddy</h1>
					<p className='mt-2 text-sm text-gray-600'>Your ultimate companion for seamless travel experiences, connecting wanderlust with convenience.</p>
				</div>

				<form className='mt-8 space-y-6' onSubmit={handleLogin}>
					<h2 className='text-2xl font-bold text-center text-gray-800'>Welcome Back</h2>

					{error && (
						<div className='bg-red-50 border-l-4 border-red-500 p-4 rounded'>
							<p className='text-red-700'>{error}</p>
						</div>
					)}

					<div className='space-y-4'>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
								Email
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								required
							/>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								required
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={loading}
							className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ${
								loading ? "opacity-70 cursor-not-allowed" : ""
							}`}>
							{loading ? "Signing in..." : "Sign In"}
						</button>
					</div>

					<div className='flex items-center justify-between'>
						<div className='text-sm'>
							<a href='#' className='font-medium text-blue-600 hover:text-blue-500 transition duration-300'>
								Forgot Password?
							</a>
						</div>
						<div className='text-sm'>
							<span onClick={() => navigate("/signup")} className='text-blue-600 hover:text-blue-800 cursor-pointer transition duration-300'>
								Don't have an account? Sign Up
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
