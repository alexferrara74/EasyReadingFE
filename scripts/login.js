import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export async function login(email,password, onLoginSuccess){

    try{
        const request = { email, password}
        const response = await fetch(`http://${conn}:3030/login`,{
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        onLoginSuccess(data.user);
        
    }catch(e){
        console.log('Errore nel login',e);
    }
    
}