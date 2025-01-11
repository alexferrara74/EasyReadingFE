import React, { useState, SetStateAction, Dispatch } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TextInput } from 'react-native';
import { Button, Icon, IconButton } from 'react-native-paper';
import { uploadFile } from '@/scripts/uploadFile';
import { colors_light_blue } from '@/constants/Colors';
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
  userID: string;
}

export function UploadModal({ modal, context, file, setModalVisible, mode, userID }: ModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme, updateTheme } = useTheme();

  return (
    <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => {}}>
      <View style={styles.wrapperModal}>
        <View style={[styles.nameModal, { backgroundColor: theme.header_background, borderColor: theme.accent }]}>
          <TextInput
            style={[styles.modalTextInput, { backgroundColor: theme['text-light'], borderColor: theme.accent }]}
            placeholder='Inserire nome riassunto'
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
                var result;
                if (mode == 2) result = await uploadFile(file, text, setLoading, userID);
                if (mode == 1) result = await sendText(context, text, setLoading, userID);
                setText('');
                if (result) {
                  const file = await retrieveFile(result.idResponseTask);
                  // @ts-ignore
                  navigation.navigate('summary', { file: file });
                  setModalVisible(false);
                } else {
                  console.log('Caricamento non riuscito.');
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
    borderWidth: 2,
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
