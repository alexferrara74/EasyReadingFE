import { ScreenContainer } from '@/components/_screenContainer';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { login } from '../scripts/login';
import { UserContext, useUser } from '../scripts/userContext';

export default function LoginScreen(){
 
    const  { user }  = useUser();

    console.log('USER BAABYY', user)
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScreenContainer>
            <View style={styles.homeHeader}>

            </View>
            <View style={styles.forms}>
                <TextInput 
                    placeholder="Email"
                    mode='outlined'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.textInput}
                    activeOutlineColor={'#e5383b'}/>
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    mode='outlined'
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={styles.textInput}
                    activeOutlineColor={'#e5383b'}/>

                <Button 
                    mode='contained' 
                    onPress={()=>login(email,password/*,logIn */)} 
                    buttonColor='#e5383b'
                    style={styles.buttonForm}>
                        Accedi
                </Button>
                <Button 
                    mode='contained' 
                     // @ts-ignore
                    onPress={() => navigation.navigate('register')} 
                    buttonColor='gray'
                    style={styles.buttonForm}>
                       Registrati
                </Button>
            </View>
        </ScreenContainer>
    )
}


const styles = StyleSheet.create({
    textInput: {
        width: '70%',
        marginBottom: '10%'
    },

    buttonForm: {
        marginBottom: '10%',
        width: '70%',
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
    },
    homeHeader: {
        paddingTop: 100,
        backgroundColor: '#161d19',
        paddingBottom: 20,
        paddingHorizontal: 20,
        width: '100%'
    },
    forms:{
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        
    }
})