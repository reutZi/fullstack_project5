// src/components/NavBar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
    const { logout } = useContext(AuthContext);

    return (
      <AppBar position="static">
      <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
              <Button
                  component={NavLink}
                  to="/home"
                  color="inherit"
                  sx={{ marginRight: 2 }}
              >
                  Home
              </Button>
              <Button
                  component={NavLink}
                  to="/todos"
                  color="inherit"
                  sx={{ marginRight: 2 }}
              >
                  Todos
              </Button>
              <Button
                  component={NavLink}
                  to="/posts"
                  color="inherit"
                  sx={{ marginRight: 2 }}
              >
                  Posts
              </Button>
              <Button
                  component={NavLink}
                  to="/albums"
                  color="inherit"
                  sx={{ marginRight: 2 }}
              >
                  Albums
              </Button>
              <Button
                  component={NavLink}
                  to="/info"
                  color="inherit"
                  sx={{ marginRight: 2 }}
              >
                  Info
              </Button>
          </Box>
          <Button color="inherit" onClick={logout}>
              Logout
          </Button>
      </Toolbar>
  </AppBar>
    );
};

export default NavBar;
