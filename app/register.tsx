import { ScreenContainer } from '@/components/_screenContainer';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { register } from '../scripts/register';
import { UserContext } from '../scripts/userContext';
import { useNavigation } from 'expo-router';
import { colors_light_blue } from '@/constants/Colors';
import { useTheme } from '@/scripts/ThemeProvider';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigation();
  const { registerUser } = useContext(UserContext);
  const { theme } = useTheme();

  function registerUserAndRedirect() {
    register(email, password, username, registerUser);
    // @ts-ignore
    navigator.navigate('index');
  }

  return (
    <ScreenContainer>
      <View
        style={[
          styles.homeHeader,
          { backgroundColor: theme.header_background, borderBottomColor: theme.accent, borderBottomWidth: 0.5 },
        ]}>
        <IconButton
          mode='outlined'
          icon={'arrow-left-thick'}
          iconColor={theme.accent}
          style={[styles.backButton, { borderColor: theme.accent }]}
          // @ts-ignore
          onPress={() => navigator.navigate('index')}
        />
      </View>
      <View style={styles.forms}>
        <TextInput
          placeholder='Username'
          placeholderTextColor={theme.accent}
          mode='outlined'
          value={username}
          onChangeText={(username) => setUsername(username)}
          style={[styles.textInput, { backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor={theme.accent}
          mode='outlined'
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.textInput, { backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={theme.accent}
          secureTextEntry={true}
          mode='outlined'
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={[styles.textInput, { backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
        />

        <Button
          mode='contained'
          onPress={() => registerUserAndRedirect()}
          buttonColor={theme.accent}
          style={styles.buttonForm}>
          Registrati
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '70%',
    marginBottom: '10%',
  },

  buttonForm: {
    marginBottom: '10%',
    width: '70%',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  homeHeader: {
    paddingTop: 100,
    backgroundColor: colors_light_blue.header_background,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  forms: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    borderColor: '#161d19',
    borderRadius: 20,
  },
});
