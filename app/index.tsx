import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'react-native';

import { Redirect } from 'expo-router';
import { UserProvider } from '@/scripts/userContext';

const Tab = createBottomTabNavigator();
StatusBar.setHidden(true);

export default function App() {
  return (
    <UserProvider>
      <Redirect href={"/(tabs)/home"} />
    </UserProvider>
  );
}