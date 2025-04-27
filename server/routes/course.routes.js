const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Course routes
router
  .route("/")
  .get(getCourses)
  .post(protect, authorize("instructor", "admin"), createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
