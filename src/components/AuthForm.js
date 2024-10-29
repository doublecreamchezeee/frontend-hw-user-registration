// src/components/AuthForm.js
import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AuthForm = ({ email, password, setEmail, setPassword, message, handleSubmit }) => {
  return (
    <Box>
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
          Submit
        </Button>
      </form>

      {message && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AuthForm;
