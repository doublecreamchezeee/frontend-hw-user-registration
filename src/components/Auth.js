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
    setMessage(''); // Clear message on tab change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/${activeTab === 0 ? 'login' : 'register'}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        // Đăng nhập thành công, chuyển hướng đến trang Home
        navigate('/home');
      } else {
        // Xử lý lỗi đăng nhập
        alert('Login failed');
      }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {activeTab === 0 ? 'Login' : 'Register'}
        </Typography>
        
        <Tabs value={activeTab} onChange={handleTabChange} centered>
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {activeTab === 0 ? 'Login' : 'Register'}
          </Button>
        </form>

        {message && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Auth;
