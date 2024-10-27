// src/components/Home.js
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to the Home Page
      </Typography>
    </Container>
  );
};

export default Home;
