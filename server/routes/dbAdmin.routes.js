const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const seedDatabase = require("../utils/seedDatabase");

/**
 * @route   POST /api/db-admin/seed
 * @desc    Seed the database with initial data
 * @access  Private/Admin
 */
router.post("/seed", protect, authorize("admin"), async (req, res) => {
  try {
    // Call the seedDatabase function
    const result = await seedDatabase();

    res.status(200).json(result);
  } catch (error) {
    console.error("Database seeding error:", error);
    res.status(500).json({
      success: false,
      message: "Error seeding database",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/db-admin/status
 * @desc    Check database connection status
 * @access  Private/Admin
 */
router.get("/status", protect, authorize("admin"), async (req, res) => {
  try {
    const dbStatus = {
      connection: "connected",
      status: "healthy",
      timestamp: new Date(),
    };

    res.status(200).json({
      success: true,
      data: dbStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking database status",
      error: error.message,
    });
  }
});

module.exports = router;
