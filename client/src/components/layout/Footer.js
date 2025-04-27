import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="logo-container">
              <img
                src="/ISIM-logo.jpg"
                alt="ISIMM Academy Logo"
                className="footer-logo"
              />
              <h3>ISIMM Academy</h3>
            </div>
            <p>
              Higher Institute of Computer Science and Mathematics of Monastir
            </p>
            <div className="contact">
              <span>
                <i className="fas fa-map-marker-alt"></i> Avenue de la Corniche,
                Monastir 5000, Tunisia
              </span>
              <span>
                <i className="fas fa-envelope"></i> isimm@gmail.com
              </span>
              <span>
                <i className="fas fa-phone"></i> +216 99 999 999
              </span>
            </div>
            <div className="socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <i className="fas fa-angle-right"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/courses">
                  <i className="fas fa-angle-right"></i> Courses
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="fas fa-angle-right"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="fas fa-angle-right"></i> My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section resources">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <Link to="/courses">
                  <i className="fas fa-angle-right"></i> Course Catalog
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fas fa-angle-right"></i> Academic Calendar
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fas fa-angle-right"></i> Student Handbook
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fas fa-angle-right"></i> University Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} ISIMM Academy - All Rights
            Reserved
          </p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
