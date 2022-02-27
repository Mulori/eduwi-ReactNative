import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ImageBackground, Alert } from 'react-native';
import {NavigationActions, StackActions} from '@react-navigation/native';
import md5 from 'md5';



export default function passActivity({ navigation, route }) {
    const { activity } = route.params;
    const [passwordInformed, setPasswordInformed] = useState(null);
    const pushAction = StackActions.push('mainSearchActivity', { activity: activity});

    function Validade(){
        if(!passwordInformed){
            Alert.alert("Atenção", "Informe a senha.")
            return;
        }else{
            console.log(activity.password)
            if(md5(passwordInformed) !== activity.password){
                Alert.alert("Atenção", "Senha incorreta.")
                return;
            }

            navigation.dispatch(StackActions.replace('mainSearchActivity', { activity: activity}));
        }
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#ffac33'/>
            <ImageBackground  
                source={require('../../../assets/image/screen_lock.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />    
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ width: '80%', alignItems: 'center' }}>
                    <TextInput style={style.input} onChangeText={(value) => {setPasswordInformed(value)}} autoCapitalize='none' secureTextEntry placeholder='Digite a senha'/>
                    <TouchableOpacity onPress={Validade} style={{ width: '100%', borderRadius: 15, marginTop: '10%', padding: 15, alignItems: 'center', backgroundColor: '#d8892e' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18}}>Acessar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',        
    },
    input: {
       backgroundColor: '#aab8c2',
       padding: 15,
       fontSize: 20,
       width: '100%',
       borderRadius: 15,
       marginTop: '10%'
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
})