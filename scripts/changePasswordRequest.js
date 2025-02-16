import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS; 

export const sendChangePasswordRequest = async (email) => {
    try {
        const response = await fetch(`http://${conn}:3030/richiesta-cambio-password?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });
        // const data = await response.json();
        // return data;
    } catch (error) {
        console.error(error);
    }
}