
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/app/login';
import { RegisterScreen } from '@/app/register';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}