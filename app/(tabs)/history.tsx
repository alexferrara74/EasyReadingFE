import { ScreenContainer } from '@/components/_screenContainer';
import { UserFile } from '@/components/Userfile';
import { useUser } from '@/scripts/userContext';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { getFilesByUser } from '@/scripts/getUserFiles';
import { useTheme } from '@/scripts/ThemeProvider';

export default function HistoryScreen() {
  const { user } = useUser();
  const { theme } = useTheme();

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
        const result = await getFilesByUser(user);
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
  }, [user.id]); // Dipende solo da `user.id`, quindi verrà eseguito una volta per ogni cambiamento dell'id utente

  return (
    <ScreenContainer>
      <View
        style={[styles.profileHeader, { backgroundColor: theme.header_background, borderBottomColor: theme.accent }]}>
        <Text style={[styles.profileTitle, { color: theme['header-text'] }]}> {user?.username.toUpperCase()} </Text>
        <Avatar.Text style={styles.profilePicture} size={31} label={user.username.substr(0, 2).toUpperCase()} />
      </View>

      <Text style={[styles.historyTitle, { color: theme['header-text'], borderBottomColor: theme['header-text'] }]}>
        STORICO
      </Text>
      <ScrollView>
        {items.length > 0 ? (
          items.map((item, index) => <UserFile key={index} file={item} />)
        ) : (
          <Text style={[styles.noResult, { color: theme['header-text'] }]}>No files available</Text>
        )}
      </ScrollView>
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
    borderBottomWidth: 1,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 'auto',
  },
  historyTitle: {
    margin: 20,
    fontSize: 18,
    marginBottom: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  screenText: {
    fontSize: 24,
  },
  noResult: {
    marginHorizontal: '25%',
    fontSize: 20,
  },
});
