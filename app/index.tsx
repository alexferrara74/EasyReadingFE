import React, {useState} from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './home';
import { StatusBar } from 'react-native';
import { SummaryScreen } from './summary';
import { LoginScreen } from './login';
import { ProfileScreen } from './user';
import { Link, Stack } from 'expo-router';
import { RegisterScreen } from './register';

const Tab = createBottomTabNavigator();
StatusBar.setHidden(true);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Link href={"/user"}>Premi qui se sei gay</Link>
  );
}