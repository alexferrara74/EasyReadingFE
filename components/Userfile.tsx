import { colors_light_blue } from '@/constants/Colors';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { dowloadUserFile } from '@/scripts/dowloadFile';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/scripts/ThemeProvider';
import { useUser } from '@/scripts/userContext';

// @ts-ignore
export const UserFile = ({ file }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <View style={styles.historyContainer}>
      <TouchableOpacity style={styles.historyItem}>
        <Text style={[styles.historyText, { color: theme['header-text'] }]}>{file.nameFile}</Text>

        <View style={styles.iconsContainer}>
          <IconButton
            icon='file-eye'
            // @ts-ignore
            onPress={() => navigation.navigate('summary', { file: file })}
            iconColor={theme['header-text']}
          />
          {file.isFile && (
            <IconButton iconColor={theme['header-text']}
              icon='file-download'
              onPress={() => {
                dowloadUserFile(file,user);
              }}
            />
          )}
          
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  historyText: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
