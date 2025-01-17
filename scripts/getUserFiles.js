import Constants from 'expo-constants';
const conn = Constants.expoConfig.extra.indirizzo;
import { useUser } from "./userContext";

export async function getFilesByUser(userId){
    const user = useUser();
    const token = user.token;
    try{
        const response = await fetch(`http://${conn}:3030/file/allfile/${userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        const data = response.json();
        return data
    }catch(e){
        console.log('Errore nella getAllFileByUser',e);
    }
    
}