import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    avatar: currentUser?.avatar || "",
    department: currentUser?.department || "",
    title: currentUser?.title || "",
    expertise: currentUser?.expertise || "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Determine if user is an instructor/professor
  const isInstructor =
    currentUser?.role === "instructor" || currentUser?.role === "admin";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await updateProfile(currentUser._id, formData);
      setMessage({ text: "Profile updated successfully", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to update profile",
        type: "error",
      });
      console.error("Profile update error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <h1>My Profile</h1>
          <p className="role-badge" aria-label={`Role: ${currentUser?.role}`}>
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
              currentUser?.role?.slice(1)}
          </p>
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div
            className={`alert alert-${
              message.type === "success" ? "success" : "danger"
            }`}
            role="alert"
            aria-live="assertive"
          >
            {message.text}
          </div>
        )}

        <div className="profile-content">
          {/* Profile Avatar & Info Panel */}
          <div className="profile-sidebar">
            <div className="avatar-container">
              <div className="avatar-wrapper">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile avatar"
                    className="profile-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                className="change-avatar-btn"
                type="button"
                aria-label="Change profile picture"
              >
                <i className="fas fa-camera" aria-hidden="true"></i>
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{isInstructor ? 2 : 5}</span>
                <span className="stat-label">
                  {isInstructor ? "Courses Created" : "Enrolled Courses"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{isInstructor ? 42 : 3}</span>
                <span className="stat-label">
                  {isInstructor ? "Students" : "Certificates"}
                </span>
              </div>
            </div>

            <div className="join-date">
              <p>Member since: January 2023</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="profile-form-container">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="form-control"
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text">
                    Email cannot be changed
                  </small>
                </div>

                {/* Instructor-specific fields */}
                {isInstructor && (
                  <>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Professor, Assistant Professor, Dr."
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Computer Science, Mathematics"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label htmlFor="expertise">Areas of Expertise</label>
                      <input
                        type="text"
                        id="expertise"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Machine Learning, Database Systems, Software Engineering"
                      />
                      <small className="form-text">
                        Separate multiple areas with commas
                      </small>
                    </div>
                  </>
                )}

                {/* Student-specific fields */}
                {!isInstructor && (
                  <div className="form-group">
                    <label htmlFor="studentId">Student ID</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={
                        formData.studentId ||
                        "STU-" + (Math.floor(Math.random() * 90000) + 10000)
                      }
                      onChange={handleChange}
                      className="form-control"
                      disabled
                    />
                  </div>
                )}

                {/* Common fields */}
                <div className="form-group form-group-full">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                    placeholder="Tell us about yourself..."
                    aria-describedby="bioHelp"
                  ></textarea>
                  <small id="bioHelp" className="form-text">
                    This information may be visible to others on the platform
                  </small>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setFormData({
                      name: currentUser?.name || "",
                      email: currentUser?.email || "",
                      bio: currentUser?.bio || "",
                      avatar: currentUser?.avatar || "",
                      department: currentUser?.department || "",
                      title: currentUser?.title || "",
                      expertise: currentUser?.expertise || "",
                    })
                  }
                  disabled={loading}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2">Updating...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="profile-section password-section">
          <h2>Change Password</h2>
          <form className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="form-control"
                placeholder="Enter current password"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                placeholder="Enter new password"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                required
                aria-required="true"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="profile-section danger-section">
          <h2>Account Management</h2>
          <div className="danger-zone">
            <div className="danger-info">
              <h3>Delete Account</h3>
              <p>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <button type="button" className="btn btn-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
