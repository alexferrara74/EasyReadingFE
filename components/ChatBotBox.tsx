import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Modal} from 'react-native';
import { IconButton } from 'react-native-paper'

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
        backgroundColor: '#e5383b',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    chatBotText: {
        color: '#fff',
    }
});
