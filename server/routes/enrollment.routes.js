const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");

// Note: These controller functions need to be implemented
const {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getUserEnrollments,
} = require("../controllers/enrollment.controller");

// Enrollment routes
router
  .route("/")
  .get(protect, authorize("admin"), getEnrollments)
  .post(protect, createEnrollment);

router
  .route("/:id")
  .get(protect, getEnrollment)
  .put(protect, updateEnrollment)
  .delete(protect, deleteEnrollment);

// Get user's enrollments
router.route("/user/:userId").get(protect, getUserEnrollments);

module.exports = router;
