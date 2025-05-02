import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material";
import {
  School,
  AccessTime,
  BarChart,
  PlayCircleOutline,
  ShoppingCart,
  Info,
  CheckCircle,
} from "@mui/icons-material";

// Map course IDs (from CoursesPage) to details - Translated to French
const courseDetailsMap = {
  webdev: {
    title: "Introduction au Développement Web",
    instructor: "Mohamed Bouazizi",
    prerequisites: "Connaissances de base en informatique.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  datastructure: {
    title: "Structures de Données & Algorithmes",
    instructor: "Kais Trabelsi",
    prerequisites: "Concepts de base en programmation (variables, boucles, fonctions).",
    tags: ["Algorithmes", "Structures de Données", "Résolution de Problèmes"],
  },
  database: {
    title: "Introduction aux Bases de Données",
    instructor: "Anis Ben Youssef",
    prerequisites: "Compréhension de base des systèmes informatiques.",
    tags: ["SQL", "Conception de Bases de Données", "Bases de Données Relationnelles"],
  },
  oop: {
    title: "Programmation Orientée Objet",
    instructor: "Youssef Chahed",
    prerequisites: "Concepts de base en programmation.",
    tags: ["POO", "Java", "C++", "Patrons de Conception"],
  },
  ai: {
    title: "Intelligence Artificielle",
    instructor: "Mehdi Zoghlami",
    prerequisites: "Mathématiques (Algèbre Linéaire, Calcul), Programmation Python.",
    tags: ["IA", "Apprentissage Automatique", "Réseaux Neuronaux"],
  },
  automat: {
    title: "Techniques de compilation",
    instructor: "Hichem Marzouki",
    prerequisites: "Mathématiques Discrètes, Structures de Données & Algorithmes.",
    tags: ["Compilateurs", "Langages Formels", "Automates"],
  },
  bi: {
    title: "Informatique Décisionnelle & Entrepôts de Données",
    instructor: "Rami Souilah",
    prerequisites: "Introduction aux Bases de Données, Statistiques de base.",
    tags: ["BI", "Entrepôt de Données", "ETL"],
  },
  network: {
    title: "Réseaux Informatiques",
    instructor: "Firas Hamdi",
    prerequisites: "Connaissances de base en informatique.",
    tags: ["Réseautique", "TCP/IP", "Protocoles"],
  },
  python: {
    title: "Programmation Python",
    instructor: "Walid Ben Ali",
    prerequisites: "Connaissances de base en informatique.",
    tags: ["Python", "Fondamentaux de la Programmation"],
  },
  testing: {
    title: "Test Logiciel (ISTQB)",
    instructor: "Aymen Rebai",
    prerequisites:
      "Concepts de base en programmation, Compréhension du cycle de vie du développement logiciel.",
    tags: ["Test", "AQ", "ISTQB"],
  },
  cloud: {
    title: "Cloud Computing",
    instructor: "Mohamed Bouazizi",
    prerequisites: "Réseaux Informatiques, Bases des systèmes d'exploitation.",
    tags: ["Cloud", "AWS", "Azure", "GCP"],
  },
  mobiledev: {
    title: "Développement Mobile",
    instructor: "Kais Trabelsi",
    prerequisites: "Programmation Orientée Objet (Java/Kotlin/Swift).",
    tags: ["Mobile", "Android", "iOS"],
  },
  cyber: {
    title: "Fondamentaux de la Cybersécurité",
    instructor: "Anis Ben Youssef",
    prerequisites: "Réseaux Informatiques, Bases des systèmes d'exploitation.",
    tags: ["Sécurité", "Cybersécurité", "Cryptographie"],
  },
  datascience: {
    title: "Introduction à la Science des Données",
    instructor: "Youssef Chahed",
    prerequisites: "Programmation Python, Statistiques.",
    tags: ["Science des Données", "Analyse", "Visualisation"],
  },
};

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const details = courseDetailsMap[id];

        if (!details) {
          throw new Error("Cours non trouvé dans la carte");
        }

        const fetchedCourse = {
          id: id,
          title: details.title || `Cours : ${id}`,
          description:
            `Plongez au cœur de ${details.title}. Ce cours couvre tout ce que vous devez savoir, des concepts de base aux applications réelles. Convient aux débutants et aux apprenants intermédiaires cherchant à améliorer leurs compétences.`,
          instructor: details.instructor || "Instructeur par Défaut",
          duration: "12 heures",
          level: "Intermédiaire",
          tags: details.tags || ["Général"],
          lessons: [
            { id: 1, title: "Introduction et Configuration" },
            { id: 2, title: "Concepts Clés Partie 1" },
            { id: 3, title: "Concepts Clés Partie 2" },
            { id: 4, title: "Construction d'un Mini-Projet" },
            { id: 5, title: "Techniques Avancées" },
            { id: 6, title: "Déploiement et Projet Final" },
          ],
          prerequisites: details.prerequisites || "Connaissances de base en informatique.",
          learningOutcomes: [
            "Comprendre les principes fondamentaux.",
            "Construire des applications pratiques.",
            "Appliquer des techniques avancées.",
            "Se préparer aux projets du monde réel.",
          ],
        };

        setCourse(fetchedCourse);
      } catch (err) {
        console.error("Échec de la récupération des détails du cours :", err);
        setError(`Échec du chargement des détails du cours pour '${id}'. Veuillez réessayer plus tard.`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, currentUser]);

  const handleBeginCourse = async () => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour commencer ce cours.");
      return;
    }
    try {
      console.log(`L'utilisateur ${currentUser.id} commence le cours ${course.id}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = `/courses/${course.id}/learn`;
    } catch (err) {
      console.error("Échec du démarrage du cours :", err);
      alert("Impossible de commencer le cours. Veuillez réessayer.");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Chargement des détails du cours...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Les détails du cours pour '{id}' n'ont pas pu être chargés.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Left Column (Course Info) */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                {course.description}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Instructeur :</strong> {course.instructor}
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Chip 
                  icon={<AccessTime />} 
                  label={`Durée : ${course.duration}`} 
                  variant="outlined" 
                />
                <Chip 
                  icon={<BarChart />} 
                  label={`Niveau : ${course.level}`} 
                  variant="outlined" 
                />
              </Box>
              
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {course.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                ))}
              </Box>
            </Box>
            
            {course.prerequisites && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Prérequis
                </Typography>
                <Typography variant="body2">{course.prerequisites}</Typography>
              </Box>
            )}
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Objectifs d'Apprentissage
              </Typography>
              <List dense>
                {course.learningOutcomes.map((outcome, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      <CheckCircle fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={outcome} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Right Column (Enrollment & Content) */}
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              {/* Begin Course Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
                onClick={handleBeginCourse}
                disabled={!isAuthenticated}
                startIcon={<PlayCircleOutline />}
              >
                Commencer le Cours
              </Button>
              
              {/* Login/Signup prompt */}
              {!isAuthenticated && (
                <Box sx={{ mb: 2, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Veuillez{" "}
                    <RouterLink to="/login" style={{ textDecoration: "none" }}>
                      vous connecter
                    </RouterLink>{" "}
                    ou{" "}
                    <RouterLink to="/signup" style={{ textDecoration: "none" }}>
                      vous inscrire
                    </RouterLink>{" "}
                    pour commencer ce cours.
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Course Content List */}
              <Typography variant="h6" gutterBottom>
                Contenu du Cours
              </Typography>
              <List dense>
                {course.lessons.map((lesson) => (
                  <ListItem key={lesson.id} disablePadding>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
                      <PlayCircleOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={lesson.title} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CourseDetailsPage;