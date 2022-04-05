import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import VG from '../../components/variables/VG';

export default function Game({ navigation }) {

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center'}}>

            </View>
        </View>  
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})