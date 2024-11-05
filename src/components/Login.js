// src/components/Login.js
import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.data.token);
        localStorage.setItem('email', email);
        enqueueSnackbar('Login successful', {variant: 'success'})
        navigate('/');
      } else {
        enqueueSnackbar(`${data.message}`, {variant: 'error'})
        setMessage(data.message || 'Authentication failed');
      }
    } catch (error) {
      enqueueSnackbar(`An error occurred. Please try again.`, {variant: 'error'})
      setMessage('An error occurred. Please try again.');
      console.error(error);
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
          <Typography variant="h5" align="center" color="#ff7e5f" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {message && (
              <Typography color="error" align="center" margin="normal">
                {message}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
