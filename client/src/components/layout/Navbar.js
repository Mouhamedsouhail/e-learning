import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to="/">ISIMM Academy</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {currentUser && currentUser.role === "admin" && (
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="auth-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="auth-btn">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="auth-btn">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
