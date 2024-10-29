import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Auth setIsLogin={setIsLogin} />} 
        />
        <Route 
          path="/home" 
          element={isLogin ? <Home setIsLogin={setIsLogin}/> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
