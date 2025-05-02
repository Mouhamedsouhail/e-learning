const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private/Admin
exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate({
        path: "course",
        select: "title description",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate({
        path: "course",
        select: "title description",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment not found with id of ${req.params.id}`,
      });
    }

    // Make sure logged in user is enrollment owner or admin
    if (
      enrollment.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to view this enrollment`,
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get enrollments for specific user
// @route   GET /api/enrollments/user/:userId
// @access  Private
exports.getUserEnrollments = async (req, res) => {
  try {
    // Make sure logged in user is enrollment owner or admin
    if (req.params.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to view these enrollments`,
      });
    }

    const enrollments = await Enrollment.find({
      user: req.params.userId,
    }).populate({
      path: "course",
      select: "title description image",
    });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Create enrollment
// @route   POST /api/enrollments
// @access  Private
exports.createEnrollment = async (req, res) => {
  try {
    // Add user id to req.body
    req.body.user = req.user.id;

    // Check if course exists
    const course = await Course.findById(req.body.course);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course with the id of ${req.body.course}`,
      });
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.body.course,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create(req.body);

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private
exports.updateEnrollment = async (req, res) => {
  try {
    let enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment not found with id of ${req.params.id}`,
      });
    }

    // Make sure logged in user is enrollment owner or admin
    if (
      enrollment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this enrollment`,
      });
    }

    // Cannot change user or course once enrolled
    if (req.body.user || req.body.course) {
      return res.status(400).json({
        success: false,
        message: "Cannot change user or course",
      });
    }

    enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment not found with id of ${req.params.id}`,
      });
    }

    // Make sure logged in user is enrollment owner or admin
    if (
      enrollment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this enrollment`,
      });
    }

    await enrollment.remove();

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
