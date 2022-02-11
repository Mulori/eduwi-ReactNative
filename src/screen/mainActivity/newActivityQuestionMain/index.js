import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native';
import LottieCrashHeadActivity from '../../../components/lotties/crashHeadActivity'
import Icon from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../components/variables/VG';

export default function newActivityQuestionMain({ navigation }) {
    const [itens, setItens] = useState(0)
    const [title, setTitle] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const [msgErro, setMsgErro] = useState(null);

    function DeleteActivityTemp(){
        firestore()
        .collection('user_activity_build_' + VG.user_uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                firestore().collection('user_activity_build_' + VG.user_uid).doc(documentSnapshot.id).delete().then((ok) => {}).catch((error) => {});
            });

            navigation.navigate('newActivityQuestions', { itens: itens})
        })
        .catch(() => {
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

        DeleteActivityTemp();       
    }

    return(
        <View style={{flex: 1}}>
            <View style={style.container}>
                <StatusBar barStyle='light-content' backgroundColor='#008000' />
                <View style={style.view}>    
                    <ScrollView>
                        <LottieCrashHeadActivity />
                        <Text style={style.title}>Atividade de Questões</Text>   
                        <Text style={style.titles}>Nome da Atividade *</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} placeholderTextColor='#008000' maxLength={40} onChangeText={(value) => setTitle(value)} placeholder='Ex: Perguntinhas' /> 
                        </View> 
                        <Text style={style.titles}>Senha</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} secureTextEntry autoCapitalize='none' maxLength={10} onChangeText={(value) => setPassword(value)} placeholderTextColor='#008000' placeholder='****' /> 
                        </View> 
                        <Text style={style.titles}>Quantidade de Questões</Text>   
                        <View style={{alignItems: 'center'}}>
                            <TextInput style={style.inputs} onChangeText={(value) => setItens(value)} maxLength={10} keyboardType='numeric' placeholderTextColor='#008000'/> 
                        </View>     
                        <View style={{alignItems: 'center', marginTop: 30}}>
                            <TouchableOpacity onPress={handlerNext} style={{
                                backgroundColor: '#008000',
                                width: '90%',
                                alignItems: 'center',
                                padding: 15,
                            }}>
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>Proximo</Text>
                                    <Icon name='chevron-right' style={{color: '#FFF'}} size={20} />
                                </View>                            
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
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#008000'
    },
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
        color: '#008000',
    },
    titles:{
        marginLeft: '5%',
        marginTop: '5%',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#008000',
    },
    title:{
        marginTop: '5%',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#008000',
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