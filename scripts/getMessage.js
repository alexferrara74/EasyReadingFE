import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retreiveMessage = async (id,user) => {
 
     try {
       console.log('id file:'+id);
       const response = await fetch(`http://${conn}:3030/chat/${id}`, {
         method: 'POST',
         //body: JSON.stringify(id),  
         headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
      }, 
       });
   
       const data = await response.json();
       
       return data.result.response || 'Errore nel recupero della chat';
     } catch (error) {
       console.error('Errore nella comunicazione con il backend:', error);
       return 'Errore nella comunicazione con il backend';
     }
   };
   
   