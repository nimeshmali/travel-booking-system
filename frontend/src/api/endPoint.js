const API_BASE = "/packages";
const USER_BASE = "/users";
const ADMIN = "/admin";
const AUTH = "/auth";

const endpoints = {
	// Package API
	GET_PACKAGE_DETAILS: (id) => `${API_BASE}/${id}`,
	GET_ALL_PACKAGES: () => `${API_BASE}`,
	BOOK_PACKAGE: (id) => `${API_BASE}/book/${id}`,
	DELETE_PACKAGE: (id) => `${API_BASE}/${id}`,
	CREATE_PACKAGE: () => `${API_BASE}`,
	SUGGEST_PACKAGE: () => `${API_BASE}/suggestPackages`,

	// User API
	USER_BOOKING: (id) => `${USER_BASE}/bookings/${id}`,

	// Auth API
	LOGIN: `${AUTH}/login`,
	SIGNUP: `${AUTH}/signup`,
	PROFILE: `${AUTH}/profile`,
};

export default endpoints;
