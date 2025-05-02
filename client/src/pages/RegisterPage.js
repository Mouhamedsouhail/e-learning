import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  Paper,
  Avatar,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SchoolIcon from "@mui/icons-material/School"; // Student icon
import CastForEducationIcon from "@mui/icons-material/CastForEducation"; // Instructor icon

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default role is student
  });
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "Le nom complet est requis";
        } else if (value.length < 3) {
          error = "Le nom doit contenir au moins 3 caractères";
        }
        break;
      case "email":
        if (!value) {
          error = "L'e-mail est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Veuillez entrer une adresse e-mail valide";
        }
        break;
      case "password":
        if (!value) {
          error = "Le mot de passe est requis";
        } else if (value.length < 6) {
          error = "Le mot de passe doit contenir au moins 6 caractères";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Veuillez confirmer votre mot de passe";
        } else if (value !== formData.password) {
          error = "Les mots de passe ne correspondent pas";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5); // Cap at 5
  };

  const getPasswordStrengthLabel = () => {
    if (!formData.password) return "";
    if (passwordStrength <= 1) return "Faible";
    if (passwordStrength <= 3) return "Modéré";
    return "Fort";
  };

  const getPasswordStrengthColor = () => {
    if (!formData.password) return "grey";
    if (passwordStrength <= 1) return "error";
    if (passwordStrength <= 3) return "warning";
    return "success";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(val));
    }

    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }

    if (name === "password" && formData.confirmPassword) {
      const confirmError =
        val !== formData.confirmPassword
          ? "Les mots de passe ne correspondent pas"
          : "";
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      if (field === "role") return;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (!agreedToTerms) {
      newErrors.terms = "Vous devez accepter les conditions générales.";
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const { name, email, password, role } = formData;
      await register({ name, email, password, role });
      navigate("/login", { state: { fromRegister: true } });
    } catch (err) {
      console.error("Registration error:", err);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "L'inscription a échoué. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créez votre compte
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Rejoignez la communauté académique ISIMM
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nom complet"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
              {formData.password && (
                <Box sx={{ width: "100%", mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(passwordStrength / 5) * 100}
                    color={getPasswordStrengthColor()}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography
                    variant="caption"
                    color={getPasswordStrengthColor() + ".main"}
                    sx={{ display: "block", textAlign: "right" }}
                  >
                    {getPasswordStrengthLabel()}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!fieldErrors.confirmPassword}
                helperText={fieldErrors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel component="legend">Je suis un</FormLabel>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SchoolIcon sx={{ mr: 0.5 }} /> Étudiant
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="instructor"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CastForEducationIcon sx={{ mr: 0.5 }} /> Instructeur
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    name="terms"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    J'accepte les{" "}
                    <Link component={RouterLink} to="/terms" target="_blank">
                      conditions générales
                    </Link>
                  </Typography>
                }
              />
              {fieldErrors.terms && (
                <Typography color="error" variant="caption" display="block">
                  {fieldErrors.terms}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting || !agreedToTerms}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "S'inscrire"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Vous avez déjà un compte? Connectez-vous
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
