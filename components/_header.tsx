import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors_green } from '@/constants/Colors';

interface HeaderProps{
    mini: string;
    title: string;
}

export function Header({mini, title} : HeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerMiniTitle}>{mini}</Text>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}  

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        backgroundColor: colors_green.header_background,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors_green.accent
    },
    headerMiniTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors_green['text-light']
    },
    headerTitle:{
        fontSize: 32,
        fontWeight: 'bold',
        color: colors_green['text-light']
    },
})