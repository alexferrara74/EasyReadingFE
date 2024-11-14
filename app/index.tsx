import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'react-native';

import { Redirect } from 'expo-router';

const Tab = createBottomTabNavigator();
StatusBar.setHidden(true);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
     
    <Redirect href={"/(tabs)/home"} />
     
  );
}