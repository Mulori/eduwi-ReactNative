import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';


export default function Home({ navigation }) {

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#486d6e' />    
            <Text>Tela principal</Text>
        </View>    
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
})