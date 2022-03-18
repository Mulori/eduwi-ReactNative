import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, TouchableOpacity, Text, FlatList, Modal, ScrollView } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';


export default function QuestionsActivity({ navigation, route }) {
    const { data } = route.params;
    const [listQuestion, setListQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)

        APIActivity.Get('/activity/' + data.id + '/response', VG.user_uid)
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
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Respostas da Questão</Text>
                <View style={{ flexDirection: 'row'}}>
                    <Animatable.View animation='bounce' duration={2000} style={{ backgroundColor: 'green', borderWidth: 3, borderColor: 'green', padding: 4, borderRadius: 10, width: '40%', alignItems: 'center'}}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Correta</Text>
                    </Animatable.View>
                    <Animatable.View animation='bounce' duration={2000} style={{ backgroundColor: 'red', borderWidth: 3, padding: 4, borderRadius: 10, borderColor: 'red', width: '40%', marginLeft: '10%', alignItems: 'center'}}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Incorreta</Text>
                    </Animatable.View>
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
        <FlatList data={props.item} style={{margin: 5}} keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{width: '90%'}}>
                        <Text style={style.number_question}>Questão: {item.number_question}</Text>
                    </View>                
                    <View style={{width: '90%', marginTop: 15, marginBottom: 15}}>
                        <Text style={style.question}>{item.question}</Text>
                    
                        <View style={{ alignItems: 'center'}}>
                            <Animatable.View animation='fadeIn' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: item.right_answer == 'one' ? 'green' : 'red',
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
                                backgroundColor: item.right_answer == 'two' ? 'green' : 'red',
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
                                backgroundColor: item.right_answer == 'tree' ? 'green' : 'red',
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
                                backgroundColor: item.right_answer == 'four' ? 'green' : 'red',
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