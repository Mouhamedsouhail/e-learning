const Lesson = require("../models/lesson.model");
const Course = require("../models/course.model");

// @desc    Get all lessons or lessons for a specific course
// @route   GET /api/lessons or /api/lessons/course/:courseId
// @access  Public
exports.getLessons = async (req, res) => {
  try {
    let query;

    if (req.params.courseId) {
      query = Lesson.find({ course: req.params.courseId }).sort("order");
    } else {
      query = Lesson.find().populate("course", "title");
    }

    const lessons = await query;

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single lesson
// @route   GET /api/lessons/:id
// @access  Public
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate(
      "course",
      "title"
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Add lesson
// @route   POST /api/lessons
// @access  Private/Instructor/Admin
exports.addLesson = async (req, res) => {
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
        message: `User ${req.user.id} is not authorized to add a lesson to this course`,
      });
    }

    const lesson = await Lesson.create(req.body);

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private/Instructor/Admin
exports.updateLesson = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson not found with id of ${req.params.id}`,
      });
    }

    // Check if user is lesson owner or admin
    const course = await Course.findById(lesson.course);

    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this lesson`,
      });
    }

    lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Instructor/Admin
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson not found with id of ${req.params.id}`,
      });
    }

    // Check if user is lesson owner or admin
    const course = await Course.findById(lesson.course);

    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this lesson`,
      });
    }

    await lesson.remove();

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
