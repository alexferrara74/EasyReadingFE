// script per comunicare col backend
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const generaImmagine = async (requestData, user ) => {

  try {
    console.log('RICHIESTA IMMAGINE EFFETTUATA', requestData)
    const response = await fetch(`http://${conn}:3030/generaImmagine?prompt=${requestData}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      
    });

    const blob = await response.blob();
    const base64Img = await blobToBase64(blob);

    return `data:image/png;base64,${base64Img}`;

  } catch (error) {
    console.error('Errore:', error);
    return 'Errore nella richiesta immagine';
  }


};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // Prende solo la parte base64
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
