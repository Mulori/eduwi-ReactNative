import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

export default function QuestionsUsers({ navigation, route }) {
    const { activity, user_uid, name, value, title } = route.params;
    const [listSentences, setListSentences] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)
        APIActivity.Get('/activity/' + activity + '/users/response/finished', user_uid)
        .then((questions) => {
            setListSentences(questions.data)
            setModalVisible(false)
        })
        .catch(() => {
            setModalVisible(false);
            Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
        })
        
    }, []) 

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#582770' /> 
            <View style={{ backgroundColor: '#582770', padding: 15, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Respostas do Participante</Text>
                        <Text style={{ color: '#FFF', fontSize: 12}}>Nome da Atividade: {title}</Text>
                        <Text style={{ color: '#FFF', fontSize: 12}}>Nome do Participante: {name}</Text>
                        <Text style={{ color: '#FFF', fontSize: 12}}>Pontuação: {value}% de acertos</Text>
                    </View>
                </View>
            </View> 
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />                                                    
                </View>     
            </Modal>
            {
                !listSentences ? null : 
                <ListResponse item={listSentences}/>
            }            
        </View>    
    );
}

function ListResponse(props){

    return(
        <FlatList data={props.item}  keyExtractor={item => item.id} renderItem={({ item }) => {
            var contador = 0;
            return (
                <View key={item} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{width: '100%', backgroundColor: '#582770', padding: 5}}>
                        <Text style={style.number_question}>Frase: {item.number_sentence}</Text>
                    </View>                                  
                    <View style={{width: '90%', marginTop: 15, marginBottom: 15, padding: 10}}>
                        <Text style={style.question}>{item.complete_sentence}</Text>
                        <View
                            style={{
                                width: '90%',
                                borderRadius: 15,
                                alignItems: 'center',
                                marginLeft: '5%',
                                marginTop: '2%',
                                backgroundColor: item.response_user == item.response_correcty ? 'green' : 'red'}}
                        >
                                {item.response_user == item.response_correcty 
                                ? 
                                <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold'}}>Resposta Correta</Text>
                                :
                                <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold'}}>Resposta Incorreta</Text>
                                }
                            <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row', width: '100%', padding: 10}}>
                            {
                                item.marked_sentence.split(' ').map((phrase, index) => {
                                    
                                    if(phrase == '??'){
                                        var sentence = item.response_user.split(';')[contador];
                                        contador++;

                                        return(
                                            <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold'}}>{sentence} </Text>
                                        )
                                    }else{
                                        return(
                                            <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold'}}>{phrase} </Text>
                                        )
                                    }                                
                                })
                            }  
                            </View> 
                        </View>      
                                                                                 
                    </View> 
                </View>
            );
        }}
        />                          
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    containerLoad: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    button_one: {
        width: '90%',
        padding: 10,
        backgroundColor: 'red',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_two: {
        width: '90%',
        padding: 10,
        backgroundColor: 'blue',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_tree: {
        width: '90%',
        padding: 10,
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_four: {
        width: '90%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    text_response: {
        color: '#000',
    },
    number_question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        fontSize: 18,
        color: '#FFF',
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '90%',
        fontSize: 15,
    },
    buttonCircle: {
        width: 110,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
})