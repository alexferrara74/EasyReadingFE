import { Platform } from 'react-native';
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.indirizzo;

export const sendText = async (context, summaryName, userID) => {
    try {
        const formData = new FormData();
        formData.append('context', context);
        formData.append('titolo', summaryName);
        formData.append('idUtente', userID);
        console.log(formData);
        var response = await fetch(`http://${conn}:3030/upload?titolo=${summaryName}&idUtente=${userID}`, {
            method: 'POST',
            body: formData
        });
        console.log('Caricamento testo in corso...');
        if (response.ok) {
            console.log('Testo caricato con successo');
            const data = await response.json();

            const socket = new WebSocket(`ws://${conn}:8080`);
    
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
            console.log('Errore durante il caricamento del testo');
            return null;
        }
    } catch (e) {
        console.log('Errore:', e);
        return null;
    }
  };