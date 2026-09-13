import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('swapbox_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        localStorage.setItem('swapbox_token', token);

        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Session expired or invalid token', err);
          logoutUser();
        }
      } else {
        localStorage.removeItem('swapbox_token');
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const loginUser = async (credentials) => {
    const data = await authService.login(credentials);

    if (data.token) {
      setToken(data.token);
      setUser(data.user || null);

      // Store using the same key Axios expects
      localStorage.setItem('swapbox_token', data.token);
    }

    return data;
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('swapbox_token');
    localStorage.removeItem('swapbox_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};