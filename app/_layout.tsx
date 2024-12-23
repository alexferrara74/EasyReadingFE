import { StyleSheet, View } from 'react-native';
import { UserProvider } from '@/scripts/userContext';
import { Stack } from 'expo-router';
import ThemeProvider from '@/scripts/ThemeProvider'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
          <Stack.Screen name="index" options={{ title: 'Index', headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />    
          <Stack.Screen name="summary" options={{ title: 'Summary', headerShown: false }} />   
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}
