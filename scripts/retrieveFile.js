import Constants from 'expo-constants';
import { useUser } from './userContext';
const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retrieveFile = async (fileId) => {
    const user = useUser();
    const token = user.token;
    console.log('token',token)
    const response = await fetch(`http://${conn}:3030/file/${fileId}`, {
        method: 'GET',
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })

    
    if (response.ok) {
        const data = await response.json();
        result = data;
    } else {
        console.error('Errore durante il recupero del file:', response.statusText);
    }
    return result;
}