import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';

const ModalMenu = () => {
    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#294444' />
            <Text>Menu</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: 50,
        width: '85%',
        height: 250,
        borderRadius: 25,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 3
    }
})

export default ModalMenu