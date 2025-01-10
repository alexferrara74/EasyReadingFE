import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.indirizzo;

export async function register(email,password,username, onRegisterSuccess){
    try{
        const eta = 24
        const request = { email, password, username, eta};
        const response = await fetch(`http://${conn}:3030/register`,{
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        onRegisterSuccess(data.user);
        
    }catch(e){
        console.log('Errore nella registrazione', e);
    }
}