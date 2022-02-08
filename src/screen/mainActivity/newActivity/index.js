import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, StatusBar } from 'react-native';


export default function newActivity({ navigation }) {
    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <Button title='Nova'/>
        </View>
        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    }
})