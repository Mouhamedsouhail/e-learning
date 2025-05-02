import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto", // Pushes footer to the bottom
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src="/ISIM-logo.jpg" // Ensure this path is correct relative to the public folder
                alt="ISIMM Academy Logo"
                style={{ height: 40, marginRight: "10px" }}
              />
              <Typography variant="h6" color="text.primary" gutterBottom>
                ISIMM Academy
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               Institut Supérieur d'Informatique et de Mathématiques de Monastir
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Typography variant="body2" color="text.secondary">
                Avenue de la Corniche, Monastir 5000, Tunisie
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Link
                href="mailto:isimm@gmail.com"
                variant="body2"
                color="text.secondary"
              >
                isimm@gmail.com
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Typography variant="body2" color="text.secondary">
                +216 99 999 999
              </Typography>
            </Box>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ mr: 1 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ mr: 1 }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ mr: 1 }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Liens Rapides
            </Typography>
            <Link
              component={RouterLink}
              to="/"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Accueil
            </Link>
            <Link
              component={RouterLink}
              to="/courses"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Cours
            </Link>
            <Link
              component={RouterLink}
              to="/dashboard"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Tableau de Bord
            </Link>
            <Link
              component={RouterLink}
              to="/profile"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Mon Profil
            </Link>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Ressources
            </Typography>
            <Link
              component={RouterLink}
              to="/courses"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Catalogue des Cours
            </Link>
            <Link
              component={RouterLink}
              to="/"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Calendrier Académique
            </Link>
            <Link
              component={RouterLink}
              to="/"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Manuel de l'Étudiant
            </Link>
            <Link
              component={RouterLink}
              to="/"
              display="block"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Politiques Universitaires
            </Link>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            {new Date().getFullYear()}
            {" ISIMM Academy - Tous droits réservés"}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link
              component={RouterLink}
              to="/"
              variant="body2"
              color="text.secondary"
              sx={{ mx: 1 }}
            >
              Politique de Confidentialité
            </Link>
            <Link
              component={RouterLink}
              to="/"
              variant="body2"
              color="text.secondary"
              sx={{ mx: 1 }}
            >
              Conditions d'Utilisation
            </Link>
            <Link
              component={RouterLink}
              to="/"
              variant="body2"
              color="text.secondary"
              sx={{ mx: 1 }}
            >
              Accessibilité
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
