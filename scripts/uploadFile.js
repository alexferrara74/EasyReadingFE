export const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
  
      if (result.canceled) {
        console.log('Selezione annullata');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: result.assets[0].uri,
        type: 'application/pdf',
        name: result.assets[0].name,
      });

      console.log('Caricamento file in corso...');
      const response = await fetch('http://192.168.3.28:3030/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        console.log('File caricato con successo');
        const data = await response.json();

        const socket = new WebSocket(); //TODO inserire indirizzo ws
  
        socket.onopen = () => {
          console.log('WebSocket connessa');
          socket.send(JSON.stringify());  //TODO cosa mandare alla socket
        };
  
        const waitForCheck = new Promise((resolve, reject) => {
          socket.onmessage = (event) => {
            try {
              const response = JSON.parse(event.data);
              console.log('Risposta WebSocket:', response);
  
              if (response.fileId !== null) {
                resolve(response);
                socket.close();
              }
            } catch (error) {
              reject(new Error('Errore nel parsing della risposta WebSocket'));
              socket.close();
            }
          };
  
          socket.onerror = (error) => {
            reject(new Error('Errore nella WebSocket'));
          };
        });
  
        const result = await waitForCheck;
        console.log('Elaborazione completata:', result);
        return result;
      } else {
        console.log('Errore durante il caricamento del file');
        return null;
      }
    } catch (e) {
      console.log('Errore:', e);
      Alert.alert('Errore');
      return null;
    }
  };