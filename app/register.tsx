import { ScreenContainer } from '@/components/_screenContainer';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { register } from '../scripts/register'
import { UserContext } from '../scripts/userContext'

export default function RegisterScreen(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const { registerUser } = useContext(UserContext);
    console.log(registerUser)
    return (   
        <ScreenContainer>
            <View style={styles.homeHeader}>

            </View>
            <View style={styles.forms}>
            <TextInput 
                    placeholder="Username"
                    mode='outlined'
                    value={username}
                    onChangeText={username => setUsername(username)}
                    style={styles.textInput}
                    activeOutlineColor={'#e5383b'}/>
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

                <TextInput 
                    placeholder="Conferma password"
                    secureTextEntry={true}
                    mode='outlined'
                    value={password2}
                    onChangeText={password2 => setPassword2(password2)}
                    style={styles.textInput}
                    activeOutlineColor={'#e5383b'}/>

                <Button 
                    mode='contained' 
                    onPress={()=>register(email,password,username, registerUser)} 
                    buttonColor='#e5383b'
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