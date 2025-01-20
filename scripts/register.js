import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export async function register(email,password,username, age, onRegisterSuccess){
    try{
        const request = { email, password, username, age}
        const response = await fetch(`http://${conn}:3030/register`,{
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 200){
            return { success: true , message: 'Registrazione avvenuta con successo'};
        }
        else return { success: false , message: 'Errore nella registrazione'};
        const data = await response.json();
        //onRegisterSuccess(data.user);
        
    }catch(e){
        console.log('Errore nella registrazione', e);
    }
}