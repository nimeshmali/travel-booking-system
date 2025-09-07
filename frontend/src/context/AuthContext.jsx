// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check token on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 > Date.now()) {
              setUser({
                id: decoded.id,
                role: decoded.role,
                email: decoded.email // Add other properties as needed
              });
              axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
              localStorage.removeItem("token");
              delete axiosClient.defaults.headers.common["Authorization"];
            }
          } catch (decodeError) {
            localStorage.removeItem("token");
            delete axiosClient.defaults.headers.common["Authorization"];
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth logout events from axiosClient
  useEffect(() => {
    const handleAuthLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth-logout', handleAuthLogout);
    return () => window.removeEventListener('auth-logout', handleAuthLogout);
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        role: decoded.role,
        email: decoded.email
      });
      localStorage.setItem("token", token);
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axiosClient.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


