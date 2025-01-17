import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { selectFile } from '@/scripts/uploadFile';
import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';
import { UploadModal } from '@/components/UploadModal';
import { useUser } from '@/scripts/userContext';
import { useTheme } from '@/scripts/ThemeProvider';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState();
  const [text, setText] = useState('');
  const [mode, setMode] = useState(0);
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <Header mini='Buongiorno' title={user?.username.toUpperCase()} />
      <View style={styles.homeSummaryView}>
        <Text style={[styles.homeMiniSummary, { color: theme['header-text'] }]}>Testo da riassumere: </Text>
        <TextInput
          style={[
            styles.homeTextInput,
            { backgroundColor: theme.background, borderColor: theme.accent, color: theme['header-text'] },
          ]}
          placeholder='Inserire testo da riassumere'
          placeholderTextColor={theme['header-text']}
          onChangeText={setText}
          numberOfLines={4}
          editable
          multiline
        />
        <Button
          style={[styles.startSummary, { backgroundColor: theme.accent }]}
          textColor={theme['text-light']}
          mode='contained-tonal'
          onPress={() => {
            if (text.length > 0) {
              setMode(1);
              setModalVisible(!modalVisible);
            }
          }}>
          Riassumi
        </Button>
      </View>
      <View style={[styles.homeDivider, { borderBottomColor: theme.accent }]}></View>
      <View style={styles.uploadView}>
        <Text style={[styles.homeMiniSummary, { color: theme['header-text'] }]}>Inviare File</Text>
        <IconButton
          style={[styles.homeUploadButton, { backgroundColor: theme.accent }]}
          mode='contained-tonal'
          icon='file-plus'
          size={25}
          iconColor='#ffff'
          onPress={async () => {
            const selectedFile = await selectFile();
            if (selectedFile != null) {
              // @ts-ignore
              setFile(selectedFile);
              setMode(2);
              setModalVisible(!modalVisible);
            } else return;
          }}></IconButton>
      </View>
      <UploadModal
        modal={modalVisible}
        context={text}
        // @ts-ignore
        file={file}
        userID={user?.id}
        setModalVisible={setModalVisible}
        mode={mode}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  startSummary: {
    width: 120,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
  homeSummaryView: {
    padding: 0,
  },
  homeMiniSummary: {
    fontSize: 25,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  homeTextInput: {
    marginHorizontal: 'auto',
    borderWidth: 2,
    borderRadius: 20,
    height: '40%',
    width: '80%',
    textAlignVertical: 'top',
    padding: 15,
    marginBottom: 15,
  },
  homeDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: -100,
  },
  uploadView: {
    marginTop: 100,
  },
  homeUploadButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
});
