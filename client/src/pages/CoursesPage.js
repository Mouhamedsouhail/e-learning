import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for API call - Replace with actual API fetch
    // Displaying all courses based on available images in /public
    setTimeout(() => {
      setCourses([
        {
          id: "webdev",
          title: "Introduction au Développement Web",
          description: "Apprenez les bases de HTML, CSS et JavaScript.",
          instructor: "Mohamed Bouazizi",
          image: "/webdev.jpg",
        },
        {
          id: "database",
          title: "Introduction aux Bases de Données",
          description:
            "Apprenez les concepts des bases de données relationnelles et SQL.",
          instructor: "Anis Ben Youssef",
          image: "/database.jpg",
        },
        {
          id: "oop",
          title: "Programmation Orientée Objet",
          description:
            "Explorez les principes de la POO en utilisant Java/C++.",
          instructor: "Youssef Chahed",
          image: "/OOP.jpg",
        },
        {
          id: "ai",
          title: "Intelligence Artificielle",
          description:
            "Explorez les fondamentaux de l'IA et de l'apprentissage automatique.",
          instructor: "Mehdi Zoghlami",
          image: "/AI.jpg",
        },
        {
          id: "automat",
          title: "Techniques de compilation",
          description:
            "Étudiez les langages formels et la conception de compilateurs.",
          instructor: "Hichem Marzouki",
          image: "/automat theory.jpg",
        },
        {
          id: "bi",
          title: "Informatique Décisionnelle & Entrepôts de Données",
          description: "Apprenez les concepts d'entrepôt de données et de BI.",
          instructor: "Rami Souilah",
          image: "/BI.jpg",
        },
        {
          id: "network",
          title: "Réseaux Informatiques",
          description: "Comprenez les protocoles réseau et l'architecture.",
          instructor: "Firas Hamdi",
          image: "/network.jpg",
        },
        {
          id: "python",
          title: "Programmation Python",
          description: "Apprenez les fondamentaux de la programmation Python.",
          instructor: "Walid Ben Ali",
          image: "/python.jpg",
        },
        {
          id: "testing",
          title: "Test Logiciel (ISTQB)",
          description:
            "Apprenez les techniques de test logiciel et préparez-vous à l'ISTQB.",
          instructor: "Aymen Rebai",
          image: "/testing.jpg",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)", // Adjust height as needed
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des cours...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cours Disponibles
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.image || "https://via.placeholder.com/300x200"} // Fallback image
                alt={course.title}
                sx={{ objectFit: "cover" }} // Ensure image covers the area
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {course.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Instructeur : {course.instructor}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`/courses/${course.id}`}
                >
                  Voir le Cours
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesPage;
