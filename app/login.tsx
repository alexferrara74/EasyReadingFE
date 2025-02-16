import { ScreenContainer } from '@/components/_screenContainer';
import { useNavigation } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { login } from '../scripts/login';
import { UserContext } from '../scripts/userContext';
import { useTheme } from '@/scripts/ThemeProvider';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import createToastConfig from '@/constants/ToastConfig';

export default function LoginScreen() {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);
  const route = useRoute();

  // @ts-ignore
  const showToast = route?.params;

  async function logInAndRedirect() {
    const log = await login(email, password, loginUser);
    if (log?.success === true) {
      // @ts-ignore
      navigation.navigate('(tabs)', { screen: 'home', params: { showToast: true, type: 'success' } });
    } else if (log?.success === false) {
      // @ts-ignore
      navigation.navigate('(tabs)', { screen: 'home', params: { showToast: true, type: 'error' } });
    }
  }

  useEffect(() => {
    // @ts-ignore
    if (showToast.showToast && showToast.type === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Ottimo! 👍🏻',
        text2: 'Registrazione avvenuta con successo!🎉',
      }); // @ts-ignore
    } else if (showToast.showToast && showToast.type === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Oh no! 👎🏻',
        text2: 'Qualcosa è andato storto, riprova più tardi!🥺',
      });
    }
  }, [showToast]);

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
          onPress={() => logInAndRedirect()}
          buttonColor={theme.accent}
          style={styles.button}
          contentStyle={styles.content}>

          Accedi
        </Button>
        <Button

          // @ts-ignore
          onPress={() => navigation.navigate('register')}
          buttonColor='gray'
          style={styles.button}
          contentStyle={styles.content}>
          
         
          Registrati
        </Button>
      </View>
      <Toast config={createToastConfig(theme)} />
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
  content: {
    height: 50, 
    justifyContent: 'center',
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
