// src/components/Auth.js
import React, { useState } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm'; // Import the AuthForm component

const Auth = ({ setIsLogin }) => {
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
    let message = "";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Set mode to 'cors' for cross-origin requests
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLogin(true);
        navigate('/home');
      } else {
        const errorData = await response.json();
        console.log("Error: " + errorData.message);
        if (!errorData.data) {
          message = errorData.message;
        } else {
          message = errorData.message + ": " + errorData.data.message; 
        }
        setMessage(message);
      }
    } catch (error) {
      setMessage("Validate error");
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

          <AuthForm 
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            message={message}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Auth;
