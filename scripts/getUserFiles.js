import Constants from 'expo-constants';
const conn = Constants.expoConfig.extra.IP_ADDRESS;

export async function getFilesByUser(user){
    const token = user.token;
    const userId = user.id;
    console.log(user);
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