import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import axiosClient from "./api/axiosClient";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import BookingForm from "./components/BookingForm";
import DeletePackage from "./components/DeletePackage";
import { LoadingProvider } from "./components/hooks/loadingContext";
import Navbar from "./components/Navbar";
import PackagesList from "./components/PackageList";
import TourPackageForm from "./components/TourPackageForm";

// Check if token is valid on app load
const checkAuthToken = () => {
	const token = localStorage.getItem("token");
	if (token) {
		// Set default headers for all future requests
		axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		return true;
	}
	return false;
};

// AuthProvider Component to handle authentication state
const AuthProvider = ({ children }) => {
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Check token validity on component mount
		checkAuthToken();
		setIsInitialized(true);
	}, []);

	if (!isInitialized) {
		return <div className='flex items-center justify-center min-h-screen'>Loading...</div>;
	}

	return children;
};

// Protected Route Component with enhanced location tracking
const ProtectedRoute = ({ children, adminOnly = false }) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
	const isAdmin = localStorage.getItem("isAdmin") === "true";
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect to login but remember where user was trying to go
		return <Navigate to='/login' state={{ from: location.pathname }} replace />;
	}

	if (adminOnly && !isAdmin) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	return (
		<LoadingProvider>
			<Router>
				<AuthProvider>
					<div className='min-h-screen bg-gray-100'>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route
								path='/'
								element={
									<ProtectedRoute>
										<Navbar />
										<PackagesList />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/booking/:id'
								element={
									<ProtectedRoute>
										<Navbar />
										<BookingForm />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/manage-packages'
								element={
									<ProtectedRoute adminOnly={true}>
										<Navbar />
										<DeletePackage />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/add-packages'
								element={
									<ProtectedRoute adminOnly={true}>
										<Navbar />
										<TourPackageForm />
									</ProtectedRoute>
								}
							/>
							{/* Catch all route for redirecting unknown paths to home */}
							<Route path='*' element={<Navigate to='/' replace />} />
						</Routes>
					</div>
				</AuthProvider>
			</Router>
		</LoadingProvider>
	);
}

export default App;
