import axiosClient from "../axiosClient";
import endpoints from "../endPoint";

const login = async (email, password) => {
  try {
    const response = await axiosClient.post(endpoints.LOGIN, { email, password });

    if (response.data.success) {
      const token = response.data.token;
      // Don't set localStorage here - let AuthContext handle it
      // localStorage.setItem("token", token);
      // axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return {
        ...response.data,
        token // Make sure token is included in return
      };
    }

    return response.data;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

const signup = async (username, email, password) => {
  try {
    const response = await axiosClient.post(endpoints.SIGNUP, { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Signup service error:", error);
    throw error;
  }
};
const getProfile = async () => {
  try {
    const response = await axiosClient.get(endpoints.PROFILE);
    return response.data; // This will return {success: true, user, bookings}
  } catch (error) {
    console.error("Get profile service error:", error);
    throw error;
  }
};


const logout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  setUser(null);
};


export default { login, signup, logout, getProfile };