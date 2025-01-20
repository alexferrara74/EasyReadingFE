import { ScreenContainer } from '@/components/_screenContainer';
import { useNavigation } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { login } from '../scripts/login';
import { UserContext } from '../scripts/userContext';
import { useTheme } from '@/scripts/ThemeProvider';

export default function LoginScreen() {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);

  function logInAndRedirect() {
    login(email, password, loginUser);
    // @ts-ignore
    navigation.navigate('index');
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
          style={[styles.backButton, { borderColor: theme.accent }]}
          iconColor={theme.accent}
          // @ts-ignore
          onPress={() => navigation.navigate('index')}
        />
      </View>
      <View style={styles.forms}>
        <TextInput
          placeholder='Email'
          placeholderTextColor={theme.accent}
          mode='outlined'
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.textInput, { backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
          textColor={theme['header-text']}
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
          textColor={theme['header-text']}
        />

        <Button
          mode='contained'
          onPress={() => logInAndRedirect()}
          buttonColor={theme.accent}
          style={styles.buttonForm}>
          Accedi
        </Button>
        <Button
          mode='contained'
          // @ts-ignore
          onPress={() => navigation.navigate('register')}
          buttonColor='gray'
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
