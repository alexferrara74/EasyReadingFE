import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const changePassword = async (email, cod, newPasw) => {
    try {
        const response = await fetch(`http://${conn}:3030/cambio-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                codiceSicurezza: cod,
                nuovaPassword: newPasw
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}