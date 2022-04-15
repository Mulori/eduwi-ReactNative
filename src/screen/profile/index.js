import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, FlatList } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import activityServices from '../../services/activityService/activityService';
import VG from '../../components/variables/VG';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function myProfile({ navigation }) {
    const [data, setData] = useState(null);
    const [dataReward, setDataReward] = useState(null);
    
    function GetUser(){
        activityServices.Get("/users", VG.user_uid)
        .then((response) => {
            setData(response.data);                
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function GetReward(){
        activityServices.Get("/reward/users", VG.user_uid)
        .then((response) => {
            setDataReward(response.data);    
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    useEffect(() => {
        GetUser()
        GetReward()
    }, [])

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center'}}>
                    <TextInput 
                    mode='outlined' 
                    outlineColor='#3CB371'
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
            {
                !dataReward ? null :
                dataReward.length == 0 ? null :
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 15}}>Minhas Recompensas</Text>
                    <FlatList 
                        data={dataReward} 
                        horizontal
                        style={{ marginLeft: 20, marginTop: 15}}
                        keyExtractor={item => item.id} 
                        renderItem={({ item }) => {
                            const image = { uri: item.picture };

                            return (                             
                                <Animatable.View key={item.id} duration={2000} animation='bounceInDown' style={{backgroundColor: '#3CB371', borderRadius: 15, padding: 25, margin: 5, }}>
                                    <View style={style.containerImage}>      
                                        <ImageBackground  
                                            source={image} 
                                            style={{width: 80, height: 80}}  
                                        />                        
                                    </View>  
                                    <Text style={{fontWeight: 'bold', fontSize: 18, color: '#FFF'}}>{item.name}</Text>
                                    <View style={style.containerValue}>                      
                                        <Text style={{color: '#FFF', fontWeight: 'bold', marginLeft: 5}}>Quantidade: {item.amount}</Text>  
                                    </View>                                 
                                </Animatable.View>      
                            );
                        }}
                    />   
                </View>
            }
            
        </View>  
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerImage: {
        borderRadius: 10,
        alignItems: 'center',
    },
    containerValue: {
        alignItems: 'center',
    },  
})