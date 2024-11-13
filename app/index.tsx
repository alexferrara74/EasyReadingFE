import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './home';
import { StatusBar } from 'react-native';
import { SummaryScreen } from './summary';
import { LoginScreen } from './login';

const Tab = createBottomTabNavigator();
StatusBar.setHidden(true);

export default function App() {
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconSource;
            if (route.name === 'Home') {
              iconSource = require('../assets/images/home.png');
            } else if (route.name === 'Profile') {
              iconSource = require('../assets/images/user.png');
            } else if (route.name === 'History') {
              iconSource = require('../assets/images/chatbot.png');
            }
            return (
              <Image
                source={iconSource}
                style={{ width: size, height: size, tintColor: color }}
              />
            );},
              tabBarActiveTintColor: '#e5383b',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: { backgroundColor: '#1a1a1a' },
              headerShown: false,
            })}
          >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Summary" component={SummaryScreen} />
          <Tab.Screen name="Profile" component={LoginScreen} />
        </Tab.Navigator>
        </NavigationContainer>
  );
}