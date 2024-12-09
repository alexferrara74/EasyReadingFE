import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';
import { colors_light_blue } from '@/constants/Colors';
import { retrieveSummary } from '@/scripts/retrieveSummary'
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import { IconButton } from 'react-native-paper'

export default function SummaryScreen() 
{
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    
    const file = route.params;
    console.log(file)
    const toggleChat = () => {
        setModalVisible(!modalVisible);
    }
    
    return (
        <ScreenContainer>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleChat}
                style={styles.summaryUpperModal}
            >
                <View style={styles.summaryModal}>
                    <View style={styles.summaryChatContainer}>
                        <View style={styles.summaryTriangle}></View>

                        <View style={styles.chatBox}>
                            <Text style={styles.chatText}>Benvenuto nella chat! Come posso aiutarti?</Text>
                        </View>

                    </View>
                </View>

                <IconButton style={styles.summaryBotButtonModal} mode='contained-tonal'
                    icon="robot-confused" 
                    iconColor='#ffff' size={30} onPress={toggleChat}></IconButton>
            </Modal>
            <Header mini='Ecco a te il tuo' title='Riassunto'/>
            <IconButton mode='outlined' 
                    icon={'arrow-left-thick'}
                    style={styles.backButton}
                    // @ts-ignore
                    onPress={() => navigator.navigate('index')} />
            <ScrollView >
                <Text style={styles.summarySummary}>
                    { // @ts-ignore
                    file?.file.riassunto}
                </Text>
            </ScrollView>
            <IconButton style={styles.summaryBotButton} mode='contained-tonal'
                icon="robot-confused" 
                iconColor='#ffff' size={30} onPress={toggleChat}></IconButton>
        </ScreenContainer>
    );
}
// TODO: DA AGGIUSTARE LO STILE IN TEMA CHIARO
const styles = StyleSheet.create({
    backButton:{
        position: 'absolute',
        top: 15,
        left: 10,
        borderRadius: 9
    },
    summarySummary:{
        marginTop: 20,
        fontSize: 16,
        color: colors_light_blue['text-dark'],
        paddingHorizontal: 20,
        width: '90%',
        lineHeight: 25
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
    summaryUpperModal:{
        position: 'absolute',
        bottom: 0,
    },
    summaryModal:{
        height: '60%',
        width: '80%',
        position: 'relative',
        zIndex: 99,
        borderRadius: 50,
        borderWidth: 1,
        bottom: 0,
        borderColor: '#fff'
    },
    summaryBotButtonModal:{
        position: 'absolute',
        bottom: 75,
        right: 15,
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 'auto',
        backgroundColor: colors_light_blue.accent,
    },
    summaryChatContainer: {
        marginLeft: 20,
        position: 'absolute',
        bottom: 0
    },
    summaryTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 0,
        transform: [{'rotate': '15deg'}],
        position: 'absolute',
        bottom: 0,
        right: -10,
    },
    chatBox: {
        backgroundColor: '#232725',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
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
})