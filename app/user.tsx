import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon, Avatar } from 'react-native-paper'

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen name="user" options={{title: "user"}}></Stack.Screen>
            <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}>Profilo</Text>
                <Avatar.Text style={styles.profilePicture} size={31} label='ER'/>
            </View>
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>STORICO</Text>
                <TouchableOpacity style={styles.historyItem}>
                    <Text style={styles.historyText}>Conversazione_1</Text>
                    <Icon source="arrow-right-thin" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyItem}>
                    <Text style={styles.historyText}>Conversazione_2</Text>
                    <Icon source="arrow-right-thin" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232725',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#161d19'
    },
    profileTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50, 
        marginLeft: 'auto',
    },
    historyContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    historyTitle: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
        paddingBottom: 5,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff7a'
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    historyText: {
        fontSize: 16,
        color: '#FFF',
    },
    screenText: {
        fontSize: 24,
        color: '#FFF',
    },
});