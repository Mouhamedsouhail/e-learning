import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default role is student
  });
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "Full name is required";
        } else if (value.length < 3) {
          error = "Name must be at least 3 characters";
        }
        break;
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
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains lowercase letter
    if (/[a-z]/.test(password)) strength += 1;
    // Contains uppercase letter
    if (/[A-Z]/.test(password)) strength += 1;
    // Contains number
    if (/[0-9]/.test(password)) strength += 1;
    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    return "Strong";
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 1) return "weak";
    if (passwordStrength <= 3) return "moderate";
    return "strong";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }

    // Update confirmPassword validation when password changes
    if (name === "password" && formData.confirmPassword) {
      const confirmError =
        value !== formData.confirmPassword ? "Passwords do not match" : "";
      setFieldErrors({
        ...fieldErrors,
        confirmPassword: confirmError,
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

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      if (field === "role") return; // Skip role validation

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

    try {
      setIsSubmitting(true);
      const { name, email, password, role } = formData;
      await register({ name, email, password, role });

      // Navigate to login page and show success message after registration
      navigate("/login", { state: { fromRegister: true } });
    } catch (err) {
      console.error("Registration error:", err);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-header">
          <img src="/ISIM-logo.jpg" alt="ISIMM Academy" className="auth-logo" />
          <h2>Create your account</h2>
          <p className="auth-subtitle">Join the ISIMM Academic Community</p>
        </div>

        {formError && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle"></i> {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${fieldErrors.name ? "has-error" : ""}`}>
            <label htmlFor="name">
              Full Name
              <span className="required-star">*</span>
            </label>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                required
                autoFocus
                aria-invalid={fieldErrors.name ? "true" : "false"}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
            </div>
            {fieldErrors.name && (
              <span id="name-error" className="error-message">
                {fieldErrors.name}
              </span>
            )}
          </div>

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
            <label htmlFor="password">
              Password
              <span className="required-star">*</span>
            </label>
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
                placeholder="Create a password (min. 6 characters)"
                required
                minLength="6"
                aria-invalid={fieldErrors.password ? "true" : "false"}
                aria-describedby={
                  fieldErrors.password ? "password-error" : undefined
                }
              />
            </div>
            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-meter-fill ${getPasswordStrengthClass()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`strength-text ${getPasswordStrengthClass()}`}>
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            )}
            {fieldErrors.password && (
              <span id="password-error" className="error-message">
                {fieldErrors.password}
              </span>
            )}
          </div>

          <div
            className={`form-group ${
              fieldErrors.confirmPassword ? "has-error" : ""
            }`}
          >
            <label htmlFor="confirmPassword">
              Confirm Password
              <span className="required-star">*</span>
            </label>
            <div className="input-group">
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                required
                aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  fieldErrors.confirmPassword
                    ? "confirmPassword-error"
                    : undefined
                }
              />
            </div>
            {fieldErrors.confirmPassword && (
              <span id="confirmPassword-error" className="error-message">
                {fieldErrors.confirmPassword}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <div
              className="role-selector"
              style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
            >
              <div
                className={`role-option${
                  formData.role === "student" ? " selected" : ""
                }`}
                onClick={() => setFormData({ ...formData, role: "student" })}
                style={{
                  border:
                    formData.role === "student"
                      ? "2px solid #007bff"
                      : "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: formData.role === "student" ? "#e6f0ff" : "#fff",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "120px",
                  justifyContent: "center",
                }}
                tabIndex={0}
                role="button"
                aria-pressed={formData.role === "student"}
              >
                <i
                  className="fas fa-user-graduate"
                  style={{ marginRight: "8px" }}
                ></i>
                <span>Student</span>
              </div>
              <div
                className={`role-option${
                  formData.role === "instructor" ? " selected" : ""
                }`}
                onClick={() => setFormData({ ...formData, role: "instructor" })}
                style={{
                  border:
                    formData.role === "instructor"
                      ? "2px solid #007bff"
                      : "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  background:
                    formData.role === "instructor" ? "#e6f0ff" : "#fff",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "120px",
                  justifyContent: "center",
                }}
                tabIndex={0}
                role="button"
                aria-pressed={formData.role === "instructor"}
              >
                <i
                  className="fas fa-chalkboard-teacher"
                  style={{ marginRight: "8px" }}
                ></i>
                <span>Instructor</span>
              </div>
            </div>
          </div>

          <div className="form-group terms">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>I agree to the{" "}
              <Link to="/">Terms of Service</Link> and{" "}
              <Link to="/">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="auth-btn submit-btn btn btn-primary w-100"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#28a745",
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
                <span className="visually-hidden">Signing up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-links">
          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="link-btn">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
