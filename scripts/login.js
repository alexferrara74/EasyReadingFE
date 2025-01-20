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
        if(response.status === 200) return { success: true , message: 'Login avvenuto con successo'};
        else return { success: false , message: 'Errore nel login'};
        
    }catch(e){
        console.log('Errore nel login',e);
    }
    
}