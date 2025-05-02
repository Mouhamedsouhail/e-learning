import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Badge,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  School,
  AccessTime,
  CheckCircle,
  PlayCircleFilled,
  EmojiEvents,
  LocalFireDepartment,
  People,
  Grading,
  Analytics,
  Assignment,
  Event,
  AdminPanelSettings,
  ManageAccounts,
  BarChart,
  NotificationsActive,
  Book,
  HourglassEmpty,
  TaskAlt,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Done as DoneIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
};

// Helper function to get activity icon
const getActivityIcon = (type) => {
  switch (type) {
    case "lesson_completed":
      return <CheckCircle color="success" />;
    case "quiz_passed":
      return <TaskAlt color="success" />;
    case "course_started":
      return <PlayCircleFilled color="info" />;
    default:
      return <NotificationsActive color="action" />;
  }
};

// StatCard component
const StatCard = ({ icon, value, label }) => (
  <Grid item xs={6} sm={3}>
    <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
      <Avatar sx={{ bgcolor: "primary.light", margin: "auto", mb: 1 }}>
        {icon}
      </Avatar>
      <Typography variant="h5" component="h3">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  </Grid>
);

// Sample Semester Data (as provided)
const initialSemesterData = {
  semester: 4,
  courseUnits: [
    {
      code: "573103410",
      libelle: "Bases de données",
      cr: 4,
      coef: 2,
      nat: "Fond",
      rg: "MX",
      elements: [
        {
          code: "573103412",
          libelle: "Administration des bases de données",
          coef: 1,
          cr: 2,
          rg: "MX",
          volumeHoraire: { cours: 10.5, td: 0, tp: 21, cInt: 0, total: 31.5 },
          completed: false,
        },
        {
          code: "573103411",
          libelle: "Entrepôts de données",
          coef: 1,
          cr: 2,
          rg: "MX",
          volumeHoraire: { cours: 21, td: 0, tp: 0, cInt: 0, total: 21 },
          completed: false,
        },
      ],
    },
    {
      code: "573103430",
      libelle: "Compilation & tests",
      cr: 5,
      coef: 2.5,
      nat: "Fond",
      rg: "MX",
      elements: [
        {
          code: "573103416",
          libelle: "Tests de logiciels (certification ISTQB)",
          coef: 1,
          cr: 2,
          rg: "MX",
          volumeHoraire: { cours: 21, td: 0, tp: 10.5, cInt: 0, total: 31.5 },
          completed: false,
        },
        {
          code: "573103415",
          libelle: "Techniques de compilation",
          coef: 1.5,
          cr: 3,
          rg: "MX",
          volumeHoraire: { cours: 21, td: 10.5, tp: 21, cInt: 0, total: 52.5 },
          completed: false,
        },
      ],
    },
    // Add the rest of the course units here if needed
  ],
};

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [semesterData, setSemesterData] = useState(null); // State for semester data
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
  const [expandedPanel, setExpandedPanel] = useState(false); // State for accordion expansion
  const [elementCompletion, setElementCompletion] = useState({}); // State for element completion { 'elementCode': true/false }

  // Professor-specific states
  const [courseRosters, setCourseRosters] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const [loading, setLoading] = useState(true);
  // Filter/Sort State (placeholders)
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("libelle"); // e.g., 'libelle', 'cr', 'coef'

  const isInstructor =
    currentUser?.role === "instructor" || currentUser?.role === "admin";
  const isAdmin = currentUser?.role === "admin";

  // Handle accordion expansion change
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  // Handle element completion toggle
  const handleCompletionChange = (elementCode) => (event) => {
    setElementCompletion((prev) => ({
      ...prev,
      [elementCode]: event.target.checked,
    }));
    // Here you might also want to update the backend/main data structure
  };

  useEffect(() => {
    // Simulate API calls with setTimeout
    setTimeout(() => {
      // Common data for all roles

      // Set Semester Data (only for students for now)
      if (!isInstructor && !isAdmin) {
        // Initialize completion state from data
        const initialCompletion = {};
        initialSemesterData.courseUnits.forEach((unit) => {
          unit.elements.forEach((el) => {
            initialCompletion[el.code] = el.completed;
          });
        });
        setElementCompletion(initialCompletion);
        setSemesterData(initialSemesterData);
      }

      setActivities([
        {
          id: 1,
          type: "lesson_completed",
          course: "Introduction au Développement Web",
          detail: "Leçon terminée : Fondamentaux HTML",
          date: "2025-04-20",
        },
        {
          id: 2,
          type: "quiz_passed",
          course: "Modèles React Avancés",
          detail: "Quiz réussi avec un score de : 85%",
          date: "2025-04-18",
        },
        {
          id: 3,
          type: "course_started",
          course: "Fondamentaux de la Science des Données",
          detail: "Nouveau cours commencé",
          date: "2025-04-16",
        },
      ]);

      setStats({
        coursesCompleted: 3,
        totalHoursLearned: 27,
        certificatesEarned: 2,
        currentStreak: 5,
      });

      // Student-specific data
      if (!isInstructor && !isAdmin) {
        setAssignments([
          {
            id: 1,
            title: "Conception de Schéma de Base de Données",
            course: "Gestion de Base de Données",
            dueDate: "2025-05-02",
            status: "pending",
          },
          {
            id: 2,
            title: "Labo Fonctions JavaScript",
            course: "Introduction au Développement Web",
            dueDate: "2025-04-29",
            status: "pending",
          },
          {
            id: 3,
            title: "Implémentation des Hooks React",
            course: "Modèles React Avancés",
            dueDate: "2025-04-27",
            status: "submitted",
          },
        ]);

        setGrades([
          {
            id: 1,
            assignment: "Quiz Bases HTML",
            course: "Introduction au Développement Web",
            grade: "92%",
            feedback: "Excellente compréhension de la structure HTML !",
          },
          {
            id: 2,
            assignment: "Mise en page CSS Grid",
            course: "Introduction au Développement Web",
            grade: "85%",
            feedback:
              "Bon travail sur les mises en page. Révisez les concepts de design responsive.",
          },
        ]);

        setUpcomingClasses([
          {
            id: 1,
            course: "Fondamentaux de la Science des Données",
            time: "10:00 AM - 11:30 AM",
            date: "2025-05-02",
            topic: "Méthodes d'Analyse Statistique",
          },
          {
            id: 2,
            course: "Modèles React Avancés",
            time: "2:00 PM - 3:30 PM",
            date: "2025-05-05",
            topic: "Hooks Personnalisés et Context API",
          },
        ]);
      }
      // Professor-specific data
      else if (isInstructor && !isAdmin) {
        setCourseRosters([
          {
            id: 1,
            course: "Introduction au Développement Web",
            students: 42,
            averageProgress: 65,
          },
          {
            id: 2,
            course: "Structures de Données et Algorithmes",
            students: 38,
            averageProgress: 72,
          },
        ]);

        setSubmissions([
          {
            id: 1,
            assignment: "Projet HTML & CSS",
            course: "Introduction au Développement Web",
            submitted: 35,
            pending: 7,
          },
          {
            id: 2,
            assignment: "Quiz Implémentation de Tableaux",
            course: "Structures de Données et Algorithmes",
            submitted: 36,
            pending: 2,
          },
        ]);

        setAnalytics({
          totalStudents: 143,
          averageCourseCompletion: 68,
          mostActiveTime: "Mardis, 16h - 19h",
          topPerformingCourse: "Structures de Données et Algorithmes",
        });
      }

      setLoading(false);
    }, 1000);
  }, [isInstructor, isAdmin]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          Chargement de votre tableau de bord...
        </Typography>
      </Box>
    );
  }

  if (isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
            color: "white",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            <AdminPanelSettings fontSize="large" />
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="h4" component="h1" gutterBottom>
              Bienvenue, {currentUser?.name || "Admin"} !
            </Typography>
            <Typography variant="body1">
              Vous êtes connecté en tant qu'<b>Admin</b>. Gérez la plateforme
              efficacement.
            </Typography>
          </Box>
          <Box
            component="img"
            src="/ISIMMAcademy.png"
            alt="ISIMM Academy Logo"
            sx={{ height: 60, display: { xs: "none", sm: "block" } }}
          />
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Liens Rapides Admin
              </Typography>
              <List>
                <ListItem button component={RouterLink} to="/admin/users">
                  <ListItemIcon>
                    <ManageAccounts color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Gestion des Utilisateurs" />
                </ListItem>
                <ListItem button component={RouterLink} to="/admin">
                  <ListItemIcon>
                    <BarChart color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Analyses de la Plateforme" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Aperçu du Système
              </Typography>
              <Typography>Utilisateurs Totaux : [Nombre]</Typography>
              <Typography>Cours Actifs : [Nombre]</Typography>
              <Typography>Inscriptions Récentes : [Nombre]</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const filteredAndSortedUnits =
    semesterData?.courseUnits
      ?.filter(
        (unit) =>
          unit.libelle.toLowerCase().includes(filterText.toLowerCase()) ||
          unit.elements.some((el) =>
            el.libelle.toLowerCase().includes(filterText.toLowerCase())
          )
      )
      .sort((a, b) => {
        if (sortBy === "libelle") {
          return a.libelle.localeCompare(b.libelle);
        } else if (sortBy === "cr") {
          return b.cr - a.cr; // Descending credits
        } else if (sortBy === "coef") {
          return b.coef - a.coef; // Descending coefficient
        }
        return 0;
      }) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
          color: "white",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            width: 56,
            height: 56,
            mr: 2,
          }}
        >
          {isInstructor ? <School /> : <PersonIcon />}
        </Avatar>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bon retour,{" "}
            {currentUser?.name || (isInstructor ? "Instructeur" : "Étudiant")} !
          </Typography>
          <Typography variant="body1">
            {isInstructor
              ? "Gérez vos cours et suivez les progrès des étudiants."
              : "Suivez vos progrès et continuez à apprendre."}
          </Typography>
          {!isInstructor && stats.currentStreak > 0 && (
            <Chip
              icon={<LocalFireDepartment />}
              label={`${stats.currentStreak} jours de série`}
              color="warning"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
        <Box
          component="img"
          src="/ISIMMAcademy.png"
          alt="ISIMM Academy Logo"
          sx={{ height: 60, display: { xs: "none", sm: "block" } }}
        />
      </Paper>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {isInstructor ? (
          <>
            <StatCard
              icon={<People />}
              value={analytics.totalStudents || 0}
              label="Étudiants Totaux"
            />
            <StatCard
              icon={<School />}
              value={courseRosters.length || 0}
              label="Cours Actifs"
            />
            <StatCard
              icon={<Grading />}
              value={
                submissions.reduce((acc, sub) => acc + sub.pending, 0) || 0
              }
              label="Évaluations en Attente"
            />
            <StatCard
              icon={<Analytics />}
              value={`${analytics.averageCourseCompletion || 0}%`}
              label="Complétion Moy."
            />
          </>
        ) : (
          <>
            <StatCard
              icon={<Book />}
              value={stats.coursesCompleted}
              label="Cours Terminés"
            />
            <StatCard
              icon={<AccessTime />}
              value={stats.totalHoursLearned}
              label="Heures Apprises"
            />
            <StatCard
              icon={<EmojiEvents />}
              value={stats.certificatesEarned}
              label="Certificats Obtenus"
            />
            <StatCard
              icon={<LocalFireDepartment />}
              value={stats.currentStreak}
              label="Jours de Série"
            />
          </>
        )}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={isInstructor ? 6 : 8}>
          {isInstructor ? (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Vos Cours</Typography>
                <Button component={RouterLink} to="/courses" size="small">
                  Gérer les Cours
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom du Cours</TableCell>
                      <TableCell align="right">Étudiants</TableCell>
                      <TableCell>Progression Moy.</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseRosters.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell component="th" scope="row">
                          {course.course}
                        </TableCell>
                        <TableCell align="right">{course.students}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={course.averageProgress}
                              sx={{ width: "70%", mr: 1 }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >{`${course.averageProgress}%`}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            component={RouterLink}
                            to={`/courses/${course.id}/manage`}
                          >
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  Unités d'Enseignement Semestre {semesterData?.semester}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Filtrer par Nom"
                    variant="outlined"
                    size="small"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Trier par</InputLabel>
                    <Select
                      value={sortBy}
                      label="Trier par"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="libelle">Nom</MenuItem>
                      <MenuItem value="cr">Crédits</MenuItem>
                      <MenuItem value="coef">Coefficient</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {filteredAndSortedUnits.length === 0 ? (
                <Box textAlign="center" py={5}>
                  <img
                    src="/ISIM-logo.jpg"
                    alt="Aucune unité d'enseignement trouvée"
                    style={{
                      maxWidth: "150px",
                      marginBottom: "16px",
                      opacity: 0.7,
                    }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    Aucune unité d'enseignement trouvée pour ce semestre ou
                    correspondant à votre filtre.
                  </Typography>
                </Box>
              ) : (
                <div>
                  {filteredAndSortedUnits.map((unit) => (
                    <Accordion
                      key={unit.code}
                      expanded={expandedPanel === unit.code}
                      onChange={handleAccordionChange(unit.code)}
                      sx={{ mb: 1 }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${unit.code}-content`}
                        id={`${unit.code}-header`}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            mr: 2,
                          }}
                        >
                          <Typography
                            sx={{ flexShrink: 0, fontWeight: "medium" }}
                          >
                            {unit.libelle} ({unit.code})
                          </Typography>
                          <Box sx={{ display: "flex", gap: 2, flexShrink: 0 }}>
                            <Chip label={`CR: ${unit.cr}`} size="small" />
                            <Chip label={`Coef: ${unit.coef}`} size="small" />
                            <Chip
                              label={unit.nat}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`RG: ${unit.rg}`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ backgroundColor: "action.hover" }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Éléments Constitutifs :
                        </Typography>
                        <List dense disablePadding>
                          {unit.elements.map((element) => (
                            <ListItem
                              key={element.code}
                              divider
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              <Box sx={{ flexGrow: 1, mr: 2 }}>
                                <ListItemText
                                  primary={`${element.libelle} (${element.code})`}
                                  secondary={`Coef: ${element.coef}, CR: ${element.cr}, RG: ${element.rg}`}
                                />
                                <Typography
                                  variant="caption"
                                  display="block"
                                  color="text.secondary"
                                >
                                  Heures : C={element.volumeHoraire.cours}, TD=
                                  {element.volumeHoraire.td}, TP=
                                  {element.volumeHoraire.tp}, Total=
                                  {element.volumeHoraire.total}
                                </Typography>
                              </Box>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={!!elementCompletion[element.code]}
                                    onChange={handleCompletionChange(
                                      element.code
                                    )}
                                    icon={<CloseIcon color="error" />}
                                    checkedIcon={<DoneIcon color="success" />}
                                  />
                                }
                                label={
                                  elementCompletion[element.code]
                                    ? "Terminé"
                                    : "Marquer comme Terminé"
                                }
                                labelPlacement="start"
                                sx={{ ml: "auto" }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </Paper>
          )}

          {isInstructor && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  File d'Attente des Soumissions
                </Typography>
                <Button component={RouterLink} to="/submissions" size="small">
                  Voir Tout
                </Button>
              </Box>
              <List dense>
                {submissions.map((sub) => (
                  <ListItem
                    key={sub.id}
                    secondaryAction={
                      <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/submissions/grade/${sub.assignmentId || sub.id}`}
                      >
                        Noter
                      </Button>
                    }
                    divider
                  >
                    <ListItemText
                      primary={sub.assignment}
                      secondary={
                        <>
                          {sub.course} -
                          <Chip
                            label={`${sub.pending} En attente`}
                            color="warning"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                          <Chip
                            label={`${sub.submitted} Soumis`}
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                ))}
                {submissions.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Aucune soumission à évaluer.
                  </Typography>
                )}
              </List>
            </Paper>
          )}

          {!isInstructor && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Devoirs à Rendre</Typography>
                <Button component={RouterLink} to="/assignments" size="small">
                  Voir Tout
                </Button>
              </Box>
              <List dense>
                {assignments
                  .filter((a) => a.status === "pending")
                  .slice(0, 3)
                  .map((assign) => (
                    <ListItem
                      key={assign.id}
                      secondaryAction={
                        <Button
                          variant="outlined"
                          size="small"
                          component={RouterLink}
                          to={`/assignments/${assign.id}`}
                        >
                          Voir
                        </Button>
                      }
                      divider
                    >
                      <ListItemIcon>
                        <Assignment
                          color={
                            assign.status === "pending" ? "warning" : "disabled"
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={assign.title}
                        secondary={`À rendre le : ${formatDate(
                          assign.dueDate
                        )} - ${assign.course}`}
                      />
                    </ListItem>
                  ))}
                {assignments.filter((a) => a.status === "pending").length ===
                  0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Aucun devoir en attente.
                  </Typography>
                )}
              </List>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={isInstructor ? 6 : 4}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Activité Récente
            </Typography>
            <List dense>
              {activities.slice(0, 5).map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getActivityIcon(activity.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.detail}
                    secondary={`${activity.course} - ${formatDate(
                      activity.date
                    )}`}
                  />
                </ListItem>
              ))}
              {activities.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Aucune activité récente.
                </Typography>
              )}
            </List>
          </Paper>

          {isInstructor && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Aperçu des Analyses</Typography>
                <Button component={RouterLink} to="/analytics" size="small">
                  Rapports Détaillés
                </Button>
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Heure la Plus Active :</strong>{" "}
                {analytics.mostActiveTime}
              </Typography>
              <Typography variant="body2">
                <strong>Cours le Plus Performant :</strong>{" "}
                {analytics.topPerformingCourse}
              </Typography>
              {Object.keys(analytics).length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mt: 2 }}
                >
                  Les données d'analyse ne sont pas encore disponibles.
                </Typography>
              )}
            </Paper>
          )}

          {!isInstructor && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Notes Récentes</Typography>
                <Button component={RouterLink} to="/grades" size="small">
                  Voir Tout
                </Button>
              </Box>
              <List dense>
                {grades.slice(0, 3).map((grade) => (
                  <ListItem key={grade.id} divider>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      <Chip
                        label={grade.grade}
                        color={
                          parseInt(grade.grade) >= 80 ? "success" : "warning"
                        }
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={grade.assignment}
                      secondary={grade.course}
                    />
                  </ListItem>
                ))}
                {grades.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Aucune note pour le moment.
                  </Typography>
                )}
              </List>
            </Paper>
          )}

          {!isInstructor && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cours à Venir
              </Typography>
              <List dense>
                {upcomingClasses.slice(0, 3).map((classItem) => (
                  <ListItem key={classItem.id} divider>
                    <ListItemIcon>
                      <Event color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={classItem.course}
                      secondary={`${formatDate(classItem.date)} à ${
                        classItem.time
                      } - ${classItem.topic}`}
                    />
                  </ListItem>
                ))}
                {upcomingClasses.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Aucun cours à venir.
                  </Typography>
                )}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
