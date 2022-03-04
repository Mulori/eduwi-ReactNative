import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import LottieFinishBlue from '../../../../components/lotties/finishBlue';
import * as Animatable from 'react-native-animatable';

export default function PageSucess({ navigation, route }){
    const { text } = route.params;

    return(
        <View style={{flex: 1, position: 'absolute', backgroundColor: '#394FBC', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar barStyle='light-content' backgroundColor='#394FBC' /> 
            <Animatable.Text animation='fadeInUpBig' duration={1000} style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
                Resposta enviada!
            </Animatable.Text>
            <View>                    
                <LottieFinishBlue />
            </View>
        </View> 
    )
}