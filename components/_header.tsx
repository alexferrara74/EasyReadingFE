import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors_light_blue } from '@/constants/Colors';
import { useTheme } from '@/scripts/ThemeProvider';

interface HeaderProps{
    mini: string;
    title: string;
}

export function Header({mini, title} : HeaderProps) {
    const { theme, updateTheme } = useTheme();
    return (
        <View style={[styles.header, {backgroundColor: theme.header_background, borderBottomColor: theme.accent}]}>
            <Text style={[styles.headerMiniTitle, {color: theme['header-text']}]}>{mini}</Text>
            <Text style={[styles.headerTitle, {color: theme['header-text']}]}>{title}</Text>
        </View>
    );
}  

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    headerMiniTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    headerTitle:{
        fontSize: 32,
        fontWeight: 'bold',
    },
})