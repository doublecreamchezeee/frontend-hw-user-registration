import React, { useState } from 'react';
import { Container, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();
  
  // console.log('token from storage: ',localStorage.getItem('token'))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 0 ? 'login' : 'register';
    setMessage('');
  
    await authenticateUser(endpoint);
  };
  
  const authenticateUser = async (endpoint) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('response data: ', data);
        
        if (endpoint === 'login') {
          console.log('token', data.data.token);
          localStorage.setItem('email', email)
          setToken(data.data.token);
          navigate('/home');
        } else {
          navigate('/');
        }
      } else {
        setMessage(data.message || 'Authentication failed');
      }
    } catch (error) {
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
