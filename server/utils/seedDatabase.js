const mongoose = require("mongoose");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs"); // Not needed, rely on Mongoose pre-save hook

// Load environment variables
dotenv.config();

// Export the seeding logic as a function
const seedDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-learning-platform";
    // Ensure connection exists before seeding, or connect here if needed
    // For simplicity, assuming connection is handled by server.js
    // If you need this script to be standalone, you might need mongoose.connect here
    // await mongoose.connect(mongoUri);

    console.log("Starting database seed...");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});

    // Define raw passwords; Mongoose pre-save hook will hash them
    const adminPasswordRaw = "123456*";
    const standardPasswordRaw = "password123";

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "souhailbouchnak1234@gmail.com",
      password: adminPasswordRaw,
      role: "admin",
    });

    // Create instructor user
    const instructorUser = await User.create({
      name: "Instructor User",
      email: "instructor@example.com",
      password: standardPasswordRaw,
      role: "instructor",
    });

    // Create student user
    const studentUser = await User.create({
      name: "Student User",
      email: "student@example.com",
      password: standardPasswordRaw,
      role: "student",
    });

    // Create sample courses
    const webDevCourse = await Course.create({
      title: "Web Development Fundamentals",
      description:
        "Learn the basics of web development including HTML, CSS, and JavaScript.",
      category: "Web Development",
      instructor: instructorUser._id,
      price: 49.99,
      image: "https://via.placeholder.com/640x360?text=Web+Development",
      level: "Beginner",
      duration: 2400, // 8 weeks * 5 hours/week * 60 minutes/hour = 2400 minutes
      requirements: ["Basic computer skills", "Enthusiasm to learn"],
      whatYouWillLearn: [
        "HTML5 structure and semantics",
        "CSS3 styling and layouts",
        "JavaScript basics",
        "Building responsive websites",
      ],
    });

    // Create sample lessons for the web dev course
    const webDevLessons = [
      {
        title: "Introduction to HTML",
        course: webDevCourse._id,
        description: "Overview of HTML and its role in web development.",
        content: "In this lesson, we will cover the basics of HTML...",
        videoUrl: "https://example.com/videos/intro-to-html",
        duration: 45,
        order: 1,
      },
      {
        title: "CSS Fundamentals",
        course: webDevCourse._id,
        description: "Learn the fundamentals of CSS for styling web pages.",
        content: "Learn how to style your HTML with CSS...",
        videoUrl: "https://example.com/videos/css-fundamentals",
        duration: 55,
        order: 2,
      },
      {
        title: "JavaScript Basics",
        course: webDevCourse._id,
        description: "Introduction to JavaScript programming concepts.",
        content: "Introduction to JavaScript programming...",
        videoUrl: "https://example.com/videos/js-basics",
        duration: 60,
        order: 3,
      },
    ];

    await Lesson.insertMany(webDevLessons);

    // Create another course
    const pythonCourse = await Course.create({
      title: "Python for Beginners",
      description:
        "Learn Python programming from scratch with practical examples.",
      category: "Data Science", // Changed from 'Programming' to a valid category
      instructor: instructorUser._id,
      price: 39.99,
      image: "https://via.placeholder.com/640x360?text=Python+Programming",
      level: "Beginner",
      duration: 1800, // 6 weeks * 5 hours/week * 60 minutes/hour = 1800 minutes
      requirements: ["No prior programming experience required"],
      whatYouWillLearn: [
        "Python syntax and data types",
        "Control structures and functions",
        "Working with libraries and packages",
        "Building simple applications",
      ],
    });

    // Create sample lessons for the Python course
    const pythonLessons = [
      {
        title: "Getting Started with Python",
        course: pythonCourse._id,
        description: "Setting up Python and understanding its environment.",
        content: "Installation and setup of Python environment...",
        videoUrl: "https://example.com/videos/python-setup",
        duration: 40,
        order: 1,
      },
      {
        title: "Variables and Data Types",
        course: pythonCourse._id,
        description: "Learn about variables and data types in Python.",
        content: "Understanding Python variables and basic data types...",
        videoUrl: "https://example.com/videos/python-variables",
        duration: 50,
        order: 2,
      },
      {
        title: "Control Flow in Python",
        course: pythonCourse._id,
        description: "Explore conditionals and loops in Python.",
        content: "Working with conditionals and loops...",
        videoUrl: "https://example.com/videos/python-control-flow",
        duration: 55,
        order: 3,
      },
    ];

    await Lesson.insertMany(pythonLessons);

    console.log("Database seeded successfully!");
    // process.exit(0); // Keep commented out
    return { success: true, message: "Database seeded successfully!" }; // Return a success status
  } catch (error) {
    console.error("Error seeding database:", error);
    // process.exit(1); // Keep commented out
    // Throw the error or return a status object so the route handler knows
    throw new Error(`Error seeding database: ${error.message}`);
  }
};

module.exports = seedDB;
