import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Example icon
import AccountCircle from "@mui/icons-material/AccountCircle"; // Example icon

const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  const commonPages = [
    { name: "Accueil", path: "/" }, // Changed "Home" to "Accueil"
    { name: "Cours", path: "/courses" }, // Changed "Courses" to "Cours"
  ];

  const userPages = [
    { name: "Tableau de Bord", path: "/dashboard" }, // Changed "Dashboard" to "Tableau de Bord"
    // Add other user-specific pages if needed
  ];
  const adminPages = [
    { name: "Utilisateurs", path: "/admin/users" }, // Changed "Users" to "Utilisateurs"
    // Add other admin-specific pages if needed
  ];

  const profilePage = { name: "Profil", path: "/profile" }; // Changed "Profile" to "Profil"

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo/Brand */}
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace", // Example styling
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          ISIMM Academy
        </Typography>

        {/* Mobile Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {commonPages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to={page.path}
              >
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
            {isAuthenticated &&
              userPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            {isAuthenticated &&
              currentUser?.role === "admin" &&
              adminPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
          </Menu>
        </Box>

        {/* Desktop Logo (appears when mobile menu is shown) */}
        <Typography
          variant="h5"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          ISIMM Academy
        </Typography>

        {/* Desktop Menu Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {commonPages.map((page) => (
            <Button
              key={page.name}
              component={RouterLink}
              to={page.path}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          ))}
          {isAuthenticated &&
            userPages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          {isAuthenticated &&
            currentUser?.role === "admin" &&
            adminPages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
        </Box>

        {/* Auth Buttons / User Menu */}
        <Box sx={{ flexGrow: 0 }}>
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white" }} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={RouterLink}
                  to={profilePage.path}
                >
                  <Typography textAlign="center">{profilePage.name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Déconnexion</Typography>{" "}
                  {/* Changed "Logout" to "Déconnexion" */}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Connexion {/* Changed "Login" to "Connexion" */}
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Inscription {/* Changed "Register" to "Inscription" */}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
