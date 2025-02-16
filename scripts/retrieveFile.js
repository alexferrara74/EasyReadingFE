import Constants from 'expo-constants';
const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retrieveFile = async (fileId) => {
   
    const response = await fetch(`http://${conn}:3030/file/${fileId}`, {
        method: 'GET',

    })
    if (response.ok) {
        const data = await response.json();
        data.id = fileId;
        return data;
    } else {
        console.error('Errore durante il recupero del file:', response.statusText);
        return null;
    }
}