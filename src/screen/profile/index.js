import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import activityServices from '../../services/activityService/activityService';
import VG from '../../components/variables/VG';
import { TextInput } from 'react-native-paper';

export default function myProfile({ navigation }) {
    const [data, setData] = useState(null);
    
    function GetUser(){
        activityServices.Get("/users", VG.user_uid)
        .then((response) => {
            setData(response.data);    
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    useEffect(() => {
        GetUser()
    }, [])

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff0e6' />
            <ImageBackground  
                source={require('../../assets/image/profile.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <View style={{ alignItems: 'center', bottom: -350}}>
                <TextInput mode='outlined' onChangeText={(value) => setTitle(value)} label={data.name} style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff'}}/>
                <TextInput mode='outlined' onChangeText={(value) => setTitle(value)} label={data.last_name} style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff'}}/>
                <TextInput mode='outlined' onChangeText={(value) => setTitle(value)} label={data.email} style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff'}}/>
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