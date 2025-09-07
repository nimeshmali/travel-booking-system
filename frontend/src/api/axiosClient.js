// src/api/axiosClient.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// To integrate with AuthContext, add this listener in your AuthContext useEffect:
// useEffect(() => {
//   const handleAuthLogout = () => logout();
//   window.addEventListener('auth-logout', handleAuthLogout);
//   return () => window.removeEventListener('auth-logout', handleAuthLogout);
// }, []);

// Create Axios instance
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	// headers: {
	// 	"Content-Type": "application/json",
	// },
});

// Helper function to check if token is expired
const isTokenExpired = (token) => {
	try {
		const decoded = jwtDecode(token);
		return decoded.exp * 1000 <= Date.now();
	} catch {
		return true;
	}
};

// Helper function to clear auth data
const clearAuthData = () => {
	localStorage.removeItem("token");
	delete axiosClient.defaults.headers.common["Authorization"];
	
	// Dispatch custom event to notify AuthContext of logout
	window.dispatchEvent(new CustomEvent('auth-logout'));
};

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			// Check if token is expired before making request
			if (isTokenExpired(token)) {
				clearAuthData();
				// Redirect to login if not already there
				if (window.location.pathname !== "/login") {
					window.location.href = "/login";
				}
				return Promise.reject(new Error("Token expired"));
			}
			
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for handling token expiration and other auth errors
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Clear auth data on unauthorized response
			clearAuthData();

			// Redirect to login if not already there
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosClient;