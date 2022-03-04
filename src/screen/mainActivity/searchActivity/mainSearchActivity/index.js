import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VG from '../../../../components/variables/VG';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

export default function mainSearchActivity({ navigation, route }) {
    const { activity } = route.params;
    const [tipo, setTipo] = useState('');
    const [isVisibleButton, setIsVisibleButton] = useState(true);

    useEffect(() => {        
        switch(activity.type_activity) { 
            case 'questions':             
                setTipo('Questões')
                break;        
        }
    }, [])

    function DeleteActivityTemp(){
        firestore().collection('user_activity_' + activity.id + '_response_' + VG.user_uid).get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                firestore().collection('user_activity_' + activity.id + '_response_' + VG.user_uid).doc(documentSnapshot.id).delete().then((ok) => {}).catch((error) => {});
            });
            setIsVisibleButton(false);
            navigation.dispatch(StackActions.replace('responseQuestion', { data: activity}));
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro realizar a limpeza de atividades temporarias.');
        }); 
    }

    function Start(){
        DeleteActivityTemp();
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#f3f5f7'/>
            <ImageBackground  
                source={require('../../../../assets/image/activity.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <View>
                <View style={{ alignItems: 'flex-start', width: '90%', marginTop: '10%', padding: '8%'}}>
                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Nome da Atividade:</Text>
                    <Text style={{color: '#FFF'}}>{ !activity ? null : activity.title}</Text>
                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 5}}>Nome do(a) Autor(a):</Text>
                    <Text style={{color: '#FFF'}}>{ !activity ? null : activity.name}</Text> 
                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 5}}>Tipo:</Text>
                    <Text style={{color: '#FFF'}}>{tipo}</Text>                                                                   
                </View>  
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity 
                    onPress={Start}
                    style={{ padding: 10, backgroundColor: '#20683c', width: '50%', alignItems: 'center', marginTop: '13%', borderRadius: 20}}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Iniciar</Text>
                            <Icon name='angle-right' size={18} style={{ marginLeft: '3%', color: '#FFF' }}/>
                        </View>                                        
                    </TouchableOpacity>               
                </View>
            </View>      
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF'
    }
})