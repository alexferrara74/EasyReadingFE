import React, {useState} from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './home';
import { StatusBar } from 'react-native';
import { SummaryScreen } from './summary';
import { LoginScreen } from './login';
import { ProfileScreen } from './user';
import { Stack } from 'expo-router';
import { RegisterScreen } from './register';

export default function Router() {
  return (
    <Stack>
      <Stack.Screen name="/index" options={{ title: 'Index' }} />
      <Stack.Screen name="/user" options={{ title: 'User' }} />
    </Stack>
  );
}