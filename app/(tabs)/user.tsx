import { ScreenContainer } from '@/components/_screenContainer';
<<<<<<< HEAD
import { colors_light_blue } from '@/constants/Colors';
import {  useUser } from '@/scripts/userContext';
import { Link } from 'expo-router';
=======
import { useUser } from '@/scripts/userContext';
import { Link, Redirect, useNavigation } from 'expo-router';
>>>>>>> f7a37ea (session fixed and routes auth)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Avatar, Button } from 'react-native-paper'

export default function ProfileScreen() {
    const { user, logout } = useUser();

    if(!user){
        return <Redirect href={'/login'}></Redirect>
    }
    const userFirstLetters = user.username.substr(0,2)
    return (
        <ScreenContainer>
            <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}> {user?.username.toUpperCase()} </Text>
                <Avatar.Text style={styles.profilePicture} size={31} label={userFirstLetters.toUpperCase()}/>
            </View>
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>STORICO</Text>
                <TouchableOpacity style={styles.historyItem}>
                    <Text style={styles.historyText}>Conversazione_1</Text>
                    <Icon source="file-eye-outline" size={25} color="#00000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyItem}>
                    <Text style={styles.historyText}>Conversazione_2</Text>
                    <Icon source="file-eye-outline" size={25} color="00000" />
                </TouchableOpacity>
            </View>
            <View style={styles.logoutSection}>
                <Button onPress={()=>logout()} style={styles.logoutButton} buttonColor='#525252' textColor='white'> LOGOUT </Button>
            </View>
            
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors_light_blue.header_background,
        borderBottomWidth: 1,
        borderBottomColor: colors_light_blue.accent
    },
    profileTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors_light_blue['text-dark'],
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
        color: colors_light_blue['text-dark'],
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
        color: colors_light_blue['text-dark'],
    },
    screenText: {
        fontSize: 24,
        color: colors_light_blue['text-dark'],
    },
    logoutButton:{
        marginTop: 100,
        width: '50%'
    },
    logoutSection:{
        alignItems: 'center'
    }
});