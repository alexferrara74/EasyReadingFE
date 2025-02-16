import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user')
          
        
        if(userData){
          setUser(JSON.parse(userData))
        }
          
        
        
      } catch (error) {
        console.error('Errore durante il caricamento dell\'utente:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  },[])

  const loginUser = async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('token', JSON.stringify(userData.token))
    setUser(userData);

  };

  const registerUser = async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    
  };

  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
