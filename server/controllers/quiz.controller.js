const Quiz = require("../models/quiz.model");
const Course = require("../models/course.model");

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate({
      path: "course",
      select: "title",
    });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "course",
      select: "title",
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: `Quiz not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private/Instructor/Admin
exports.addQuiz = async (req, res) => {
  try {
    // Add user to req.body as creator
    req.body.user = req.user.id;

    // Check if course exists
    const course = await Course.findById(req.body.course);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course with the id of ${req.body.course}`,
      });
    }

    // Check if user is course owner or admin
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to add a quiz to this course`,
      });
    }

    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Instructor/Admin
exports.updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: `Quiz not found with id of ${req.params.id}`,
      });
    }

    // Check if user is quiz owner or admin
    const course = await Course.findById(quiz.course);

    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this quiz`,
      });
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Instructor/Admin
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: `Quiz not found with id of ${req.params.id}`,
      });
    }

    // Check if user is quiz owner or admin
    const course = await Course.findById(quiz.course);

    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this quiz`,
      });
    }

    await quiz.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private/Student
exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: `Quiz not found with id of ${req.params.id}`,
      });
    }

    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of answers",
      });
    }

    // Calculate score
    let score = 0;
    const results = [];

    quiz.questions.forEach((question, i) => {
      const userAnswer = answers[i];
      const isCorrect = question.correctAnswer === userAnswer;

      if (isCorrect) {
        score += 1;
      }

      results.push({
        question: question.text,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    });

    const finalScore = (score / quiz.questions.length) * 100;

    res.status(200).json({
      success: true,
      data: {
        score: finalScore.toFixed(2),
        results,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
