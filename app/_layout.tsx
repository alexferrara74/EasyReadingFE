import { StyleSheet, View } from 'react-native';
import { UserProvider } from '@/scripts/userContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="index" options={{ title: 'Index', headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />    
        <Stack.Screen name="summary" options={{ title: 'Summary', headerShown: false }} />   
      </Stack>
    </UserProvider>
  );
}
