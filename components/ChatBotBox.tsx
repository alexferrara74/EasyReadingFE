import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/scripts/ThemeProvider';

export function ChatBotBox() {
  const { theme } = useTheme();

  return (
    <View style={[style.chatBotBubble, { backgroundColor: theme.accent }]}>
      <Text style={{ color: theme['header-text'] }}>Ciao, come posso aiutarti?</Text>
    </View>
  );
}

const style = StyleSheet.create({
  chatBotBubble: {
    padding: 10,
    paddingHorizontal: 30,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginVertical: 5,
    borderRadius: 15,
  },
});
