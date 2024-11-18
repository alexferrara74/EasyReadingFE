import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TextInput } from 'react-native';
import { Icon, IconButton } from 'react-native-paper'
import { selectFile, uploadFile } from '../../scripts/uploadFile'
import { colors_green } from '@/constants/Colors';
import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';


export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [file, setFile] = useState();

    return (
      <ScreenContainer>
        <Header mini="Buongiorno" title="Utente!"/>
        <View style={styles.homeSummaryView}>
            <Text style={styles.homeMiniSummary}>Testo da riassumere: </Text>
            <TextInput style={styles.homeTextInput} placeholder='Inserire testo da riassumere' numberOfLines={4} editable multiline/>
            <IconButton style={styles.homeUploadButton} mode='contained-tonal'
                icon="chevron-right" 
                iconColor='#ffff' size={35}></IconButton>
        </View>
        <View style={styles.homeDivider}></View>
        <View style={styles.uploadView}>
            <Text style={styles.homeMiniSummary}>Inviare File</Text>
            <IconButton style={styles.homeUploadButton} mode='contained-tonal'
                icon="file-plus" 
                iconColor='#ffff' onPress={async()=>{
                    const selectedFile = await selectFile();
                    if (selectedFile != null) {
                        setFile(selectedFile);
                        setModalVisible(!modalVisible); 
                    }
                    else return;  
                 }}></IconButton>
        </View>
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(!modalVisible)}}>
                <View style={styles.wrapperModal}>
                    <View style={styles.nameModal}>
                        <TextInput style={styles.homeTextInput} placeholder='Inserire nome riassunto' value={text} onChangeText={setText}/>
                        <IconButton style={styles.homeUploadButton} mode='contained-tonal'
                        icon="chevron-right" 
                        iconColor='#ffff' size={35} onPress={()=>{uploadFile(file, text); setModalVisible(!modalVisible); setText('')}}></IconButton>
                        <IconButton style={styles.exitModalButton} mode='contained-tonal'
                        icon="close" 
                        iconColor='#ffff' size={25} onPress={()=>{setModalVisible(!modalVisible); setText('')}}></IconButton>
                    </View>
                </View>
            </Modal>
      </ScreenContainer>
    );
}  

const styles = StyleSheet.create({
    wrapperModal:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    exitModalButton:{
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: colors_green.accent,
        position: 'absolute',
        top: 0,
        right: 0
    },
    nameModal: {
        width: '80%',
        backgroundColor: colors_green.header_background,
        borderWidth: 1,
        borderColor: colors_green.accent,
        borderRadius: 10,
        position: 'absolute',
        top: '25%',
        left: '10%',
        paddingVertical: 30,
        paddingTop: 50
    },
    nameModalText: {
        backgroundColor: colors_green['text-light'],
        marginHorizontal: 'auto',
        borderRadius: 20,
        width: '90%',
        padding: 15,
    },
    homeSummaryView: {
        padding: 0
    },
    homeMiniSummary:{
        fontSize: 25,
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: colors_green['text-light']
    },
    homeTextInput:{
        backgroundColor: colors_green['text-light'],
        marginHorizontal: 'auto',
        borderRadius: 20,
        height: '40%',
        width: '80%',
        textAlignVertical: 'top',
        padding: 15,
        marginBottom: 15
    },
    homeDivider:{
        borderBottomColor: '#ffffff7a',
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: -100
    },
    uploadView:{
        marginTop: 100
    },
    homeUploadButton:{
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 'auto',
        backgroundColor: colors_green.accent
    },
})