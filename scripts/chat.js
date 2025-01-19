// script per comunicare col backend
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const domandabot = async (requestData,user) => {

  try {
    const response = await fetch(`http://${conn}:3030/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(requestData),  
    });
    
    const data = await response.json();
    
    return data.result.response || 'Errore nella risposta del bot';
  } catch (error) {
    console.error('Errore nella comunicazione con il backend:', error);
    return 'Errore nella comunicazione con il backend';
  }
};
