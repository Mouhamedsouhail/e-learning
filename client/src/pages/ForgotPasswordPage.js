import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await forgotPassword(email);
      setMessage({
        text: "Password reset link sent to your email",
        type: "success",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        text: "Error sending password reset email",
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-page">
      <div className="container">
        <h1>Forgot Password</h1>
        {message.text && (
          <div
            className={`alert alert-${
              message.type === "success" ? "success" : "danger"
            }`}
          >
            {message.text}
          </div>
        )}
        <p>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
        <div className="links">
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
