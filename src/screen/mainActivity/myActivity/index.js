import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VG from '../../../components/variables/VG';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';

export default function myActivity({ navigation }) {
        
    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFD700' />
            <Animatable.View  animation='fadeInDownBig' duration={1000}  style={style.containerHead}>
                <Text style={style.titleHead}>Minhas atividades</Text>
                <IconFont5 style={style.iconHead} name='book' size={22} />
            </Animatable.View>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerHead: {
        backgroundColor: '#FFD700',
        height: '5%',
        flexDirection: 'row'
    },
    titleHead: {
        color: '#000',
        marginLeft: '5%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconHead: {
        marginLeft: '3%'
    }
})