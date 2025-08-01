import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin,setIsLogin] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
