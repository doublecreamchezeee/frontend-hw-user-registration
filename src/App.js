import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Home from './components/Home';

const PrivateRoute = ({ children }) => {
  const { token, validateToken } = useAuth();
  if (token && !validateToken(token)){
    return <Navigate to="/" />
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { token, validateToken } = useAuth();

  if (token && validateToken(token)) {
    return <Navigate to="/home" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute><Auth /></AuthRoute>}/>
          <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
