import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, TouchableOpacity, Text, FlatList, Modal, Image } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TrueFalseActivity({ navigation, route }) {
    const { data } = route.params;
    const [listQuestion, setListQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)

        APIActivity.Get('/activity/' + data.id + '/truefalse', VG.user_uid)
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
            <StatusBar backgroundColor='#582770' barStyle='ligth-content'/>  
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
        <FlatList data={props.item} keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{width: '30%', backgroundColor: 'red', borderBottomEndRadius: 25, borderTopEndRadius: 25, }}>
                        <Text style={style.number_question}>Questão: {item.number_question}</Text>
                    </View>             
                    <View style={{width: '90%', marginTop: 10, marginBottom: 15,}}>
                        <Text style={style.question}>{item.text}</Text>     
                        <View style={style.container_image}>
                            {
                                item.image_url == '*' 
                                ? null
                                : <Image source={{ uri: item.image_url }} style={style.image} />  
                            }                                                      
                        </View>        
                        <Text style={style.resposta}>Resposta: {item.response_user == 'true' ? 'Verdadeiro' : 'Falso'}</Text>   
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
        backgroundColor: '#582770'
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
    text_response: {
        color: 'white',
    },
    number_question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        color: '#FFF',
        fontSize: 18,
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        fontSize: 15,
        color: 'white',
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
    image:{
        width: 250,
        height: 350,
        marginTop: 25,
        borderRadius: 25,
    },
    container_image: {
        width: '100%',
        alignItems: 'center',
    },
    resposta: {
        fontWeight: 'bold',
        marginLeft: '5%',
        marginTop: '5%',
        fontSize: 15,
        color: '#32CD32',
    },
})