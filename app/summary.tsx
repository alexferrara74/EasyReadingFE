import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';
import { ChatBotBox } from '@/components/ChatBotBox';
import { colors_green, colors_light_blue } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';
import { blue, red } from 'react-native-reanimated/lib/typescript/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { domandabot } from '@/scripts/chat'; // Importa la funzione
import { useRoute } from '@react-navigation/native';

import { useUser } from '@/scripts/userContext';
import Markdown from 'react-native-markdown-display';

export default function SummaryScreen() {
  const navigator = useNavigation();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const route = useRoute();
  const file = route.params;

  // Funzione per inviare un messaggio e ricevere una risposta dal bot
  const sendMessage = async () => {
    if (text.trim() === '') return; // Non inviare se il testo è vuoto

    // Aggiorna i messaggi con il testo dell'utente
    const newMessage = { sender: 'user', text: text };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setText(''); // Pulisce la barra di input
    try {
      console.log('TESTO DA PASSARE AL BACKEND ' + text); // ok fino a nuosvo ciclo di rendering

      const requestData = {
        question: text,
        context: file?.file.riassunto, //contenuto file
        response: '',
        idUtente: user?.id,
        // @ts-ignore
        idFile: file?.file.id,
      };
      // Chiama la funzione domandabot() per ottenere la risposta del bot
      const response = await domandabot(requestData);

      // Aggiorna i messaggi con la risposta del bot
      const botMessage = { sender: 'bot', text: response };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Errore nel recupero della risposta dal bot:', error);
    }
  };

  /*
    const domandabot = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Questa è una risposta del bot!");
            }, 1000);  
        });
    };*/

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
        <View style={styles.summaryModal}>
          <View style={styles.summaryChatContainer}>
            <View style={styles.summaryTriangle}></View>

            <ScrollView style={styles.messageContainer}>
              <ChatBotBox></ChatBotBox>
              {chatMessages.map((msg, index) => (
                <View
                  key={index}
                  style={[styles.messageBubble, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                  <Text style={[styles.messageText, msg.sender === 'bot' ? styles.botText : styles.userText]}>
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.textBarContainer}>
              <TextInput
                style={styles.textBar}
                placeholder='Inserire messaggio'
                value={text}
                onChangeText={setText}
                onSubmitEditing={sendMessage}
                returnKeyType='send'
              />
              <IconButton
                style={styles.sendButton}
                icon='chevron-right'
                iconColor='#ffffff'
                size={30}
                onPress={sendMessage}
              />
            </View>
          </View>
        </View>

        <IconButton
          // @ts-ignore
          style={styles.summaryBotButtonModal}
          mode='contained-tonal'
          icon='robot-confused'
          iconColor='#ffff'
          size={30}
          onPress={toggleChat}></IconButton>
      </Modal>
      <Header mini='Ecco a te il tuo' title='Riassunto' />
      <IconButton
        mode='outlined'
        icon={'arrow-left-thick'}
        // @ts-ignore
        style={styles.backButton}
        // @ts-ignore
        onPress={() => navigator.navigate('index')}
      />
      <ScrollView // @ts-ignore
        style={styles.scrollSummary}>
        <Markdown // @ts-ignore
          style={styles.summarySummary}>
          {
            // @ts-ignore
            file?.file.riassunto
          }
        </Markdown>
      </ScrollView>
      <IconButton // @ts-ignore
        style={styles.summaryBotButton}
        mode='contained-tonal'
        icon='robot-confused'
        iconColor='#ffff'
        size={30}
        onPress={toggleChat}></IconButton>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors_light_blue['text-light'],
    borderColor: '#dcdcdc',
    // borderWidth: 1,
  },
  botMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#000000',
  },
  botText: {
    color: '#ffffff',
  },
  summaryChatContainer: {
    flex: 1, // Occupa tutto lo spazio disponibile
    marginLeft: 20,
    borderColor: 'green',
    height: '100%',
    width: '100%',
  },
  messageContainer: {
    flexGrow: 1,
    marginBottom: 70,
    marginRight: 30,
    marginTop: 20,
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
    left: 10,
    right: 25,
    height: '10%',
  },
  textBar: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 25,
  },
  summarySummary: {
    marginTop: 20,
    fontSize: 16,
    color: colors_light_blue['text-dark'],
    paddingHorizontal: 20,
    width: '90%',
    lineHeight: 25,
  },
  summaryBotButton: {
    position: 'absolute',
    bottom: 75,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
    backgroundColor: colors_light_blue.accent,
  },
  summaryUpperModal: {
    position: 'absolute',
    bottom: 0,
  },
  summaryModal: {
    height: '60%',
    width: '80%',
    position: 'absolute',
    zIndex: 99,
    borderRadius: 50,
    borderWidth: 1,
    bottom: '12%',
    left: 10,
    borderColor: colors_light_blue.accent,
    backgroundColor: colors_light_blue.header_background,
  },
  summaryBotButtonModal: {
    position: 'absolute',
    bottom: 75,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 'auto',
    backgroundColor: colors_light_blue.accent,
  },

  summaryTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors_light_blue.accent,
    alignSelf: 'center',
    marginBottom: 0,
    transform: [{ rotate: '15deg' }],
    position: 'absolute',
    bottom: 0,
    right: -10,
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
