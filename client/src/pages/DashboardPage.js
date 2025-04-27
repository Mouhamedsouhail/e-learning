import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    totalHoursLearned: 0,
    certificatesEarned: 0,
    currentStreak: 0,
  });
  // Student-specific states
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  // Professor-specific states
  const [courseRosters, setCourseRosters] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const [loading, setLoading] = useState(true);

  // Determine if the user is an instructor/professor
  const isInstructor =
    currentUser?.role === "instructor" || currentUser?.role === "admin";
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    // Simulate API calls with setTimeout
    setTimeout(() => {
      // Common data for all roles
      setEnrolledCourses([
        {
          id: 1,
          title: "Introduction to Web Development",
          progress: 60,
          lastAccessed: "2023-04-20",
          instructor: "Dr. Sarah Johnson",
          image: "/webdev.jpg", // Using actual image from public folder
          nextLesson: "CSS Layouts and Positioning",
        },
        {
          id: 2,
          title: "Advanced React Patterns",
          progress: 25,
          lastAccessed: "2023-04-18",
          instructor: "Michael Chen",
          image: "/datascience.jpg", // Using actual image
          nextLesson: "Compound Components",
        },
        {
          id: 3,
          title: "Data Science Fundamentals",
          progress: 75,
          lastAccessed: "2023-04-22",
          instructor: "Prof. Emily Rodriguez",
          image: "/database.jpg", // Using actual image
          nextLesson: "Statistical Analysis Methods",
        },
      ]);

      setActivities([
        {
          id: 1,
          type: "lesson_completed",
          course: "Introduction to Web Development",
          detail: "Completed lesson: HTML Fundamentals",
          date: "2023-04-20",
        },
        {
          id: 2,
          type: "quiz_passed",
          course: "Advanced React Patterns",
          detail: "Passed quiz with score: 85%",
          date: "2023-04-18",
        },
        {
          id: 3,
          type: "course_started",
          course: "Data Science Fundamentals",
          detail: "Started new course",
          date: "2023-04-16",
        },
      ]);

      setStats({
        coursesCompleted: 3,
        totalHoursLearned: 27,
        certificatesEarned: 2,
        currentStreak: 5,
      });

      // Student-specific data
      if (!isInstructor) {
        setAssignments([
          {
            id: 1,
            title: "Database Schema Design",
            course: "Database Management",
            dueDate: "2023-05-02",
            status: "pending",
          },
          {
            id: 2,
            title: "JavaScript Functions Lab",
            course: "Introduction to Web Development",
            dueDate: "2023-04-29",
            status: "pending",
          },
          {
            id: 3,
            title: "React Hooks Implementation",
            course: "Advanced React Patterns",
            dueDate: "2023-04-27",
            status: "submitted",
          },
        ]);

        setGrades([
          {
            id: 1,
            assignment: "HTML Basics Quiz",
            course: "Introduction to Web Development",
            grade: "92%",
            feedback: "Excellent understanding of HTML structure!",
          },
          {
            id: 2,
            assignment: "CSS Grid Layout",
            course: "Introduction to Web Development",
            grade: "85%",
            feedback:
              "Good work on layouts. Review responsive design concepts.",
          },
        ]);

        setUpcomingClasses([
          {
            id: 1,
            course: "Data Science Fundamentals",
            time: "10:00 AM - 11:30 AM",
            date: "2023-04-28",
            topic: "Statistical Analysis Methods",
          },
          {
            id: 2,
            course: "Advanced React Patterns",
            time: "2:00 PM - 3:30 PM",
            date: "2023-04-27",
            topic: "Custom Hooks and Context API",
          },
        ]);
      }
      // Professor-specific data
      else {
        setCourseRosters([
          {
            id: 1,
            course: "Introduction to Web Development",
            students: 42,
            averageProgress: 65,
          },
          {
            id: 2,
            course: "Data Structures and Algorithms",
            students: 38,
            averageProgress: 72,
          },
        ]);

        setSubmissions([
          {
            id: 1,
            assignment: "HTML & CSS Project",
            course: "Introduction to Web Development",
            submitted: 35,
            pending: 7,
          },
          {
            id: 2,
            assignment: "Array Implementation Quiz",
            course: "Data Structures and Algorithms",
            submitted: 36,
            pending: 2,
          },
        ]);

        setAnalytics({
          totalStudents: 143,
          averageCourseCompletion: 68,
          mostActiveTime: "Tuesdays, 4PM - 7PM",
          topPerformingCourse: "Data Structures and Algorithms",
        });
      }

      setLoading(false);
    }, 1000);
  }, [isInstructor]);

  if (loading) {
    return (
      <div className="loading" role="status" aria-live="polite">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // Dedicated admin dashboard
  if (isAdmin) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-welcome-banner">
            <div className="welcome-text">
              <h1>Welcome, {currentUser?.name || "Admin"}!</h1>
              <p>
                You are logged in as <b>Admin</b>.
              </p>
              <p>
                Use the navigation to manage users, seed the database, and
                access admin features.
              </p>
            </div>
            <div className="welcome-illustration">
              <img
                src="/ISIMMAcademy.png"
                alt="ISIMM Academy Logo"
                className="dashboard-illustration"
              />
            </div>
          </div>
          <div className="dashboard-section">
            <h2>Admin Quick Links</h2>
            <ul>
              <li>
                <Link to="/admin/users">User Management</Link>
              </li>
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Welcome Banner */}
        <div className="dashboard-welcome-banner">
          <div className="welcome-text">
            <h1>Welcome back, {currentUser?.name || "Student"}!</h1>
            <p>
              {isInstructor
                ? "Manage your courses and track student progress"
                : "Track your progress and continue learning"}
            </p>
            {!isInstructor && stats.currentStreak > 0 && (
              <div className="streak-badge">
                <i className="fas fa-fire" aria-hidden="true"></i>{" "}
                {stats.currentStreak} day streak
              </div>
            )}
          </div>
          <div className="welcome-illustration">
            <img
              src="/ISIMMAcademy.png"
              alt="ISIMM Academy Logo"
              className="dashboard-illustration"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="dashboard-stats">
          {isInstructor ? (
            // Professor Stats
            <>
              <div className="stat-card">
                <i className="fas fa-users stat-icon" aria-hidden="true"></i>
                <h3>{analytics.totalStudents || 0}</h3>
                <p>Total Students</p>
              </div>
              <div className="stat-card">
                <i
                  className="fas fa-graduation-cap stat-icon"
                  aria-hidden="true"
                ></i>
                <h3>{courseRosters.length || 0}</h3>
                <p>Active Courses</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-tasks stat-icon" aria-hidden="true"></i>
                <h3>
                  {submissions.reduce((acc, sub) => acc + sub.pending, 0) || 0}
                </h3>
                <p>Pending Reviews</p>
              </div>
              <div className="stat-card">
                <i
                  className="fas fa-chart-line stat-icon"
                  aria-hidden="true"
                ></i>
                <h3>{analytics.averageCourseCompletion || 0}%</h3>
                <p>Avg. Completion</p>
              </div>
            </>
          ) : (
            // Student Stats
            <>
              <div className="stat-card">
                <i
                  className="fas fa-book-open stat-icon"
                  aria-hidden="true"
                ></i>
                <h3>{stats.coursesCompleted}</h3>
                <p>Courses Completed</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-clock stat-icon" aria-hidden="true"></i>
                <h3>{stats.totalHoursLearned}</h3>
                <p>Hours Learned</p>
              </div>
              <div className="stat-card">
                <i
                  className="fas fa-certificate stat-icon"
                  aria-hidden="true"
                ></i>
                <h3>{stats.certificatesEarned}</h3>
                <p>Certificates Earned</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-fire stat-icon" aria-hidden="true"></i>
                <h3>{stats.currentStreak}</h3>
                <p>Day Streak</p>
              </div>
            </>
          )}
        </div>

        {/* Render different dashboard sections based on role */}
        {isInstructor ? (
          // Professor Dashboard
          <>
            {/* Course Rosters Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Your Courses</h2>
                <Link to="/courses" className="view-all-link">
                  Manage Courses
                </Link>
              </div>

              <div className="roster-table">
                <table>
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Enrolled Students</th>
                      <th>Average Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseRosters.map((course) => (
                      <tr key={course.id}>
                        <td>{course.course}</td>
                        <td>{course.students} students</td>
                        <td>
                          <div className="progress-bar">
                            <div
                              className="progress"
                              style={{ width: `${course.averageProgress}%` }}
                              aria-valuenow={course.averageProgress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <span className="progress-text">
                            {course.averageProgress}%
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submissions Queue Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Submission Queue</h2>
                <Link to="/submissions" className="view-all-link">
                  View All
                </Link>
              </div>

              <div className="submissions-list">
                {submissions.map((submission) => (
                  <div key={submission.id} className="submission-item">
                    <div className="submission-header">
                      <h3>{submission.assignment}</h3>
                      <span className="submission-course">
                        {submission.course}
                      </span>
                    </div>
                    <div className="submission-stats">
                      <div className="submission-stat">
                        <span className="stat-label">Submitted:</span>
                        <span className="stat-value">
                          {submission.submitted}
                        </span>
                      </div>
                      <div className="submission-stat">
                        <span className="stat-label">Pending Review:</span>
                        <span className="stat-value pending">
                          {submission.pending}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-primary">
                      Grade Submissions
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Analytics Overview</h2>
                <Link to="/analytics" className="view-all-link">
                  Detailed Reports
                </Link>
              </div>

              <div className="analytics-overview">
                <div className="analytics-card">
                  <h3>Most Active Time</h3>
                  <p>{analytics.mostActiveTime}</p>
                </div>
                <div className="analytics-card">
                  <h3>Top Performing Course</h3>
                  <p>{analytics.topPerformingCourse}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Student Dashboard
          <>
            {/* My Courses Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Courses</h2>
                <Link to="/courses" className="view-all-link">
                  View All
                </Link>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="empty-state">
                  <img
                    src="/ISIM-logo.jpg"
                    alt="No courses"
                    className="empty-illustration"
                  />
                  <p>You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="btn btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="enrolled-courses-grid">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="dashboard-course-card">
                      <div className="course-card-image">
                        <img src={course.image} alt={course.title} />
                        <div
                          className="progress-indicator"
                          aria-label={`${course.progress}% complete`}
                        >
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path
                              className="circle-bg"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="circle"
                              strokeDasharray={`${course.progress}, 100`}
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">
                              {course.progress}%
                            </text>
                          </svg>
                        </div>
                      </div>
                      <div className="course-card-content">
                        <h3>{course.title}</h3>
                        <p className="course-instructor">
                          Instructor: {course.instructor}
                        </p>
                        <div className="next-lesson">
                          <span>Next Lesson:</span>
                          <p>{course.nextLesson}</p>
                        </div>
                        <div className="card-actions">
                          <button className="btn btn-primary">
                            Continue Learning
                          </button>
                          <span className="last-accessed">
                            Last accessed: {course.lastAccessed}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assignments Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Assignments</h2>
                <Link to="/assignments" className="view-all-link">
                  View All
                </Link>
              </div>

              <div className="assignments-list">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className={`assignment-item ${assignment.status}`}
                  >
                    <div className="assignment-status-icon">
                      {assignment.status === "pending" ? (
                        <i className="fas fa-clock" aria-hidden="true"></i>
                      ) : (
                        <i
                          className="fas fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      )}
                    </div>
                    <div className="assignment-content">
                      <h3>{assignment.title}</h3>
                      <p className="assignment-course">{assignment.course}</p>
                      <p className="assignment-due">
                        Due: {assignment.dueDate}
                      </p>
                    </div>
                    <div className="assignment-actions">
                      {assignment.status === "pending" ? (
                        <button className="btn btn-outline">Submit Work</button>
                      ) : (
                        <span className="status-badge submitted">
                          Submitted
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grades Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Recent Grades</h2>
                <Link to="/grades" className="view-all-link">
                  View All
                </Link>
              </div>

              <div className="grades-list">
                {grades.map((grade) => (
                  <div key={grade.id} className="grade-item">
                    <div className="grade-badge">{grade.grade}</div>
                    <div className="grade-content">
                      <h3>{grade.assignment}</h3>
                      <p className="grade-course">{grade.course}</p>
                      <p className="grade-feedback">{grade.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Upcoming Classes</h2>
              </div>

              <div className="upcoming-classes">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="upcoming-class-item">
                    <div className="class-date">
                      <span className="day">
                        {classItem.date.split("-")[2]}
                      </span>
                      <span className="month">
                        {new Date(`${classItem.date}T00:00:00`).toLocaleString(
                          "default",
                          { month: "short" }
                        )}
                      </span>
                    </div>
                    <div className="class-content">
                      <h3>{classItem.course}</h3>
                      <p className="class-topic">{classItem.topic}</p>
                      <p className="class-time">
                        <i className="fas fa-clock" aria-hidden="true"></i>{" "}
                        {classItem.time}
                      </p>
                    </div>
                    <button className="btn btn-outline btn-sm">
                      Add to Calendar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Activity Timeline - Common for both roles */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-timeline">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`timeline-item ${activity.type}`}
              >
                <div className="timeline-icon">
                  {activity.type === "lesson_completed" && (
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                  )}
                  {activity.type === "quiz_passed" && (
                    <i className="fas fa-trophy" aria-hidden="true"></i>
                  )}
                  {activity.type === "course_started" && (
                    <i className="fas fa-play-circle" aria-hidden="true"></i>
                  )}
                </div>
                <div className="timeline-content">
                  <h4>{activity.course}</h4>
                  <p>{activity.detail}</p>
                  <span className="activity-date">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
