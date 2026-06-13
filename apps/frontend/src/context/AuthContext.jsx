import { API_URL } from '../config/api';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage for token on mount
    const storedUserInfo = sessionStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUser(parsedInfo);
      setToken(parsedInfo.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        setToken(data.token);
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Server error. Please try again later.' };
    }
  };

  const passwordlessLogin = async (name, email, locationStr) => {
    try {
      // Try to register the user first with a dummy password
      await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name || email.split('@')[0], 
          email, 
          password: 'nopasswordneeded', 
          role: 'customer',
          location: locationStr || ''
        })
      });
      
      // Log them in using the dummy password
      return await login(email, 'nopasswordneeded');
    } catch (err) {
      return { success: false, message: 'Sign In failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('userInfo');
    localStorage.removeItem('userInfo'); // clear old localStorage if it exists
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, passwordlessLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
