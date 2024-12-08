import Constants from 'expo-constants';
const conn = Constants.expoConfig.extra.indirizzo;

export const retrieveSummary = async (fileId) => {
    const response = await fetch(`http://${conn}:3030/file/${fileId}`, {
        method: 'GET'
    })

    
    if (response.ok) {
        const data = await response.json();
        result = data.riassunto;
    } else {
        console.error('Errore durante il recupero del file:', response.statusText);
    }
    console.log('AAAAAAAAAAAAA',result);
    return result;
}