import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useTheme } from '@/scripts/ThemeProvider';

const createToastConfig = (theme) => ({
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderColor: 'green', 
            backgroundColor: theme.header_background, 
            borderTopWidth: 1, 
            borderBottomWidth: 1, 
            borderRightWidth: 1}}
        contentContainerStyle={{ padding: 5 }}
        text1Style={{
          fontSize: 20,
          fontWeight: '400',
          color: theme['header-text'],
        }}
        text2Style={{
            fontSize: 13}}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderColor: 'red', 
            backgroundColor: theme.header_background, 
            borderTopWidth: 1, 
            borderBottomWidth: 1, 
            borderRightWidth: 1}}
        contentContainerStyle={{ padding: 5 }}
        text1Style={{
            fontSize: 20,
            fontWeight: '400',
            color: theme['header-text'],
        }}
        text2Style={{
            fontSize: 13}}
      />
    ),
  });
export default createToastConfig;