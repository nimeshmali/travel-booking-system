import axiosClient from "../axiosClient";
import endpoints from "../endPoint";

const login = async (email, password) => {
	try {
		const response = await axiosClient.post(endpoints.LOGIN, { email, password });

		// Store token and auth status if login successful
		if (response.data.status) {
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("isAuthenticated", "true");
			localStorage.setItem("isAdmin", response.data.admin ? "true" : "false");

			// Set auth header for future requests
			axiosClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
		}

		return response.data;
	} catch (error) {
		throw error;
	}
};

const signup = async (username, email, password) => {
	try {
		const response = await axiosClient.post(endpoints.SIGNUP, {
			username,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

const logout = () => {
	// Clear local storage
	localStorage.removeItem("token");
	localStorage.removeItem("isAuthenticated");
	localStorage.removeItem("isAdmin");

	// Remove auth header
	delete axiosClient.defaults.headers.common["Authorization"];

	return true;
};

export default { login, signup, logout };
