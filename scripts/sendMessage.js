// script per comunicare col backend
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const domandabot = async (requestData,user) => {
  //QUI ININZIA L'ATTESA DELLA RICHIESTA AL BOT
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
  
              console.log("response.id (sendmesssage): ",response.id, " response._id: ", response._id);
              if (response.done !== false) { //controllo sull'id
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
     // setLoading(false); 
      return result;
    } else {
      // setLoading(false);
        console.log('Errore durante l\' invio della domanda al bot');
        return null;
    }
  } catch (error) {
    //setLoading(false);
    console.error('Errore nella comunicazione con il backend:', error);
    return 'Errore nella comunicazione con il backend';
  }
};
