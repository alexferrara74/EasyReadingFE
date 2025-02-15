import { useTheme } from '@/scripts/ThemeProvider';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { changePassword } from '@/scripts/changePassword';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface changePasswordProps {
  modal: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  user: Object;
}

export function ChangePasswordModal({ modal, setModalVisible, user }: changePasswordProps) {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { theme } = useTheme();
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

  return (
    <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => {}}>
      <View style={style.wrapperModal}>
        <View style={[style.modal, { backgroundColor: theme.header_background, borderColor: theme.accent }]}>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={6}
            rootStyle={style.codeFieldRoot}
            keyboardType='numeric'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  style.cell,
                  { backgroundColor: theme.background, borderColor: theme['header-text'] },
                  isFocused && { borderColor: theme.accent },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={[style.cellText, { color: theme['header-text'] }]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <TextInput
            placeholder='Inserire la nuova mail'
            placeholderTextColor={theme['header-text']}
            keyboardType='email-address'
            value={password}
            onChangeText={setPassword}
            style={[
              style.modalTextInput,
              { backgroundColor: theme.background, borderColor: theme.accent, color: theme['header-text'] },
            ]}
            underlineColorAndroid='transparent'
          />
          <Button
            style={[style.submitButton, { backgroundColor: theme.accent }]}
            onPress={async () => {
              // @ts-ignore
              const result = await changePassword(user.email, code, password);
              if (result) {
                setCode('');
                setPassword('');
                setModalVisible(false);
              } else {
                console.log('Errore: ', result);
              }
            }}>
            <Text style={{ color: theme['header-text'] }}>Cambia password</Text>
          </Button>
          <IconButton
            mode='contained-tonal'
            icon='close'
            style={[style.exitModalButton, { backgroundColor: theme.accent }]}
            iconColor='#ffff'
            size={25}
            onPress={() => {
              setModalVisible(false);
              setCode('');
              setPassword('');
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  wrapperModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 10,
    position: 'absolute',
    top: '25%',
    left: '10%',
    padding: 40,
  },
  submitButton: {
    marginHorizontal: 'auto',
    paddingVertical: 2,
    width: '70%',
  },
  exitModalButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  codeFieldRoot: {
    marginBottom: 20,
  },
  cell: {
    width: 30,
    height: 45,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 24,
  },
  modalTextInput: {
    marginHorizontal: 'auto',
    borderWidth: 0.5,
    borderRadius: 20,
    height: '35%',
    width: '100%',
    padding: 15,
    marginBottom: 15,
  },
});
