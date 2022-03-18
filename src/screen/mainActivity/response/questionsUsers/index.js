import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';


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
                    <View style={{ width: '80%' }}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>Respostas do Participante</Text>
                        <Text style={{ color: '#FFF', fontSize: 12, marginBottom: 10}}>Nome: {name}</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#FFF', fontSize: 20}}>{value}%</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: 'red', borderWidth: 3, borderColor: 'green', padding: 4, borderRadius: 10, width: '40%', alignItems: 'center'}}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Respondida</Text>
                    </View>
                    <View style={{ backgroundColor: 'green', borderWidth: 3, padding: 4, borderRadius: 10, borderColor: 'green', width: '40%', marginLeft: '10%', alignItems: 'center'}}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Correta</Text>
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
                    
                        <View style={{ alignItems: 'center'}}>
                            <Animatable.View animation='fadeIn' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: item.response_correcty == 'one' ? 'green' : 'red',
                                borderWidth: item.response_user == 'one' ? 5 : 0,
                                borderColor: item.response_user == 'one' ? 'green' : 'red',
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row'
                            }}>                      
                                <Text style={style.text_response}>
                                    {item.answer_one}
                                </Text>      
                            </Animatable.View>
                            <Animatable.View animation='fadeInDown' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: item.response_correcty == 'two' ? 'green' : 'red',
                                borderWidth: item.response_user == 'two' ? 5 : 0,
                                borderColor: item.response_user == 'two' ? 'green' : 'red',
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row'
                            }}>  
                                <Text style={style.text_response}>
                                    {item.answer_two}
                                </Text>                    
                            </Animatable.View>
                            <Animatable.View animation='fadeInDownBig' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: item.response_correcty == 'tree' ? 'green' : 'red',
                                borderWidth: item.response_user == 'tree' ? 5 : 0,
                                borderColor: item.response_user == 'tree' ? 'green' : 'red',
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row'
                            }}>   
                                <Text style={style.text_response}>
                                    {item.answer_tree}
                                </Text>                     
                            </Animatable.View>
                            <Animatable.View animation='fadeInUp' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: item.response_correcty == 'four' ? 'green' : 'red',
                                borderWidth: item.response_user == 'four' ? 5 : 0,
                                borderColor: item.response_user == 'four' ? 'green' : 'red',
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row'
                            }}>  
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
        color: '#FFF',
        fontWeight: 'bold',
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