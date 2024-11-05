import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  const validateToken = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/profile?email=${localStorage.getItem('email')}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);
  const contextValue = useMemo(
    () => ({
        token,
        setToken,
        validateToken,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
