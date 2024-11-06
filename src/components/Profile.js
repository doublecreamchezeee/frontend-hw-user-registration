import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const userEmail = localStorage.getItem('email');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile?email=${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchData();
  }, [navigate]);

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
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom align="center">
          Profile
        </Typography>
        {userData ? (
          <Card
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              marginBottom: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Information
              </Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              {/* Display additional user details here */}
              <Typography variant="body1">Joined: {new Date(userData.createdAt).toLocaleDateString()}</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography align="center">Loading...</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: 'block',
            margin: '0 auto',
            backgroundColor: '#ff7e4f',
            '&:hover': {
              backgroundColor: '#feb47b',
            },
          }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default Profile;