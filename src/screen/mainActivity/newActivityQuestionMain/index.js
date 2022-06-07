import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import LottieCrashHeadActivity from '../../../components/lotties/crashHeadActivity'
import Icon from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../components/variables/VG';

export default function newActivityQuestionMain({ navigation, route }) {
    const { types } = route.params;
    const [activity, setActivity] = useState({})
    const [itens, setItens] = useState(0)
    const [title, setTitle] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const [msgErro, setMsgErro] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        switch(types){
            case 1:
                setActivity({ bigTitle: 'Atividade de Questões', sType: 'Questões', placeholder: 'Ex: Perguntinhas', main_color: '#008000'})
                break;  
            case 2:
                setActivity({ bigTitle: 'Atividade Complete a Frase', sType: 'Frases', placeholder: 'Ex: Complete os verbos', main_color: '#D2691E'})
                break;  
        }
    }, [])

    function DeleteActivityTemp(){
        firestore()
        .collection('user_activity_build_' + VG.user_uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                firestore().collection('user_activity_build_' + VG.user_uid).doc(documentSnapshot.id).delete().then((ok) => {}).catch((error) => {});
            });

            if(types == 1){
                setIsLoading(false);
                navigation.navigate('newActivityQuestions', { itens: itens, title: title, pass: password, type: types})
            }else if(types == 2){
                setIsLoading(false);
                navigation.navigate('newActivitySentence', { itens: itens, title: title, pass: password, type: types})
            }            
        })
        .catch(() => {
            setIsLoading(false);
            Alert.alert('Erro', 'Ocorreu um erro realizar a limpeza de atividades temporarias.');
        }); 
    }

    function handlerNext(){

        if(!title){
            setMsgErro('Informe o nome da atividade.')
            setError(true);
            return;
        }
        else{
            setMsgErro(null)
            setError(false);
        }

        if(!itens){
            setMsgErro('Informe a quantidade de questões.')
            setError(true);
            return;
        }
        else{
            if(itens < 1){
                setMsgErro('A quantidade de questões não pode ser igual a zero.')
                setError(true);
                return;
            }
            else{
                setMsgErro(null)
                setError(false);
            }            
        }

        setIsLoading(true);
        DeleteActivityTemp();       
    }

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: activity.main_color,  alignItems: 'center', }}>
                <StatusBar barStyle='light-content' backgroundColor={activity.main_color} />
                <View style={style.view}>    
                    <ScrollView>
                        <LottieCrashHeadActivity />
                        <Text style={{marginTop: '5%', fontSize: 25, fontWeight: 'bold', textAlign: 'center',  color: activity.main_color}}>{activity.bigTitle}</Text>   
                        <Text style={{marginLeft: '5%', marginTop: '5%', fontSize: 15, fontWeight: 'bold', color: activity.main_color}}>Nome da Atividade *</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} placeholderTextColor={activity.main_color} maxLength={40} onChangeText={(value) => setTitle(value)} placeholder={activity.placeholder} /> 
                        </View> 
                        <Text style={{marginLeft: '5%', marginTop: '5%', fontSize: 15, fontWeight: 'bold', color: activity.main_color}}>Senha (opcional)</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} secureTextEntry autoCapitalize='none' maxLength={10} onChangeText={(value) => setPassword(value)} placeholderTextColor='#008000' /> 
                        </View> 
                        <Text style={{marginLeft: '5%', marginTop: '5%', fontSize: 15, fontWeight: 'bold', color: activity.main_color}}>Quantidade de {activity.sType} *</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} onChangeText={(value) => setItens(value)} maxLength={10} keyboardType='numeric' placeholderTextColor='#008000'/> 
                        </View>     
                        <View style={{alignItems: 'center', marginTop: 30}}>
                            <TouchableOpacity onPress={handlerNext} style={{
                                backgroundColor: activity.main_color,
                                width: '90%',
                                alignItems: 'center',
                                borderRadius: 13,
                                padding: 15,
                            }}>
                                    {
                                        !isLoading 
                                        ?
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Proximo</Text>
                                            <Icon name='chevron-right' style={{color: '#FFF'}} size={20} />
                                        </View>                                        
                                        :
                                        <View>
                                            <ActivityIndicator size="large" color="#FFF" /> 
                                        </View>
                                    }                     
                            </TouchableOpacity>
                        </View>                      
                    </ScrollView>                            
                </View>                
            </View>  
            { !error ? null : 
                <Animatable.View  animation="fadeInLeft" duration={500} style={style.containerError}>                
                    <Text style={style.textMsg}>{msgErro}</Text>
                </Animatable.View>
            }  
        </View>
    );
}

const style = StyleSheet.create({
    view:{
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '90%',
        height: '80%',
        padding: 10,
    },
    inputs:{
        borderBottomWidth: 1,
        width: '90%',
        color: '#000000',
    },
    containerError:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'red',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
})