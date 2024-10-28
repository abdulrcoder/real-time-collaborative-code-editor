import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Register new user
  const register = async (name, email, password, profilePic) => {
    setLoading(true);
    setError(""); // Reset error state
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) {
        formData.append("profileImage", profilePic);
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { token, user } = response.data;
      sessionStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(""); // Reset error state
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      setError(error.response?.data?.message || "Login failed");
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Logout user
  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  // Get user data with token
  const getUserData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message);
      setError(error.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // Load user data on mount if token is available
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
