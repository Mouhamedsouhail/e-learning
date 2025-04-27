const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title"],
      trim: true,
      maxlength: [100, "Course title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a course description"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a course category"],
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "DevOps",
        "Business",
        "Design",
        "Marketing",
        "Other",
      ],
    },
    level: {
      type: String,
      required: [true, "Please add course level"],
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    thumbnail: {
      type: String,
      default: "default-course.jpg",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      required: [true, "Please add course duration in minutes"],
    },
    price: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not be more than 5"],
      default: 4,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
