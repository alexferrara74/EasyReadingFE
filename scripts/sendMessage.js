// script per comunicare col backend
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const domandabot = async (requestData, user ) => {

  try {
    
    const response = await fetch(`http://${conn}:3030/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(requestData),  
    });

    if (response.ok) {
      const data = await response.json();

      const socket = new WebSocket(`ws://${conn}:8085`); //socket bot

      socket.onopen = () => {
          console.log('WebSocket connessa');
      };

      const waitForCheck = new Promise((resolve, reject) => {
          socket.onmessage = (event) => {
              try {
              const response = JSON.parse(event.data);
  
              //console.log("response (sendmesssage): ",response);
              if (response.done !== false) { 
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
 
      return result;
    } else {
        console.log('Errore durante l\' invio della domanda al bot');
        return null;
    }
  } catch (error) {
    console.error('Errore nella comunicazione con il backend durante l\' invio della domanda:', error);
    return 'Errore nella comunicazione con il backend';
  }
};
