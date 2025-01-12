import { colors_light_blue } from "@/constants/Colors";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Button, Icon, IconButton } from "react-native-paper";
import { dowloadUserFile } from "@/scripts/dowloadFile";
import { useNavigation } from "expo-router";

// @ts-ignore
export const UserFile = ({ file }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.historyContainer}>
      <TouchableOpacity style={styles.historyItem}>
        
        <Text style={styles.historyText}>{file.nameFile}</Text>

        <View style={styles.iconsContainer}>
          <IconButton  icon="file-eye"
            // @ts-ignore
           onPress={()=>navigation.navigate('summary', { file: file })} /> 

          { 
            file.fileContent && 
            <IconButton
              icon="file-download"
              onPress={() => {
                dowloadUserFile(file);
              }}/>
          } 
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  historyText: {
    fontSize: 16,
    color: colors_light_blue["text-dark"],
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
