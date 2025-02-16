import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const changePassword = async (email, cod, newPasw) => {
    try {
        const response = await fetch(`http://${conn}:3030/cambio-password?email=${email}&codiceSicurezza=${cod}&nuovaPassword=${newPasw}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
          
        });
       
    } catch (error) {
        console.error(error);
    }
}