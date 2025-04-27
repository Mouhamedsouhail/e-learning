import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";

// Pages - Core pages loaded directly
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Lazy-loaded pages for better performance
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));

// Loading component for suspense fallback
const LoadingComponent = () => (
  <div className="loading" role="status" aria-live="polite">
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
    <p>Loading content...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<LoadingComponent />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgotpassword"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/resetpassword/:resetToken"
                  element={<ResetPasswordPage />}
                />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Routes accessible to all authenticated users */}
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <CoursesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses/:id"
                  element={
                    <PrivateRoute>
                      <CourseDetailsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />

                {/* Student-specific routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/assignments"
                  element={
                    <PrivateRoute allowedRoles={["student"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/grades"
                  element={
                    <PrivateRoute allowedRoles={["student"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />

                {/* Instructor-specific routes */}
                <Route
                  path="/course-management"
                  element={
                    <PrivateRoute allowedRoles={["instructor", "admin"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/submissions"
                  element={
                    <PrivateRoute allowedRoles={["instructor", "admin"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute allowedRoles={["instructor", "admin"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />

                {/* Admin-specific routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <AdminUsersPage />
                    </PrivateRoute>
                  }
                />

                {/* Not found route - must be last */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
