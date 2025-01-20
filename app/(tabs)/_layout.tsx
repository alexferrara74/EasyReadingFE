import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';
import { useTheme } from '@/scripts/ThemeProvider';

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon source={'home'} size={30} color={color} />,
          tabBarStyle: {
            backgroundColor: theme.accent,
            width: '90%',
            borderRadius: 10,
            marginHorizontal: 'auto',
            position: 'absolute',
            marginLeft: '5%',
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: theme['text-light'],
          tabBarInactiveTintColor: theme['text-dark'],
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon source={'history'} size={30} color={color} />,
          tabBarStyle: {
            backgroundColor: theme.accent,
            width: '90%',
            borderRadius: 10,
            marginHorizontal: 'auto',
            position: 'absolute',
            marginLeft: '5%',
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: theme['text-light'],
          tabBarInactiveTintColor: theme['text-dark'],
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name='user'
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon source={'badge-account-horizontal'} size={size} color={color} />,
          tabBarStyle: {
            backgroundColor: theme.accent,
            width: '90%',
            borderRadius: 10,
            marginHorizontal: 'auto',
            position: 'absolute',
            marginLeft: '5%',
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: theme['text-light'],
          tabBarInactiveTintColor: theme['text-dark'],
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
