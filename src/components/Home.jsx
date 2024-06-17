// src/components/Home.js
import React, {useContext} from 'react';
import NavBar from './NavBar';
import AuthContext from '../contexts/AuthContext';
import { Box, Typography, Container } from '@mui/material';

const Home = ({ children }) => {
  const { user } = useContext(AuthContext);

    return (
      <Box>
      <NavBar />
      <Container>
        <Typography variant="h3" component="h1" sx={{ marginTop: 4 }}>
          Welcome, {user.name}
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          {children}
        </Box>
      </Container>
    </Box>
    );
};

export default Home;
