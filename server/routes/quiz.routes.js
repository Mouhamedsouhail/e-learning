const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");

// Note: These controller functions need to be implemented
const {
  getQuizzes,
  getQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quiz.controller");

// Quiz routes
router
  .route("/")
  .get(getQuizzes)
  .post(protect, authorize("instructor", "admin"), addQuiz);

router
  .route("/:id")
  .get(getQuiz)
  .put(protect, authorize("instructor", "admin"), updateQuiz)
  .delete(protect, authorize("instructor", "admin"), deleteQuiz);

// Submit quiz answers
router.route("/:id/submit").post(protect, authorize("student"), submitQuiz);

module.exports = router;
