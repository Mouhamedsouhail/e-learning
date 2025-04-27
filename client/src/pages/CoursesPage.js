import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for API call
    // In a real application, you would fetch courses from your API
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS, and JavaScript",
          instructor: "John Doe",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          title: "Advanced React Patterns",
          description: "Master advanced concepts in React",
          instructor: "Jane Smith",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          title: "Node.js for Beginners",
          description: "Build backend applications with Node.js",
          instructor: "Alex Johnson",
          image: "https://via.placeholder.com/300x200",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-page">
      <div className="container">
        <h1>Available Courses</h1>
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} />
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p className="instructor">Instructor: {course.instructor}</p>
                <Link to={`/courses/${course.id}`} className="btn btn-primary">
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
