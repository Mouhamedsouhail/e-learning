import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Displayed when a user attempts to access a route they don't have permission for
 */
const UnauthorizedPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="unauthorized-page">
      <div className="container">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-lock" aria-hidden="true"></i>
          </div>
          <h1>Access Restricted</h1>
          <p>
            You don't have permission to access this page. This area is
            restricted to users with specific roles or permissions.
          </p>
          <p className="user-info">
            You are logged in as: <strong>{currentUser?.name}</strong>
            <span className="role-badge small">
              {currentUser?.role === "student" && (
                <i className="fas fa-user-graduate" aria-hidden="true"></i>
              )}
              {currentUser?.role === "instructor" && (
                <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
              )}
              {currentUser?.role === "admin" && (
                <i className="fas fa-user-shield" aria-hidden="true"></i>
              )}
              {currentUser?.role?.charAt(0).toUpperCase() +
                currentUser?.role?.slice(1) || "Student"}
            </span>
          </p>
          <div className="action-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/" className="btn btn-secondary">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
