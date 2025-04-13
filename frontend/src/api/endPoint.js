const API_BASE = "/packages";
const USER_BASE = "/users";
const ADMIN = "/admin";
const AUTH = "/auth";

const endpoints = {
	// Package API
	GET_PACKAGE_DETAILS: (id) => `${API_BASE}/${id}`,
	GET_ALL_PACKAGES: () => `${API_BASE}`,
	BOOK_PACKAGE: (id) => `${API_BASE}/book/${id}`,
	DELETE_PACKAGE: (id) => `${ADMIN}${API_BASE}/${id}`,

	// User API
	USER_BOOKING: (id) => `${USER_BASE}/bookings/${id}`,

	// Auth API
	LOGIN: `${AUTH}/login`,
	SIGNUP: `${AUTH}/signup`,
};

export default endpoints;
