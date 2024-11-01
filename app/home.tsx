import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { TextInput } from 'react-native';
import { IconButton } from 'react-native-paper'
import { useNavigation } from 'expo-router';
import { SummaryScreen } from './summary';
import { uploadFile } from '../scripts/uploadFile'

export function HomeScreen() {

    return (
      <View style={styles.homeContainer}>
        <View style={styles.homeHeader}>
            <Text style={styles.homeMiniTitle}>Buongiorno,</Text>
            <Text style={styles.homeTitle}>Utente!</Text>
        </View>
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
        backgroundColor: '#232725'
    },
    homeHeader: {
        paddingTop: 40,
        backgroundColor: '#161d19',
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    homeMiniTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF'
    },
    homeTitle:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF'
    },
    homeSummaryView: {
        padding: 0
    },
    homeMiniSummary:{
        fontSize: 20,
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#FFF'
    },
    homeTextInput:{
        backgroundColor: '#FFF',
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
        backgroundColor: '#e5383b'
    },
})