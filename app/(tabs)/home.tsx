import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { IconButton } from 'react-native-paper'
import { uploadFile } from '../../scripts/uploadFile'
import { colors_green } from '@/constants/Colors';
import { Header } from '@/components/_header';

export default function HomeScreen() {
    return (
      <View style={styles.homeContainer}>
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
                iconColor='#ffff' onPress={uploadFile}></IconButton>
        </View>
      </View>
    );
}  

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: colors_green.background
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