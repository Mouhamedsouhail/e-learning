import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for API call
    // In a real application, you would fetch course details from your API
    setTimeout(() => {
      setCourse({
        id: parseInt(id),
        title: `Course ${id}`,
        description: "This is a detailed description of the course.",
        instructor: "Instructor Name",
        duration: "8 weeks",
        level: "Intermediate",
        price: 49.99,
        lessons: [
          { id: 1, title: "Introduction to the Course" },
          { id: 2, title: "Getting Started with Basics" },
          { id: 3, title: "Advanced Concepts" },
          { id: 4, title: "Final Project" },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleEnroll = () => {
    // Placeholder for enrollment functionality
    alert("Enrollment successful!");
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="course-details-page">
      <div className="container">
        <h1>{course.title}</h1>
        <div className="course-info">
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
        </div>
        <div className="course-description">
          <h2>Description</h2>
          <p>{course.description}</p>
        </div>
        <div className="course-curriculum">
          <h2>Curriculum</h2>
          <ul>
            {course.lessons.map((lesson) => (
              <li key={lesson.id}>{lesson.title}</li>
            ))}
          </ul>
        </div>
        {isAuthenticated ? (
          <button className="btn btn-primary" onClick={handleEnroll}>
            Enroll Now
          </button>
        ) : (
          <p className="login-prompt">
            Please <a href="/login">login</a> to enroll in this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
