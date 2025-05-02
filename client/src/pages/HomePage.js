import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac"; // Example MUI Icon
import StorageIcon from "@mui/icons-material/Storage"; // Example MUI Icon
import CalculateIcon from "@mui/icons-material/Calculate"; // Example MUI Icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <Box className="home-page" sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        className="hero"
        sx={{
          py: 8,
          textAlign: "center",
          background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)", // Example gradient
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue à ISIMM Academy
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Institut Supérieur d'Informatique et de Mathématiques de Monastir
          </Typography>
          <Box className="hero-buttons">
            {isAuthenticated ? (
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/dashboard"
                size="large"
              >
                Aller au Tableau de Bord
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/login"
                  size="large"
                  sx={{ mr: 2 }}
                >
                  Connexion
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                  component={RouterLink}
                  to="/register"
                  size="large"
                >
                  Inscription
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* University Info Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Make the text section take full width */}
          <Grid item xs={12} md={12}>
            <Typography variant="h4" component="h2" gutterBottom>
              À propos d'ISIMM Academy
            </Typography>
            <Typography variant="body1" paragraph>
              Bienvenue sur la plateforme e-learning officielle de l'Institut
              Supérieur d'Informatique et de Mathématiques de Monastir. Notre
              plateforme offre aux étudiants l'accès aux supports de cours, aux
              devoirs et aux ressources académiques pour soutenir vos études à
              l'ISIMM.
            </Typography>
            <Typography variant="body1" paragraph>
              Cette plateforme est conçue pour compléter vos cours en présentiel
              et fournir un emplacement centralisé pour tous vos besoins
              académiques pendant votre séjour dans notre institution.
            </Typography>

            {isAuthenticated && currentUser?.role === "student" ? (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Votre Parcours d'Apprentissage
                </Typography>
                <Typography paragraph>
                  Continuez là où vous vous êtes arrêté dans vos cours inscrits.
                </Typography>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/dashboard"
                  endIcon={<ArrowForwardIcon />}
                >
                  Voir Mes Cours
                </Button>
              </Box>
            ) : (
              !isAuthenticated && (
                <Box mt={3}>
                  <Typography paragraph>
                    Connectez-vous avec vos identifiants universitaires pour
                    accéder à vos cours.
                  </Typography>
                </Box>
              )
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Academic Programs Section */}
      <Box
        sx={{
          py: 6,
          backgroundImage: "url(/ISIMMAcademy1.png)", // Set the background image
          backgroundSize: "cover", // Cover the entire area
          backgroundPosition: "center", // Center the image
          position: "relative", // Needed for overlay
          "&::before": {
            // Add an overlay for better text readability
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Reduced overlay opacity
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Programmes Académiques
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
            {[
              // Array for easier mapping
              {
                icon: <LaptopMacIcon fontSize="large" color="primary" />,
                title: "Informatique",
                description:
                  "Programmes de premier cycle et cycles supérieurs axés sur le développement logiciel, les algorithmes et la théorie computationnelle.",
              },
              {
                icon: <StorageIcon fontSize="large" color="primary" />,
                title: "Systèmes d'Information",
                description:
                  "Programmes conçus pour développer une expertise en gestion de bases de données, analyse de systèmes et infrastructure informatique.",
              },
              {
                icon: <CalculateIcon fontSize="large" color="primary" />,
                title: "Mathématiques Appliquées",
                description:
                  "Programmes spécialisés en analyse statistique, modélisation mathématique et méthodes quantitatives.",
              },
            ].map((program, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <Box sx={{ mb: 2 }}>{program.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {program.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {program.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/courses"
              size="large"
            >
              Parcourir Tous les Cours
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Announcements Section - Simplified for brevity, can be expanded */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Annonces Universitaires
        </Typography>
        <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6">
            Ouverture des inscriptions pour l'automne 2025 le 15 mai
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            24 avril
          </Typography>
          <Typography paragraph>
            Les inscriptions pour le semestre d'automne 2025 ouvriront le 15
            mai. Veuillez consulter votre conseiller pédagogique avant de vous
            inscrire.
          </Typography>
          {/* Add more announcements similarly */}
          <Link component={RouterLink} to="#" sx={{ mt: 2 }}>
            Voir Toutes les Annonces
          </Link>{" "}
          {/* Placeholder link */}
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
