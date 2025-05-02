const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a lesson title"],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a lesson description"],
    },
    content: {
      type: String,
      required: [true, "Please add lesson content"],
    },
    video: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      required: true,
    },
    resources: [
      {
        title: String,
        file: String,
        type: {
          type: String,
          enum: ["pdf", "doc", "video", "image", "other"],
        },
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);
