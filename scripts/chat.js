// script per comunicare col backend
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.indirizzo; 

export const domandabot = async (requestData) => {
 /*
  {
 const { id, question, context, response, idUtente, idFile } = requestData; 

  const request = {
    id,
    question, 
    context,
    response,
    idUtente,
    idFile,
  };
    }
  */
  try {
    const response = await fetch(`http://${conn}:3030/chat`, {
      method: 'POST',
      body: JSON.stringify(requestData),  
    });

    const data = await response.json();
    
    return data.result.response || 'Errore nella risposta del bot';
  } catch (error) {
    console.error('Errore nella comunicazione con il backend:', error);
    return 'Errore nella comunicazione con il backend';
  }
};
