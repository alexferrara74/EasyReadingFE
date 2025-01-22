
export const retreiveChat = async (requestData) => {
 
     try {
       console.log('id file:'+requestData.idFile);
       const response = await fetch(`http://${conn}:3030/chat/:${requestData.idFile}`, {
         method: 'POST',
         body: JSON.stringify(requestData),  
       });
   
       const data = await response.json();
       
       return data.result.response || 'Errore nel recupero della chat';
     } catch (error) {
       console.error('Errore nella comunicazione con il backend:', error);
       return 'Errore nella comunicazione con il backend';
     }
   };
   
   