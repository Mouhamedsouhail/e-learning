# ISIMM Academy E-Learning Platform

A comprehensive e-learning platform built for the Higher Institute of Computer Science and Mathematics of Monastir (ISIMM). This platform provides an academic environment for students and instructors to manage courses, assignments, and track academic progress.

## Features

### For Students

- **Personalized Dashboard**: View enrolled courses, upcoming assignments, grades, and class schedule
- **Course Access**: Access course materials, lectures, and resources
- **Progress Tracking**: Monitor learning progress with completion percentages
- **Assignment Management**: Submit assignments and view feedback
- **User Profiles**: Customize personal profiles with academic information

### For Instructors

- **Course Management**: Create and manage course content
- **Student Tracking**: Monitor student progress and engagement
- **Grading System**: Evaluate assignments and provide feedback
- **Analytics**: View course performance metrics
- **Class Management**: Organize course rosters and materials

## Project Structure

```
client/
  ├── public/         # Static assets and HTML template
  ├── src/
  │   ├── components/ # Reusable UI components
  │   ├── context/    # React context providers
  │   ├── pages/      # Page components
  │   ├── services/   # API service layer
  │   ├── App.js      # Main application component
  │   └── index.js    # Application entry point
  └── package.json    # Client dependencies
server/
  ├── controllers/    # Route controllers
  ├── middleware/     # Express middleware
  ├── models/         # Mongoose data models
  ├── routes/         # API route definitions
  ├── utils/          # Utility functions
  ├── server.js       # Server entry point
  └── package.json    # Server dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```
git clone <repository-url>
cd e-learning-platform
```

2. Install server dependencies

```
cd server
npm install
```

3. Install client dependencies

```
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

### Running the Application

1. Start the server

```
cd server
npm run dev
```

2. Start the client

```
cd client
npm start
```

3. Access the application at `http://localhost:3000`

## Role-Based Access Control

The platform implements role-based access control with three main roles:

1. **Student**: Can access courses they're enrolled in, submit assignments, view grades
2. **Instructor**: Can create courses, grade assignments, view student analytics
3. **Admin**: Has full access to all platform functions and settings

Routes are protected based on user roles to ensure proper security and access control.

## Environment Variables

### Client

- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

### Server

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `EMAIL_USER`: Email account for notifications
- `EMAIL_PASS`: Email password or app-specific password

## Technologies Used

- **Frontend**: React, React Router, Context API, CSS
- **Backend**: Node.js, Express, MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Additional**: FontAwesome for icons

## Troubleshooting

### Common Issues

1. **Database connection errors**

   - Check MongoDB connection string in `.env` file
   - Ensure MongoDB service is running

2. **JWT Authentication Issues**

   - Verify JWT_SECRET is properly set in `.env`
   - Check for token expiration

3. **Loading Performance**
   - The application uses lazy loading for better performance
   - Initial load may be slow depending on network conditions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
