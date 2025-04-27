import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Welcome to ISIMM Academy</h1>
          <p>
            Higher Institute of Computer Science and Mathematics of Monastir
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="university-info">
        <div className="container">
          <div className="university-grid">
            <div className="university-content">
              <h2>About ISIMM Academy</h2>
              <p>
                Welcome to the official e-learning platform of the Higher
                Institute of Computer Science and Mathematics of Monastir. Our
                platform provides students with access to course materials,
                assignments, and academic resources to support your studies at
                ISIMM.
              </p>
              <p>
                This platform is designed to complement your in-person courses
                and provide a centralized location for all your academic needs
                during your time at our institution.
              </p>

              {isAuthenticated ? (
                <div className="enrolled-preview">
                  <h3>Your Learning Journey</h3>
                  <p>Continue where you left off in your enrolled courses.</p>
                  <Link to="/dashboard" className="btn btn-outline">
                    View My Courses
                  </Link>
                </div>
              ) : (
                <div className="auth-cta">
                  <p>
                    Log in with your university credentials to access your
                    courses.
                  </p>
                </div>
              )}
            </div>

            <div className="university-image">
              <img
                src="/assets/hero.jpg"
                alt="ISIMM Campus"
                className="campus-image"
                onError={(e) => {
                  e.target.src = "/ISIMMAcademy1.png";
                  e.target.alt = "ISIMM Academy";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="academic-programs">
        <div className="container">
          <h2>Academic Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-icon">
                <i className="fas fa-laptop-code" aria-hidden="true"></i>
              </div>
              <h3>Computer Science</h3>
              <p>
                Undergraduate and graduate programs focusing on software
                development, algorithms, and computational theory.
              </p>
            </div>

            <div className="program-card">
              <div className="program-icon">
                <i className="fas fa-chart-network" aria-hidden="true"></i>
              </div>
              <h3>Information Systems</h3>
              <p>
                Programs designed to develop expertise in database management,
                system analysis, and IT infrastructure.
              </p>
            </div>

            <div className="program-card">
              <div className="program-icon">
                <i className="fas fa-square-root-alt" aria-hidden="true"></i>
              </div>
              <h3>Applied Mathematics</h3>
              <p>
                Specialized programs in statistical analysis, mathematical
                modeling, and quantitative methods.
              </p>
            </div>
          </div>

          <div className="centered-link">
            <Link to="/courses" className="btn btn-primary">
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="announcements">
        <div className="container">
          <div className="announcement-header">
            <h2>University Announcements</h2>
            <span className="date-badge">April 26, 2025</span>
          </div>
          <div className="announcement-list">
            <div className="announcement-item">
              <div className="announcement-date">April 24</div>
              <div className="announcement-content">
                <h3>Fall 2025 Registration Opens May 15</h3>
                <p>
                  Registration for the Fall 2025 semester will open on May 15th.
                  Please consult with your academic advisor before registering.
                </p>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-date">April 20</div>
              <div className="announcement-content">
                <h3>Library Hours Extended for Finals Week</h3>
                <p>
                  The university library will extend its operating hours during
                  finals week to provide additional study space.
                </p>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-date">April 18</div>
              <div className="announcement-content">
                <h3>New Computer Lab Now Open</h3>
                <p>
                  The new state-of-the-art computer lab in Building C is now
                  open for student use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
