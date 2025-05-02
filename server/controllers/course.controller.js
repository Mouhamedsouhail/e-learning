const Course = require("../models/course.model");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = Course.find(JSON.parse(queryStr)).populate({
      path: "instructor",
      select: "name avatar",
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Course.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const courses = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      pagination,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: "instructor",
        select: "name avatar bio",
      })
      .populate("lessons")
      .populate("quizzes");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructors, Admin)
exports.createCourse = async (req, res) => {
  try {
    // Add user to req.body as instructor
    req.body.instructor = req.user.id;

    // Check if user is instructor or admin
    const user = await User.findById(req.user.id);

    if (user.role !== "instructor" && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only instructors and admins can create courses",
      });
    }

    // Handle file upload
    if (req.files && req.files.thumbnail) {
      const file = req.files.thumbnail;

      // Make sure the image is a photo
      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image file",
        });
      }

      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return res.status(400).json({
          success: false,
          message: `Please upload an image less than ${
            process.env.MAX_FILE_UPLOAD / 1000000
          }MB`,
        });
      }

      // Create custom filename
      file.name = `photo_${req.user.id}_${Date.now()}${
        path.parse(file.name).ext
      }`;

      // Move file to upload path
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/courses/${file.name}`,
        async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: "Problem with file upload",
            });
          }

          req.body.thumbnail = `courses/${file.name}`;

          // Create course
          const course = await Course.create(req.body);

          // Add course to user's createdCourses
          await User.findByIdAndUpdate(req.user.id, {
            $push: { createdCourses: course._id },
          });

          res.status(201).json({
            success: true,
            data: course,
          });
        }
      );
    } else {
      // Create course without thumbnail
      const course = await Course.create(req.body);

      // Add course to user's createdCourses
      await User.findByIdAndUpdate(req.user.id, {
        $push: { createdCourses: course._id },
      });

      res.status(201).json({
        success: true,
        data: course,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Course Owner, Admin)
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Make sure user is course owner or admin
    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this course",
      });
    }

    // Handle file upload
    if (req.files && req.files.thumbnail) {
      const file = req.files.thumbnail;

      // Make sure the image is a photo
      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image file",
        });
      }

      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return res.status(400).json({
          success: false,
          message: `Please upload an image less than ${
            process.env.MAX_FILE_UPLOAD / 1000000
          }MB`,
        });
      }

      // Create custom filename
      file.name = `photo_${req.user.id}_${Date.now()}${
        path.parse(file.name).ext
      }`;

      // Move file to upload path
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/courses/${file.name}`,
        async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: "Problem with file upload",
            });
          }

          // Delete old thumbnail if it exists
          if (course.thumbnail && course.thumbnail !== "default-course.jpg") {
            fs.unlink(
              `${process.env.FILE_UPLOAD_PATH}/${course.thumbnail}`,
              (err) => {
                if (err) console.error(err);
              }
            );
          }

          req.body.thumbnail = `courses/${file.name}`;

          // Update course
          course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });

          res.status(200).json({
            success: true,
            data: course,
          });
        }
      );
    } else {
      // Update course without thumbnail
      course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: course,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Course Owner, Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Make sure user is course owner or admin
    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this course",
      });
    }

    // Delete course thumbnail if it exists
    if (course.thumbnail && course.thumbnail !== "default-course.jpg") {
      fs.unlink(
        `${process.env.FILE_UPLOAD_PATH}/${course.thumbnail}`,
        (err) => {
          if (err) console.error(err);
        }
      );
    }

    await course.remove();

    // Remove course from user's createdCourses
    await User.findByIdAndUpdate(course.instructor, {
      $pull: { createdCourses: course._id },
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
