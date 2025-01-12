import Constants from 'expo-constants';
const conn = Constants.expoConfig.extra.indirizzo;

export async function getFilesByUser(userId){
    console.log('userid',userId)
    try{
        const response = await fetch(`http://${conn}:3030/file/allfile/${userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = response.json();
        return data
    }catch(e){
        console.log('Errore nella getAllFileByUser',e);
    }
    
}