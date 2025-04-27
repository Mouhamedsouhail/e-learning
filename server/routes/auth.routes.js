const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

// Register, login, and other routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

// SPECIAL: Admin registration route
router.post("/register-admin", async (req, res) => {
  try {
    const adminEmail = "admin@admin.com";
    const adminPassword = "admin123";

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      // Delete existing admin to create fresh one
      await User.deleteOne({ email: adminEmail });
    }

    // Create new admin with properly hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    admin = new User({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword, // Pre-hashed password
      role: "admin",
    });

    await admin.save({ validateBeforeSave: false });

    // Create JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(201).json({
      success: true,
      message:
        "Admin created successfully. Use email: admin@admin.com and password: admin123 to login",
      token,
      user: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating admin user",
      error: error.message,
    });
  }
});

module.exports = router;
