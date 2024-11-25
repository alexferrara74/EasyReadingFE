import { colors_light_blue } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export function ChatBotBox() 
{
    return (
        <View style={style.chatBotBubble}>
            <Text style={style.chatBotText}>Ciao, come posso aiutarti?</Text>
        </View>
    );
}

const style = StyleSheet.create({
    chatBotBubble: {
        backgroundColor: colors_light_blue.accent,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    chatBotText: {
        color: '#fff',
    }
});
