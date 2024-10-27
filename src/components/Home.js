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
      <Typography variant="body1" gutterBottom>
        Please choose an option to continue:
      </Typography>
      
      <Box display="flex" justifyContent="space-around" marginTop={4}>
        {/* Login Form Box */}
        <Card variant="outlined" sx={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              fullWidth
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>

        {/* Register Form Box */}
        <Card variant="outlined" sx={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              fullWidth
            >
              Go to Register
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
