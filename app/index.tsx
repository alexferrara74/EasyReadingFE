import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'react-native';

import { Redirect } from 'expo-router';
import { UserProvider } from '@/scripts/userContext';
import { it, registerTranslation } from 'react-native-paper-dates';

registerTranslation('it',it);

//const Tab = createBottomTabNavigator();
StatusBar.setHidden(true);

export default function App() {
  return (
    <UserProvider>
      <Redirect href={'/(tabs)/home'} />
    </UserProvider>
  );
}
