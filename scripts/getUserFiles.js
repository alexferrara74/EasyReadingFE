import { useUser } from "./userContext";

export async function getFilesByUser(userId){
    const user = useUser();
    const token = user.token;
    try{
        const response = await fetch(`http://192.168.1.121:3030/file/allfile/${userId}`,{
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