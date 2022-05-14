import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Welcome({ navigation }) {

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#1b3d1c' />            
            <ImageBackground  
                source={require('../../assets/image/welcome.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <Animatable.View animation='bounceInLeft' duration={2000} style={style.containerSignin}>
                <TouchableOpacity onPress={() => {navigation.navigate('Login');}} style={style.backsignin}>
                    <Text style={style.text}>Já possuo uma conta</Text>                
                </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation='bounceInRight' duration={2000} style={style.containerSignUp}>
                <TouchableOpacity onPress={() => {navigation.navigate('Register');}} style={style.backsignup}>
                    <Text style={style.text}>Criar minha conta</Text>                
                </TouchableOpacity>
            </Animatable.View>
        </View>    
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
    backsignin: {
        backgroundColor: '#5e17eb',
        width: '60%',
        marginTop: '5%',
        padding: 10,
        borderBottomEndRadius: 15,
        borderTopEndRadius: 15,
    },
    backsignup: {
        backgroundColor: '#f97d25',
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
        color: '#FFF',
        fontWeight: 'bold',
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