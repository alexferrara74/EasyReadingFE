import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors_green } from '@/constants/Colors';

interface ContainerProps {
    children: React.ReactNode;
}

export function ScreenContainer({children}: ContainerProps) {
    return (
      <View style={styles.Container}>
        {children}
      </View>
    );
}  

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors_green.background
    }
})