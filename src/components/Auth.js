// src/components/Auth.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/${activeTab === 0 ? 'login' : 'register'}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        navigate('/home');
      } else {
        setMessage('Authentication failed. Please try again.');
      }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            padding: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: 3,
          }}
        >
          {/* <Typography variant="h4" gutterBottom align="center" color="primary">
            {activeTab === 0 ? 'Login' : 'Register'}
          </Typography> */}
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              marginBottom: 2,
              '& .MuiTab-root': {
                color: '#ff7e5f',
              },  
              '& .Mui-selected': {
                color: '#feb47b',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#feb47b',
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: '#ff7e5f',
                color: '#fff',
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#feb47b',
                },
              }}
            >
              {activeTab === 0 ? 'Login' : 'Register'}
            </Button>
          </form>

          {message && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Auth;