import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { register } from '../scripts/register';
import { UserContext } from '../scripts/userContext';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/scripts/ThemeProvider';
import { DatePickerInput } from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import { ScreenContainer } from '@/components/_screenContainer';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthDate] = useState(new Date());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigator = useNavigation();
  const { registerUser } = useContext(UserContext);
  const { theme } = useTheme();

  useEffect(() => {
    validateFields();
  }, [email, username, password]);

  function validateFields() {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }

  async function registerUserAndRedirect() {
    const res = await register(email, password, username, calculateBdDate(), registerUser);
    if (res?.success === true) {
      //@ts-ignore
      navigator.navigate('login', { showToast: true, type: 'success', message: res.message });
    } else if (res?.success === false) {
      //@ts-ignore
      navigator.navigate('login', { showToast: true, type: 'error', message: res.message });
    }
  }

  function addOpacityToColor(color: string, opacity: number) {
    const opacityHex = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0');
    return `${color}${opacityHex}`;
  }

  function calculateBdDate(): Number {
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();

    const birthdayThisYear = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());

    if (today < birthdayThisYear) {
      age -= 1;
    }
    return age;
  }

  return (
    <ScreenContainer>
      <View style={[styles.homeHeader, { backgroundColor: theme.header_background }]}>
        <IconButton
          mode='outlined'
          iconColor={theme.accent}
          icon={'arrow-left-thick'}
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
          style={[styles.textInput, { borderColor: theme.accent, backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
          textColor={theme['header-text']}
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor={theme.accent}
          mode='outlined'
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.textInput, { borderColor: theme.accent, backgroundColor: theme.background }]}
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
          style={[styles.textInput, { borderColor: theme.accent, backgroundColor: theme.background }]}
          activeOutlineColor={theme.accent}
          textColor={theme['header-text']}
        />
        <View style={styles.datePick}>
          <DatePickerInput
            theme={{
              colors: {
                surface: theme.accent,
                onSurface: theme['header-text'],
                onSurfaceVariant: theme['header-text'],
              },
            }}
            locale='it'
            label='Data di nascita'
            value={birthdate}
            activeOutlineColor={theme.accent}
            //@ts-ignore
            onChange={(d) => setBirthDate(d)}
            inputMode='start'
            iconColor={theme.accent}
            style={[styles.datePick, { borderColor: theme.accent, backgroundColor: theme.background }]}
            mode='outlined'
          />
        </View>
        <Button
          
          onPress={registerUserAndRedirect}
          buttonColor='#e5383b'
          textColor={theme['header-text']}
          style={[
            styles.button,
            { backgroundColor: isButtonDisabled ? addOpacityToColor(theme.accent, 0.5) : theme.accent },
          ]}
          contentStyle={styles.content}
          disabled={isButtonDisabled}>
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

  button: {
    width: '70%',
    marginBottom: '10%',
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

  datePick: {
    width: '70%',
    marginBottom: '10%',
    marginTop: '7%',
  },
  content: {
    height: 50,
    justifyContent: 'center',
  },
});
