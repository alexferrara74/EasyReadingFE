import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors_light_blue } from '@/constants/Colors';

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
        backgroundColor: colors_light_blue.header_background,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors_light_blue.accent
    },
    headerMiniTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors_light_blue['text-dark']
    },
    headerTitle:{
        fontSize: 32,
        fontWeight: 'bold',
        color: colors_light_blue['text-dark']
    },
})