import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';

export default function myCommunity() {
    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#294444' />
            <Text>Lista de community pertencentes</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})