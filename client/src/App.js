import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"; // Import MUI components
import "./App.css";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";
import Chatbot from "./components/Chatbot"; // Import the Chatbot component
import { CircularProgress, Box } from "@mui/material"; // Import CircularProgress

// Pages - Core pages loaded directly
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage"; // Import directly

// Lazy-loaded pages for better performance
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
// const DashboardPage = lazy(() => import("./pages/DashboardPage")); // Comment out lazy import
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));

// Loading component for suspense fallback - Updated with MUI CircularProgress
const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 128px)",
    }}
  >
    {" "}
    {/* Adjust height as needed */}
    <CircularProgress />
    <p style={{ marginLeft: "10px" }}>Loading content...</p>
  </Box>
);

// Define a basic theme (can be customized later)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Example primary color
    },
    secondary: {
      main: "#dc004e", // Example secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap with ThemeProvider */}
      <CssBaseline /> {/* Apply baseline styles */}
      <AuthProvider>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {" "}
            {/* Use Box for layout */}
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
              {" "}
              {/* Use Box for main content area */}
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
            </Box>
            <Footer />
            <Chatbot /> {/* Add the Chatbot component here */}
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
