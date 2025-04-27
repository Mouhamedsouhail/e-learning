import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [loading, isAuthenticated]);

  // Redirect path after successful login (default to dashboard)
  const from = location.state?.from || "/dashboard";

  // Check if user just registered successfully
  useEffect(() => {
    if (location.state?.fromRegister) {
      setRegistrationSuccess(true);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFieldErrors({
      ...fieldErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFieldErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Trim email and prepare credentials
      console.log("Attempting login with:", formData);
      const credentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      // If rememberMe is checked, store it in localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", credentials.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      await login(credentials);
      navigate(from);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        // Show invalid credentials inline under password
        setFieldErrors({
          password: err.response.data.message || "Invalid credentials",
        });
      } else {
        setFormError(
          err.response?.data?.message ||
            err.message ||
            "An error occurred. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Check if there's a remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-header">
          <img src="/ISIM-logo.jpg" alt="ISIMM Academy" className="auth-logo" />
          <h2>Sign in to your account</h2>
          <p className="auth-subtitle">Welcome back to ISIMM Academy</p>
        </div>

        {registrationSuccess && (
          <div className="alert alert-success" role="alert">
            <i className="fas fa-check-circle"></i> Registration successful! You
            can now log in.
          </div>
        )}

        {formError && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle"></i> {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${fieldErrors.email ? "has-error" : ""}`}>
            <label htmlFor="email">
              Email Address
              <span className="required-star">*</span>
            </label>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your.email@isimm.edu"
                required
                autoFocus
                aria-invalid={fieldErrors.email ? "true" : "false"}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
            </div>
            {fieldErrors.email && (
              <span id="email-error" className="error-message">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div
            className={`form-group ${fieldErrors.password ? "has-error" : ""}`}
          >
            <div className="password-label-group">
              <label htmlFor="password">
                Password
                <span className="required-star">*</span>
              </label>
              <Link to="/forgotpassword" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                required
                aria-invalid={fieldErrors.password ? "true" : "false"}
                aria-describedby={
                  fieldErrors.password ? "password-error" : undefined
                }
              />
            </div>
            {fieldErrors.password && (
              <span id="password-error" className="error-message">
                {fieldErrors.password}
              </span>
            )}
          </div>

          <div className="form-group remember-me">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-btn submit-btn w-100"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 15px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-links">
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register" className="link-btn">
              Create Account
            </Link>
          </p>

          <div className="divider">
            <span>University of Monastir</span>
          </div>

          <p className="university-info">
            Higher Institute of Computer Science and Mathematics of Monastir
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
