import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/scripts/userContext';

interface AuthContextType {
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    checkTokenOnStartup();
    const interval = setInterval(() => {
      console.log('Controllo periodico del token...');
      checkTokenExpiration();
    }, 5 * 60 * 1000); // Ogni 5 minuti

    return () => clearInterval(interval); // Pulisce il timer quando il componente si smonta
  }, []);

  const checkTokenOnStartup = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      checkTokenExpiration();
    }
  };

  const checkTokenExpiration = async () => {
    if (!token) {
      logout();
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const expTime = decoded.exp * 1000;
      const currentTime = Date.now();

      if (expTime <= currentTime) {
        console.log('Token scaduto!');
        setToken(null);
        await AsyncStorage.removeItem('token');
        logout();
      }
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      setToken(null);
      await AsyncStorage.removeItem('token');
      logout();
    }
  };

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
