import { ScreenContainer } from '@/components/_screenContainer';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { register } from '../scripts/register';
import { UserContext } from '../scripts/userContext';
import { useNavigation } from 'expo-router';
import { colors_light_blue } from '@/constants/Colors';
import { useTheme } from '@/scripts/ThemeProvider';
import { DatePickerInput } from 'react-native-paper-dates';
import Constants from 'expo-constants';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthDate] = useState(new Date());
  const navigator = useNavigation();
  const { registerUser } = useContext(UserContext);

  function registerUserAndRedirect() {
    register(email, password, username, calculateBdDate(), registerUser);
    //@ts-ignore
    navigator.navigate('login');
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
      <View style={styles.homeHeader}>
        <IconButton
          mode='outlined'
          icon={'arrow-left-thick'}
          style={styles.backButton}
          // @ts-ignore
          onPress={() => navigator.navigate('index')}
        />
      </View>
      <View style={styles.forms}>
        <TextInput
          placeholder='Username'
          mode='outlined'
          value={username}
          onChangeText={(username) => setUsername(username)}
          style={styles.textInput}
          activeOutlineColor={'#e5383b'}
        />
        <TextInput
          placeholder='Email'
          mode='outlined'
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
          activeOutlineColor={'#e5383b'}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          mode='outlined'
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
          activeOutlineColor={'#e5383b'}
        />
        <View style={styles.textInput}>
          <DatePickerInput
            locale='it'
            label='Data di nascita'
            value={birthdate}
            //@ts-ignore
            onChange={(d) => setBirthDate(d)}
            inputMode='start'
            style={styles.datePick}
            mode='outlined'
          />
        </View>
        <Button
          mode='contained'
          onPress={() => registerUserAndRedirect()}
          buttonColor='#e5383b'
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
    borderRadius: 9,
  },

  datePick: {
    width: '30%',
    marginBottom: 50,
  },
});
