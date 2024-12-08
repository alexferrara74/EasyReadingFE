import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';
import { colors_green, colors_light_blue } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="home" 
          options={{headerShown: false, 
          tabBarIcon: ({ color, size }) => 
          (
            <Icon source={"home"} size={size} color={color}/>
          ), 
          tabBarStyle: 
          { 
            backgroundColor: colors_light_blue.accent,
            width: '95%',
            borderRadius: 10,
            marginHorizontal: 'auto',
            position: 'absolute',
            bottom: 15, left: 10,
            borderTopColor: 'transparent'
          },
          tabBarActiveTintColor: colors_green['text-light'],
          tabBarInactiveTintColor: colors_green['text-dark'],
          tabBarShowLabel: false
          }}/>
        <Tabs.Screen name="user"
          options={{headerShown: false, 
          tabBarIcon: ({ color, size }) => 
          (
            <Icon source={"badge-account-horizontal"} size={size} color={color}/>
          ),
          tabBarStyle: 
          { 
            backgroundColor: colors_light_blue.accent,
            width: '95%',
            borderRadius: 10,
            marginHorizontal: 'auto',
            position: 'absolute',
            bottom: 15, left: 10,
            borderTopColor: 'transparent'
          },
          tabBarActiveTintColor: colors_green['text-light'],
          tabBarInactiveTintColor: colors_green['text-dark'],
          tabBarShowLabel: false}} />
    </Tabs>
  );
}
