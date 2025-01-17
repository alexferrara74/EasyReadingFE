import React, { useState, SetStateAction, Dispatch } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { uploadFile } from '@/scripts/uploadFile';
import { DocumentPickerSuccessResult } from 'expo-document-picker';
import { sendText } from '@/scripts/sendText';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from 'expo-router';
import { retrieveFile } from '@/scripts/retrieveFile';
import { useTheme } from '@/scripts/ThemeProvider';

interface ModalProps {
  modal: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  context: string;
  file: DocumentPickerSuccessResult;
  mode: number;
  user: Object;
}

export function UploadModal({ modal, context, file, setModalVisible, mode, user }: ModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme, updateTheme } = useTheme();

  return (
    <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => {}}>
      <View style={styles.wrapperModal}>
        <View style={[styles.nameModal, { backgroundColor: theme.header_background, borderColor: theme.accent }]}>
          <TextInput
            style={[styles.modalTextInput, { backgroundColor: theme.background, borderColor: theme.accent }]}
            placeholder='Inserire nome riassunto'
            placeholderTextColor={theme['header-text']}
            value={text}
            onChangeText={setText}
          />
          {loading ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : (
            <IconButton
              style={[styles.modalUploadButton, { backgroundColor: theme.accent }]}
              mode='contained-tonal'
              icon='chevron-right'
              iconColor='#ffff'
              size={35}
              onPress={async () => {
                try {
                  var result;
                  // @ts-ignore
                  if (mode == 2) result = await uploadFile(file, text, setLoading, user.id);
                  // @ts-ignore
                  if (mode == 1) result = await sendText(context, text, setLoading, user.id);
                  setText('');
                  if (result) {
                    const file = await retrieveFile(result.idResponseTask, user);
                    // @ts-ignore
                    navigation.navigate('summary', { file: file });
                    setModalVisible(false);
                  } else {
                    console.log('Caricamento non riuscito.');
                  }
                } catch (error) {
                  console.error("Errore durante l'onPress:", error);
                }
              }}
            />
          )}
          <IconButton
            style={[styles.exitModalButton, { backgroundColor: theme.accent }]}
            mode='contained-tonal'
            icon='close'
            iconColor='#ffff'
            size={25}
            disabled={loading}
            onPress={() => {
              setModalVisible(false);
              setText('');
            }}
          />
        </View>
        {loading && (
          <TouchableWithoutFeedback>
            <View style={styles.loadingContainer} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapperModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exitModalButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  nameModal: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    top: '25%',
    left: '10%',
    paddingVertical: 30,
    paddingTop: 50,
  },
  modalTextInput: {
    marginHorizontal: 'auto',
    borderWidth: 0.5,
    borderRadius: 20,
    height: '40%',
    width: '80%',
    textAlignVertical: 'top',
    padding: 15,
    marginBottom: 15,
  },
  modalUploadButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
