import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

const PrivateRoute = ({ children }) => {
  const { token, validateToken } = useAuth();
  console.log(token);
  console.log(validateToken(token))
  if (!token || !validateToken(token)){
    return <Navigate to="/login" />
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { token, validateToken } = useAuth();

  if (token && validateToken(token)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<AuthRoute><Register /></AuthRoute>}/>
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
