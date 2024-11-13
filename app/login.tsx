import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


export function LoginScreen(){
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        
        <View style={styles.container}>
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
                    onPress={()=>console.log(email,password)} 
                    buttonColor='#e5383b'
                    style={styles.buttonForm}>
                        Accedi
                </Button>
                <Button 
                    mode='contained' 
                     // @ts-ignore
                    onPress={() => navigation.navigate('Register')} 
                    buttonColor='gray'
                    style={styles.buttonForm}>
                       Registrati
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#232725',
        
    },

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