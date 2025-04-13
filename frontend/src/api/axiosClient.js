// src/api/axiosClient.js
import axios from "axios";

// Create Axios instance
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for handling token expiration
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Clear auth data on unauthorized response
			localStorage.removeItem("token");
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("isAdmin");

			// Redirect to login if not already there
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
