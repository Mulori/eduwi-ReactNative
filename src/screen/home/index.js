import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, TouchableOpacity, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function Home({ navigation }) {

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#486d6e' />    
            <Text>Tela principal</Text>
            <Button title='signout' onPress={() => {
                    auth().signOut();
            }} />
        </View>    
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
})