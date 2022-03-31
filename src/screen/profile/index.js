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
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center'}}>
                    <TextInput 
                    mode='outlined' 
                    outlineColor='#3CB371'
                    onChangeText={(value) => setTitle(value)} 
                    value={!data ? null : data.name} 
                    label='Nome' style={{ 
                        width: '90%', 
                        fontWeight: 'bold', 
                        backgroundColor: '#FFF', 
                        borderColor: '#4e71ff', 
                        marginTop: 10
                    }}/>
                    <TextInput 
                    mode='outlined' 
                    outlineColor='#3CB371'
                    onChangeText={(value) => setTitle(value)} 
                    value={!data ? null : data.last_name} 
                    label='Sobrenome' 
                    style={{ 
                        width: '90%', 
                        fontWeight: 'bold', 
                        backgroundColor: '#FFF', 
                        borderColor: '#4e71ff', 
                        marginTop: 10
                    }}/>
                    <TextInput 
                    mode='outlined' 
                    outlineColor='#3CB371'
                    onChangeText={(value) => setTitle(value)} 
                    value={!data ? null : data.email} 
                    label='E-mail' 
                    style={{ 
                        width: '90%', 
                        fontWeight: 'bold', 
                        backgroundColor: '#FFF', 
                        borderColor: '#4e71ff', 
                        marginTop: 10
                    }}/>
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