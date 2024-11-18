import * as DocumentPicker from 'expo-document-picker'
import { Platform } from 'react-native';

export const selectFile = async ()=> {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
        });

        if (result.canceled) {
            console.log('Selezione annullata');
            return null;
        }

        return result;
    }catch (e) {
        console.log('Errore:', e);
        return null;
    }
}

export const uploadFile = async (file, summaryName) => {
    try {
        if (Platform.OS === 'web') {
            const formData = new FormData();
            formData.append('file', file.assets[0].file, summaryName);
            console.log(formData)
            var response = await fetch('http://192.168.3.28:3030/upload', {
                method: 'POST',
                body: formData
            });
        } 
        else {
            const formData = new FormData();
            formData.append('file', {
                uri: file.assets[0].uri,
                type: 'application/pdf',
                name: summaryName,
            });
            console.log('Caricamento file in corso...');
            var response = await fetch('http://192.168.3.28:3030/upload', {
                method: 'POST',
                body: formData,
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData)
        }
      
        if (response.ok) {
            console.log('File caricato con successo');
            const data = await response.json();

            const socket = new WebSocket("ws://192.168.3.28:8080");
    
            socket.onopen = () => {
            console.log('WebSocket connessa');
            };
  
            const waitForCheck = new Promise((resolve, reject) => {
                socket.onmessage = (event) => {
                    try {
                    const response = JSON.parse(event.data);
                    console.log('Risposta WebSocket:', response);
        
                    if (response.fileId !== null) {
                        resolve(response);
                        socket.close();
                    }
                    } catch (error) {
                    reject(new Error('Errore nel parsing della risposta WebSocket'));
                    socket.close();
                    }
                };
    
                socket.onerror = (error) => {
                    reject(new Error('Errore nella WebSocket'));
                };
            });
  
            const result = await waitForCheck;
            console.log('Elaborazione completata:', result);
            return result;
        } else {
            console.log('Errore durante il caricamento del file');
            return null;
        }
    } catch (e) {
        console.log('Errore:', e);
        return null;
    }
  };