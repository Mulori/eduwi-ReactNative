import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import LottieMonster from '../../components/lotties/monster';


export default function Welcome({ navigation }) {

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#486d6e' />            
            <ImageBackground  
                source={require('../../assets/image/background-welcome.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <LottieMonster />
            <Text style={style.title}>EDUWI</Text>
            <View style={style.containerSignin}>
                <TouchableOpacity onPress={() => {navigation.navigate('Login');}} style={style.backsignin}>
                    <Text style={style.text}>Já possuo uma conta</Text>                
                </TouchableOpacity>
            </View>
            <View style={style.containerSignUp}>
                <TouchableOpacity onPress={() => {navigation.navigate('Register');}} style={style.backsignup}>
                    <Text style={style.text}>Criar minha conta</Text>                
                </TouchableOpacity>
            </View>
        </View>    
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
    backsignin: {
        backgroundColor: '#fae5d9',
        width: '60%',
        marginTop: '80%',
        padding: 10,
        borderBottomEndRadius: 15,
        borderTopEndRadius: 15,
    },
    backsignup: {
        backgroundColor: '#d2583a',
        width: '60%',
        marginTop: 30,
        padding: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    text:{
        fontSize: 18,
        paddingLeft:5,
        paddingEnd: 5,
    },
    containerSignUp:{
        alignItems: 'flex-end'
    },
    containerSignin:{
        alignItems: 'flex-start'
    },
    title:{
        fontSize: 50,
        textAlign: 'center',
    }
})