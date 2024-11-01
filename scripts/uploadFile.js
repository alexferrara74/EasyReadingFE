import * as DocumentPicker from 'expo-document-picker';

export const uploadFile = async () => {
    try{
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
        const response = await fetch('http://192.168.18.28:3030/upload', {
            method: 'POST',
            body: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        if (response.ok)
        {
            console.log("ok");
            const data = await response.json();
            // TODO: Aggiundere il redirect al componente del riassunto
        }
    }catch(e)
    {
        console.log(e);
        Alert.alert("Errore");
    }
};