import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

export default function QuestionsUsers({ navigation, route }) {
    const { activity, user_uid, name, value } = route.params;
    const [listQuestion, setListQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)
        APIActivity.Get('/activity/' + activity + '/users/response/finished', user_uid)
        .then((questions) => {
            setListQuestions(questions.data)
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
            <View style={{ backgroundColor: '#582770', padding: 15, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomEndRadius: 20}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Respostas do Participante</Text>
                        <Text style={{ color: '#FFF', fontSize: 12}}>Nome: {name}</Text>
                        <Text style={{ color: '#FFF', fontSize: 12}}>{value}% de acertos</Text>
                    </View>
                </View>
            </View> 
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />                                                    
                </View>     
            </Modal>
            {
                !listQuestion ? null : 
                <ListResponse item={listQuestion}/>
            }            
        </View>    
    );
}

function ListResponse(props){

    return(
        <FlatList data={props.item} style={{marginTop: 10, marginLeft: 1, marginRight: 1}} keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
                <View key={item} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{width: '90%'}}>
                        <Text style={style.number_question}>Questão: {item.number_question}</Text>
                    </View>                                  
                    <View style={{width: '90%', marginTop: 15, marginBottom: 15}}>
                        <Text style={style.question}>{item.question}</Text>
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
                                <Text style={{color: '#FFF', marginLeft: 10}}>Resposta Correta</Text>
                                :
                                <Text style={{color: '#FFF', marginLeft: 10}}>Resposta Incorreta</Text>
                                }
                        </View>   
                        
                                           
                        <View style={{ alignItems: 'center'}}>
                            <Animatable.View animation='fadeIn' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                            }}>  
                                <View>
                                    {
                                        item.response_user !== 'one' ? null : <Icon style={{color: '#582770'}} name='md-return-down-forward' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'one' ?
                                    <Icon style={{color: 'green'}} name='md-checkmark-circle-sharp' size={20}/>  :  <Icon style={{color: 'red'}} name='md-close-circle-sharp' size={20}/>
                                }              
                                <Text style={style.text_response}>
                                    {item.answer_one}
                                </Text>                                                                  
                            </Animatable.View>
                            <Animatable.View animation='fadeInDown' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                            }}>  
                                <View>
                                    {
                                        item.response_user !== 'two' ? null : <Icon style={{color: '#582770'}} name='md-return-down-forward' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'two' ?
                                    <Icon style={{color: 'green'}} name='md-checkmark-circle-sharp' size={20}/>  :  <Icon style={{color: 'red'}} name='md-close-circle-sharp' size={20}/>
                                }  
                                <Text style={style.text_response}>
                                    {item.answer_two}
                                </Text>                    
                            </Animatable.View>
                            <Animatable.View animation='fadeInDownBig' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                            }}>   
                                <View>
                                    {
                                        item.response_user !== 'tree' ? null : <Icon style={{color: '#582770'}} name='md-return-down-forward' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'tree' ?
                                    <Icon style={{color: 'green'}} name='md-checkmark-circle-sharp' size={20}/>  :  <Icon style={{color: 'red'}} name='md-close-circle-sharp' size={20}/>
                                }  
                                <Text style={style.text_response}>
                                    {item.answer_tree}
                                </Text>                     
                            </Animatable.View>
                            <Animatable.View animation='fadeInUp' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                            }}>  
                                <View>
                                    {
                                        item.response_user !== 'four' ? null : <Icon style={{color: '#582770'}} name='md-return-down-forward' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'four' ?
                                    <Icon style={{color: 'green'}} name='md-checkmark-circle-sharp' size={20}/>  :  <Icon style={{color: 'red'}} name='md-close-circle-sharp' size={20}/>
                                }   
                                <Text style={style.text_response}>
                                    {item.answer_four}
                                </Text>                    
                            </Animatable.View>
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
        backgroundColor: '#FFF'
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