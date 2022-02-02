import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, StatusBar } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function myProfile({ navigation }) {

function sair(){
    auth().signOut();
}

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#294444' />
            <Button title='Sair' onPress={sair}/>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#294444'
    }
})