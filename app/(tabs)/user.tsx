import { ScreenContainer } from '@/components/_screenContainer';
import { colors_blue, colors_light_blue, colors_red } from '@/constants/Colors';
import { useUser } from '@/scripts/userContext';
import { sendChangePasswordRequest } from '@/scripts/changePasswordRequest';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/scripts/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { getFilesByUser } from '@/scripts/getUserFiles';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';

export default function UserScreen() {
  const { theme, updateTheme } = useTheme();
  const { user, logout } = useUser();
  const activeTheme = theme.themeMode;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Se `user` non è disponibile, reindirizza alla pagina di login
  if (!user) {
    return <Redirect href={'/login'}></Redirect>;
  }

  return (
    <ScreenContainer>
      <ChangePasswordModal modal={modalVisible} setModalVisible={setModalVisible} user={user} />
      <View
        style={[styles.profileHeader, { backgroundColor: theme.header_background, borderBottomColor: theme.accent }]}>
        <IconButton
          mode='outlined'
          icon={'arrow-left-thick'}
          iconColor={theme.accent}
          style={[styles.backButton, { borderColor: theme.accent }]}
          // @ts-ignore
          onPress={() => navigation.navigate('index')}
        />
        <View style={styles.userContainer}>
          <Avatar.Text
            style={[styles.profilePicture, { borderColor: theme.accent }]}
            size={61}
            label={user.username.substr(0, 2).toUpperCase()}
          />
          <Text style={[styles.profileTitle, { color: theme['header-text'], marginHorizontal: 'auto' }]}>
            {user?.username.toUpperCase()}{' '}
          </Text>
        </View>
      </View>
      <Text style={[styles.themeText, { color: theme['header-text'], position: 'absolute', top: '26%', left: '3%' }]}>
        Scegli il tema dell'applicazione:
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.themeContainer}
        contentContainerStyle={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 30,
        }}>
        <LinearGradient
          style={styles.themeGradient}
          locations={[0, 0.5, 1]}
          colors={['#232725', '#007aff']}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 1.2, y: 0.9 }}>
          <Button
            style={
              activeTheme === 'dark_blue'
                ? [styles.themeButton, { borderWidth: 2, borderColor: theme.accent }]
                : [styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]
            }
            onPress={() => {
              updateTheme(colors_blue);
            }}
            buttonColor='#525252'>
            <View style={styles.themeButton}></View>
          </Button>
        </LinearGradient>
        <LinearGradient
          style={styles.themeGradient}
          locations={[0, 0.5, 1]}
          colors={['#ffff', '#007aff']}
          start={{ x: 0.4, y: 0.5 }}
          end={{ x: 1.5, y: 1 }}>
          <Button
            style={
              activeTheme === 'default'
                ? [styles.themeButton, { borderWidth: 2, borderColor: theme.accent }]
                : [styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]
            }
            onPress={() => {
              updateTheme(colors_light_blue);
            }}
            buttonColor='#525252'>
            <View style={styles.themeButton}></View>
          </Button>
        </LinearGradient>
        <LinearGradient
          style={styles.themeGradient}
          locations={[0, 0.5, 1]}
          colors={['#232725', '#e5383b']}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 1.2, y: 0.9 }}>
          <Button
            style={
              activeTheme === 'dark_red'
                ? [styles.themeButton, { borderWidth: 2, borderColor: theme.accent }]
                : [styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]
            }
            onPress={() => {
              updateTheme(colors_red);
            }}
            buttonColor='#525252'>
            <View style={styles.themeButton}></View>
          </Button>
        </LinearGradient>
      </ScrollView>

      <View style={styles.buttonSection}>
        <Button
          onPress={async () => {
            const res = await sendChangePasswordRequest(user.email);
            setModalVisible(true);
           console.log('Errore nella send della mail');
          }}
          style={[
            styles.logoutButton,
            { borderWidth: 0.7, borderColor: theme.accent, backgroundColor: theme.background },
          ]}
          buttonColor='#525252'
          textColor='white'>
          <Text style={[styles.textButton, { color: theme.accent }]}>Cambia password</Text>
        </Button>
        <Button
          onPress={() => logout()}
          style={[styles.logoutButton, { backgroundColor: theme.accent }]}
          buttonColor='#525252'
          textColor='white'>
          <Text style={[styles.textButton, { color: theme['text-light'] }]}>LogOut</Text>
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  themeText: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  themeContainer: {
    maxHeight: 250,
    marginTop: '27%',
  },
  profileHeader: {
    paddingTop: 110,
    borderBottomWidth: 1,
  },
  backButton: {
    borderRadius: 20,
    position: 'absolute',
    top: 25,
    left: 25,
  },
  userContainer: {
    position: 'absolute',
    top: 60,
    left: '38%',
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  themeGradient: {
    overflow: 'hidden',
    borderRadius: '100%',
  },
  themeButton: {
    borderRadius: '100%',
    width: 120,
    height: 120,
    backgroundColor: 'transparent',
  },
  logoutButton: {
    paddingHorizontal: 20,
  },
  textButton: {
    fontSize: 17,
  },
  buttonSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
});
