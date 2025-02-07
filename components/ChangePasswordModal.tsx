import { useTheme } from '@/scripts/ThemeProvider';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, View, Text } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { changePassword } from '@/scripts/changePassword';

interface changePasswordProps {
  modal: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  user: Object;
}

export function ChangePasswordModal({ modal, setModalVisible, user }: changePasswordProps) {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { theme } = useTheme();

  return (
    <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => {}}>
      <View>
        <TextInput
          placeholder='Inserire il codice ricevuto tramite mail'
          placeholderTextColor={theme['header-text']}
          keyboardType='numeric'
          value={code}
          onChangeText={setCode}
        />
        <TextInput
          placeholder='Inserire la nuova mail'
          placeholderTextColor={theme['header-text']}
          keyboardType='email-address'
          value={password}
          onChangeText={setPassword}
        />
        <Button
          onPress={async () => {
            // @ts-ignore
            const result = await changePassword(user.mail, code, password);
            if (result) {
              setCode('');
              setPassword('');
              setModalVisible(false);
            } else {
              console.log('Errore: ', result);
            }
          }}>
          <Text>Cambia password</Text>
        </Button>
        <IconButton
          mode='contained-tonal'
          icon='close'
          iconColor='#ffff'
          size={25}
          onPress={() => {
            setModalVisible(false);
            setCode('');
            setPassword('');
          }}
        />
      </View>
    </Modal>
  );
}
