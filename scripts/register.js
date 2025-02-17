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

        if(response.status === 200) return { success: true , message: "Registrazione avvenuta con successo 🎉"};
        if(response.status === 400) return { success: false , message: "Email già registrata ❌"};
        else return { success: false , message: "Sembra ci sia un problema, riprova ❌"};
    
    }catch(e){
        console.log('Errore nella registrazione', e);
    }
}