import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors_light_blue } from '@/constants/Colors';
import { useTheme } from '@/scripts/ThemeProvider';

interface ContainerProps {
    children: React.ReactNode;
}

export function ScreenContainer({children}: ContainerProps) {
  const { theme, updateTheme } = useTheme();
    return (
      <View style={[styles.Container, {backgroundColor: theme.background}]}>
        {children}
      </View>
    );
}  

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    }
})