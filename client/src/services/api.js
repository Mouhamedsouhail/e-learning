import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Register a new user
  register: (userData) => {
    return api.post("/auth/register", userData);
  },

  // Login user
  login: (credentials) => {
    return api.post("/auth/login", credentials);
  },

  // Get current user profile
  getProfile: () => {
    return api.get("/auth/me");
  },

  // Update user profile
  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  // Forgot password
  forgotPassword: (email) => {
    return api.post("/auth/forgotpassword", { email });
  },

  // Reset password
  resetPassword: (resetToken, password) => {
    return api.put(`/auth/resetpassword/${resetToken}`, { password });
  },
};

// Course services
export const courseService = {
  // Get all courses
  getAllCourses: () => {
    return api.get("/courses");
  },

  // Get single course by ID
  getCourseById: (id) => {
    return api.get(`/courses/${id}`);
  },

  // Get courses by category
  getCoursesByCategory: (category) => {
    return api.get(`/courses/category/${category}`);
  },

  // Get enrolled courses for current user
  getEnrolledCourses: () => {
    return api.get("/enrollments/me");
  },
};

// Enrollment services
export const enrollmentService = {
  // Enroll in a course
  enrollInCourse: (courseId) => {
    return api.post(`/enrollments/${courseId}`);
  },

  // Get enrollment progress
  getProgress: (enrollmentId) => {
    return api.get(`/enrollments/${enrollmentId}/progress`);
  },

  // Update lesson completion status
  updateLessonStatus: (enrollmentId, lessonId, completed) => {
    return api.put(`/enrollments/${enrollmentId}/lessons/${lessonId}`, {
      completed,
    });
  },
};

// Lesson services
export const lessonService = {
  // Get lessons for a course
  getLessons: (courseId) => {
    return api.get(`/courses/${courseId}/lessons`);
  },

  // Get a specific lesson
  getLessonById: (courseId, lessonId) => {
    return api.get(`/courses/${courseId}/lessons/${lessonId}`);
  },
};

// Quiz services
export const quizService = {
  // Get quiz for a lesson
  getQuiz: (lessonId) => {
    return api.get(`/lessons/${lessonId}/quiz`);
  },

  // Submit quiz answers
  submitQuiz: (lessonId, answers) => {
    return api.post(`/lessons/${lessonId}/quiz/submit`, { answers });
  },
};

export default api;
