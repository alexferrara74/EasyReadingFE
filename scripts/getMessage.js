import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retreiveMessage = async (id, user) => {
 
     try {
       const response = await fetch(`http://${conn}:3030/chat/${id}`, {
         method: 'GET',
         //body: JSON.stringify(id),  
         headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
      }, 
       });
   
       const data = await response.json();
       console.log("dati ricevuti. ");

       return data || 'Errore nel recupero della chat';
     } catch (error) {
       console.error('Errore nella comunicazione con il backend durante il recupero della risposta:', error);
       return 'Errore nella comunicazione con il backend durante il recupero della risposta';
     }
   };
   
   