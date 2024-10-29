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
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    navigate('/');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ff4e5f, #feb479)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        position: 'relative',
      }}
    >
      <Button
        onClick={handleLogout}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#fff',
          textTransform: 'none',
        }}
      >
        Logout
      </Button>

      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom align="center">
          Welcome to the Home Page
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Discover new features and exciting updates. Dive into a world of endless possibilities!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            marginY: 4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#ff7e4f',
              '&:hover': {
                backgroundColor: '#feb47b',
              },
            }}
          >
            Learn More
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: '#fff',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Contact Us
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 2,
          }}
        >
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              sx={{
                minWidth: 200,
                maxWidth: 300,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Feature {item}
                </Typography>
                <Typography variant="body2">
                  Discover our new feature that will help you in many ways.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
