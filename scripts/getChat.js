import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;

export const retreiveChat = async (id_file,user) => {
    console.log("id file di retrieveChat:", id_file);
    try {
        console.log('id file:', id_file);

        // Fixed URL format: removed the colon before the id_file
        const response = await fetch(`http://${conn}:3030/chat/${id_file}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            }, 
        });
        console.log("è ok. ",response.ok);
       // console.log("Response from retrieveChat:", response);
       const data = await response.json();
       console.log("Full chat data:", data);


       if (response.ok) {
            const data = await response.json();
            console.log("Full chat data:", data);
            return data.result?.response || 'Errore nel recupero della chat';
        } else {
            // Handle unsuccessful responses
            console.error('Error in API call:', response.statusText);
            return 'Errore nella comunicazione con il backend (API CALL)';
        }

    } catch (error) {
        console.error('Errore nella comunicazione con il backend:', error);
        return 'Errore nella comunicazione con il backend';
    }
};
