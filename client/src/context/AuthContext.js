import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/api";

// Create the authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token on initial render
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getProfile();
        setCurrentUser(response.data.data);
        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        localStorage.removeItem("token");
        setError(err.response?.data?.message || "Error fetching user profile");
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(email);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error processing request");
      setLoading(false);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (resetToken, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword(resetToken, password);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
      setLoading(false);
      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (id, userData) => {
    setLoading(true);
    setError(null);

    try {
      // Assuming userService.updateUser is available
      const response = await authService.updateUser(id, userData);
      setCurrentUser(response.data.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      setLoading(false);
      throw err;
    }
  };

  // Return the context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
