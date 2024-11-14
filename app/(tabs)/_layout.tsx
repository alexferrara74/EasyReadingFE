
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{headerShown: false}} />
        <Tabs.Screen name="summary" options={{headerShown: false}}/>
        <Tabs.Screen name="user" options={{headerShown: false}}/>
    </Tabs>
  );
}
