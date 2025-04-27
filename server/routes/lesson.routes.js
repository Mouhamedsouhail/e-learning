const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");

// Note: These controller functions need to be implemented
const {
  getLessons,
  getLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson.controller");

// Lesson routes
router
  .route("/")
  .get(getLessons)
  .post(protect, authorize("instructor", "admin"), addLesson);

router
  .route("/:id")
  .get(getLesson)
  .put(protect, authorize("instructor", "admin"), updateLesson)
  .delete(protect, authorize("instructor", "admin"), deleteLesson);

// Course-specific lessons
router.route("/course/:courseId").get(getLessons);

module.exports = router;
