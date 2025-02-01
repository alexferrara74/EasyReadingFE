import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';
import { ChatBotBox } from '@/components/ChatBotBox';
import { useNavigation } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Keyboard, KeyboardEvent } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';
import { domandabot } from '@/scripts/sendMessage'; // invia domanda al be
import { retreiveMessage } from '@/scripts/getMessage'; //prende risposta alla singola domanda
import { useRoute } from '@react-navigation/native';
import { retreiveChat } from '@/scripts/getChat'; // retrieve chat sul file
import { useUser } from '@/scripts/userContext';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '@/scripts/ThemeProvider';
import Toast from 'react-native-toast-message';
import createToastConfig from '@/constants/ToastConfig';

export default function SummaryScreen() {
  const navigator = useNavigation();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { theme } = useTheme();

  const markdownStyle = {
    body: {
      color: theme['header-text'],
    },
  };

  const route = useRoute();
  const file = route.params;
  const showToast = route.params;
  
    useEffect(() => {
      // @ts-ignore
      if (showToast.showToast && showToast.type === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Ottimo! 👍🏻',
          text2: 'Riassunto avvenuto con successo!🎉',
        }); // @ts-ignore
      }
    }, [showToast]);



  const scrollViewRef = useRef(null);

  const sendMessage = async () => {
    if (text.trim() === '') return;

    //await getMessages();
    const newMessage = { sender: 'user', text: text };
    // @ts-ignore
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setText('');

    setTimeout(() => {
      // @ts-ignore
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const requestData = {
        question: text,
        // @ts-ignore
        context: file?.file.riassunto,
        response: '',
        idUtente: user?.id,
        // @ts-ignore
        idFile: file?.file.id,
      };

      console.log('dati da inviare  ' + JSON.stringify(requestData));
      const RESULT = await domandabot(requestData, user); 

      console.log(JSON.stringify(RESULT.idResponseTask));
      const resp = await retreiveMessage(RESULT.idResponseTask);

      const botMessage = { sender: 'bot', text: RESULT.message };
      // @ts-ignore
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);

      setTimeout(() => {
        // @ts-ignore
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Errore nel recupero della risposta dal bot:', error);
    }
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event: KeyboardEvent) => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // recupera chat precedente
  const getMessages = async () => {
    try {
      //@ts-ignore
      let id_file_retrieve_chat = file?.file.id;
      //console.log("prima di fare retrieve user token e:",user.token);
      //@ts-ignore
      const res = await retreiveChat(id_file_retrieve_chat, user);

      const formattedMessages = res
        .map((item: { question: string; response: string }) => {
          const userMessage = { sender: 'user', text: item.question };
          const botMessage = { sender: 'bot', text: item.response };

          return [userMessage, botMessage];
        })
        .flat();

      //@ts-ignore
      setChatMessages(formattedMessages);
      /*} else {
        console.error('Expected res.response to be an array, but got:', res.response);
      }*/
    } catch (error) {
      console.error('Errore nel recupero della chat', error);
    }
  };

  // Chiamata a getMessages subito dopo il rendering del componente ChatBotBox
  useEffect(() => {
    getMessages(); // Recupera i messaggi subito dopo il primo render
  }, []); // L'effetto si eseguirà solo una volta, dopo il primo render

  const toggleChat = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScreenContainer>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleChat}
        style={styles.summaryUpperModal}>
        <View style={[styles.summaryModal, { borderColor: theme.accent, backgroundColor: theme.background }]}>
          <View style={styles.summaryChatContainer}>
            <View style={[styles.summaryTriangle, { borderBottomColor: theme.accent }]}></View>

            <ScrollView style={styles.messageContainer} ref={scrollViewRef}>
              <ChatBotBox></ChatBotBox>
              {chatMessages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    // @ts-ignore
                    msg.sender === 'user'
                      ? [styles.userMessage, { backgroundColor: theme['header-text'] }]
                      : [styles.botMessage, { backgroundColor: theme.accent }],
                  ]}>
                  <Text
                    style={[
                      styles.messageText,
                      // @ts-ignore
                      msg.sender === 'bot'
                        ? [
                            // @ts-ignore
                            styles.botText,
                            { color: theme['header-text'] },
                          ]
                        : [
                            // @ts-ignore
                            styles.userText,
                            { color: theme.accent },
                          ],
                    ]}>
                    {
                      // @ts-ignore
                      msg.text
                    }
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View
              style={[
                styles.textBarContainer,
                keyboardVisible && { height: 50 },
                { backgroundColor: theme.background, borderColor: theme.accent, borderWidth: 0.5 },
              ]}>
              <TextInput
                style={[styles.textBar, { color: theme['header-text'] }]}
                placeholder='Inserire messaggio'
                placeholderTextColor={theme['header-text']}
                value={text}
                onChangeText={setText}
                onSubmitEditing={sendMessage}
                returnKeyType='send'
              />
              <IconButton
                style={[styles.sendButton, { backgroundColor: theme.accent }]}
                icon='chevron-right'
                iconColor='#ffffff'
                size={25}
                onPress={sendMessage}
              />
            </View>
          </View>
        </View>

        <IconButton
          // @ts-ignore
          style={[styles.summaryBotButtonModal, { backgroundColor: theme.accents }]}
          mode='contained-tonal'
          icon='robot-confused'
          iconColor='#ffff'
          size={30}
          onPress={toggleChat}
          disabled={!user} ></IconButton>
      </Modal>
      <Header mini='Ecco a te il tuo' title='Riassunto' />
      <IconButton
        mode='outlined'
        icon={'arrow-left-thick'}
        // @ts-ignore
        style={[styles.backButton, { borderColor: theme.accent }]}
        iconColor={theme.accent}
        // @ts-ignore
        onPress={() => navigator.navigate('index')}
      />
      <ScrollView // @ts-ignore
        contentContainerStyle={{ padding: 16, paddingBottom: '20%' }}
        style={{ flex: 1 }}>
        <Markdown // @ts-ignore
          style={markdownStyle}>
          {
            // @ts-ignore
            file?.file.riassunto
          }
        </Markdown>
      </ScrollView>
      <IconButton // @ts-ignore
        style={[styles.summaryBotButton, { backgroundColor: theme.accent }]}
        mode='contained-tonal'
        icon='robot-confused'
        iconColor='#ffff'
        size={30}
        onPress={toggleChat}></IconButton>
      <Toast config={createToastConfig(theme)} />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    marginVertical: 20,
  },
  userMessage: {
    alignSelf: 'flex-start',
    borderColor: '#dcdcdc',
    // borderWidth: 1,
  },
  botMessage: {
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  summaryChatContainer: {
    flex: 1, // Occupa tutto lo spazio disponibile
    marginLeft: 20,
    height: '100%',
    width: '100%',
  },
  messageContainer: {
    flexGrow: 1,
    marginBottom: 70,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 30,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  textBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    left: 5,
    right: 40,
    height: '10%',
  },
  textBar: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    color: '#333',
  },
  sendButton: {
    borderRadius: 25,
  },
  summaryBotButton: {
    position: 'absolute',
    bottom: 75,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
  summaryUpperModal: {
    position: 'absolute',
    bottom: 0,
  },
  summaryModal: {
    height: '70%',
    width: '80%',
    position: 'absolute',
    zIndex: 99,
    borderRadius: 50,
    borderWidth: 1,
    bottom: '5%',
    left: 10,
  },
  summaryBotButtonModal: {
    position: 'absolute',
    bottom: 28,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },

  summaryTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 0,
    transform: [{ rotate: '15deg' }],
    position: 'absolute',
    bottom: 5,
    right: 15,
  },
  chatBox: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    top: 10,
    marginHorizontal: 30,
  },
  chatText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});
