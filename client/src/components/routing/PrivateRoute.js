import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PrivateRoute component that handles authentication and role-based access control
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {Array} props.allowedRoles - Optional array of roles allowed to access this route
 * @returns {React.ReactNode} - Protected route content or redirect
 */
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, currentUser } = useAuth();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="loading" role="status" aria-live="polite">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Verifying access...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  // If allowedRoles is empty, no specific role restrictions
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user has an allowed role
  const hasAllowedRole = allowedRoles.includes(currentUser?.role);

  // Redirect to dashboard if authenticated but not authorized
  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  // User is authenticated and authorized
  return children;
};

export default PrivateRoute;
