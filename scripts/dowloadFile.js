import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const conn = Constants.expoConfig.extra.IP_ADDRESS;
export async function dowloadUserFile(file,user){
  const fileName = file.nameFile
  
  const result = await FileSystem.downloadAsync(
    `http://${conn}:3030/download/${file.id}`,
    
    FileSystem.documentDirectory + fileName,
    {
      headers:{
        Authorization: `Bearer ${user.token}`,
      }
    }
  )
  
  save(result.uri, fileName, result.headers['Content-Type']);

}

const save = async (uri, fileName, mimeType)=>{

  if(Platform.OS === 'android'){
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if(permissions.granted){

      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimeType)
        .then( async (uri)=> {
          await FileSystem.StorageAccessFramework.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64})
        } )
        .catch((e)=>console.log(e));
    }


  }else{
    shareAsync(uri);
  }

  
}