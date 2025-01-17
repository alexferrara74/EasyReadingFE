import { ScreenContainer } from '@/components/_screenContainer';
import { colors_blue, colors_light_blue, colors_red } from '@/constants/Colors';
import { useUser } from '@/scripts/userContext';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/scripts/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { getFilesByUser } from '@/scripts/getUserFiles';

export default function UserScreen() {
  const { theme, updateTheme } = useTheme();
  const { user, logout } = useUser();

  const navigation = useNavigation();

  // Se `user` non è disponibile, reindirizza alla pagina di login
  if (!user) {
    return <Redirect href={'/login'}></Redirect>;
  }

  return (
    <ScreenContainer>
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
          <Text style={[styles.profileTitle, { color: theme['header-text'] }]}> {user?.username.toUpperCase()} </Text>
        </View>
      </View>
      <View style={styles.themeContainer}>
        <LinearGradient
          style={styles.themeGradient}
          locations={[0, 0.5, 1]}
          colors={['#232725', '#007aff']}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 1.2, y: 0.9 }}>
          <Button
            style={[styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]}
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
            style={[styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]}
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
            style={[styles.themeButton, { borderWidth: 0.1, borderColor: theme['header-text'] }]}
            onPress={() => {
              updateTheme(colors_red);
            }}
            buttonColor='#525252'>
            <View style={styles.themeButton}></View>
          </Button>
        </LinearGradient>
      </View>

      <View style={styles.logoutSection}>
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
  themeContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    flexWrap: 'wrap',
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
  logoutSection: {
    marginTop: 50,
    alignItems: 'center',
  },
});
