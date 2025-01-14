import { ScreenContainer } from '@/components/_screenContainer';
import { UserFile } from '@/components/Userfile';
import { colors_light_blue } from '@/constants/Colors';
import { useUser } from '@/scripts/userContext';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { getFilesByUser } from '@/scripts/getUserFiles';

export default function ProfileScreen() {
    const { user, logout } = useUser();

    // Definire FileData con tipi specifici per evitare errori di tipo
    interface FileData {
        nameFile?: string;
        riassunto?: string;
        timeStamp?: string;
    }

    // Se `user` non è disponibile, reindirizza alla pagina di login
    if (!user) {
        return <Redirect href={'/login'}></Redirect>;
    }

    // Definisci lo stato `items` come array vuoto
    const [items, setItems] = useState<FileData[]>([]);

    // Esegui la chiamata API quando il componente viene montato
    useEffect(() => {
        const getFiles = async () => {
            try {
                const result = await getFilesByUser(user.id);
                // Controlla se `result` è un array e aggiorna `items`
                if (Array.isArray(result)) {
                    setItems(result);
                } else {
                    console.error('Risultato non è un array:', result);
                }
            } catch (e) {
                console.log(e);
            }
        };

        // Chiamata alla funzione asincrona dentro useEffect
        getFiles();
    }, [user.id]); // Dipende solo da `user._id`, quindi verrà eseguito una volta per ogni cambiamento dell'id utente

    return (
        <ScreenContainer>
            <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}> {user?.username.toUpperCase()} </Text>
                <Avatar.Text style={styles.profilePicture} size={31} label={user.username.substr(0, 2).toUpperCase()} />
            </View>

            <Text style={styles.historyTitle}>STORICO</Text>
            <ScrollView>
                
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <UserFile key={index} file={item} />
                    ))
                ) : (
                    <Text>No files available</Text>
                )}
            </ScrollView>
            <View style={styles.logoutSection}>
                <Button onPress={() => logout()} style={styles.logoutButton} buttonColor='#525252' textColor='white'>
                    LOGOUT
                </Button>
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
        borderBottomColor: colors_light_blue.accent,
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
    historyTitle: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
        color: colors_light_blue['text-dark'],
        marginBottom: 10,
        paddingBottom: 5,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff7a',
    },
    screenText: {
        fontSize: 24,
        color: colors_light_blue['text-dark'],
    },
    logoutButton: {
        marginTop: 100,
        width: '50%',
    },
    logoutSection: {
        alignItems: 'center',
    },
});
