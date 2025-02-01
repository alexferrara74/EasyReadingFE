import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retreiveChat = async (id_file,user) => {
    try {
       
        const response = await fetch(`http://${conn}:3030/chat/${id_file}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            }, 
        });
       const data = await response.json();

       if (response.ok) {
            return data || 'Errore nel recupero della chat';
        } else {
            console.error('Error in API call:', response.statusText);
            return 'Errore nella comunicazione con il backend (API CALL), durante recupero chat';
        }

    } catch (error) {
        console.error('Errore nella comunicazione con il backend durante il recupero della chat:', error);
        return 'Errore nella comunicazione con il backend durante il recupero della chat';
    }
};
