import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retreiveChat = async (id_file,user) => {
    try {
       
        const response = await fetch(`http://${conn}:3030/recchat/${id_file}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            }, 
        });
        
        //console.log('response in chat:', response);
        //console.log('response ,result in chat:', response.result);
       const data = await response.json();

       if (response.ok) {
            console.log("retrieve della chat effettuato con successo");
            return data;
        } else {
            console.error('Error in API call in chat retrieve:', response.statusText);
            return 'Errore nella comunicazione con il backend (API CALL), durante recupero chat';
        }

    } catch (error) {
        console.error('Errore nella comunicazione con il backend durante il recupero della chat:', error);
        return 'Errore nella comunicazione con il backend durante il recupero della chat';
    }
};
