const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a quiz title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a quiz description"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    timeLimit: {
      type: Number, // in minutes
      default: 30,
    },
    passingScore: {
      type: Number,
      default: 70, // percentage
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        questionType: {
          type: String,
          enum: ["multiple-choice", "true-false", "short-answer"],
          default: "multiple-choice",
        },
        options: [String],
        correctAnswer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        points: {
          type: Number,
          default: 1,
        },
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
