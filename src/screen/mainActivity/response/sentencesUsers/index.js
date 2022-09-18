import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

export default function SentencesUsers({ navigation, route }) {
    const { activity, user_uid, name, value, title } = route.params;
    const [listSentences, setListSentences] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)
        APIActivity.Get('/activity/' + activity + '/users/response/finished', user_uid)
        .then((questions) => {
            setListSentences(questions.data)
            console.log(questions.data)
            setModalVisible(false)
        })
        .catch(() => {
            setModalVisible(false);
            Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
        })        
    }, []) 

    return (    
        <KeyboardAvoidingView style={style.container}>
            <StatusBar backgroundColor='#582770' />             
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />                                                    
                </View>     
            </Modal>
            {
                !listSentences ? null : 
                <ListResponse item={listSentences}/>
            }            
        </KeyboardAvoidingView>    
    );
}

function ListResponse(props){
    const [commentVisible, setCommentVisible] = useState(false);
    const [numberSentence, setNumberSentence] = useState('0');
    const [IsLoadingComment, setIsLoadingComment] = useState(false);
    const [textComment, setTextComment] = useState('');

    function openComment(commentVisible, numberSentence){
        APIActivity.Get('/activity/' + props.item[0].activity_id + '/comment/' + numberSentence + '/user/' + props.item[0].user_uid, VG.user_uid)
        .then((value) => {
            setTextComment(value.data[0].comments);
        })
        .catch((erro) => {
            Alert.alert('Erro', erro);
        })

        setCommentVisible(commentVisible);
        setNumberSentence(numberSentence);
    }

    function closeComment(commentVisible, numberSentence){
        setCommentVisible(commentVisible);
        setNumberSentence(numberSentence);
        setTextComment('');
        setIsLoadingComment(false);
    }

    function Comment(){
        setIsLoadingComment(true);

        if(!textComment){
            Alert.alert('Atenção', 'O comentário não pode ser nulo.');
            setIsLoadingComment(false);
            return;
        }

        APIActivity.Put('/activity/' + props.item[0].activity_id + '/comment/' + numberSentence, VG.user_uid, { comment: textComment, user_uid: props.item[0].user_uid })
        .then(() => {
            setTextComment('');
            setCommentVisible(false);
            setIsLoadingComment(false);
        })
        .catch((erro) => {
            Alert.alert('Erro', erro)
            setIsLoadingComment(false);
        })        
    }

    return(
        <View>
            <FlatList data={props.item}  keyExtractor={item => item.id} renderItem={({ item }) => {           
                var contador = 0;
                return (
                    <View key={item} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{width: '100%', backgroundColor: '#582770', padding: 5}}>
                            <Text style={style.number_question}>Frase: {item.number_sentence}</Text>
                        </View>                                                     
                        <View style={{width: '90%', marginTop: 5, marginBottom: 15, padding: 10}}>
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
                                <Animatable.View animation='rubberBand' duration={3000} style={{ position: 'absolute', left: '100%', bottom: '145%' }}>
                                    <TouchableOpacity onPress={() => openComment(true, item.number_sentence)}>
                                        <MaterialCommunityIcons name='comment-edit' style={{ color: '#FFF', }} size={30}/>
                                    </TouchableOpacity>
                                </Animatable.View>                                                        
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
            {
                commentVisible ? 
                <TouchableOpacity
                 onPress={() => closeComment(false, numberSentence)}
                 style={{flex: 1, position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.6)', }}>
                    <View style={{flex: 1, backgroundColor: '#FFF', width: '90%', height: 300, borderRadius: 50, position: 'absolute' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => closeComment(false, numberSentence)}>
                            <View style={{ width: '85%', }}>
                                
                            </View>
                            <View style={{ width: '15%', }}>  
                                <FontAwesome name='close' size={40} style={{ color: '#582770', top: '30%',}}/>
                            </View>   
                        </TouchableOpacity>
                        <View>
                            <TextInput onChangeText={(text) => setTextComment(text)} value={textComment} label={'Insira um comentário na frase ' + numberSentence} multiline={true} maxLength={500} style={{ top: 15, backgroundColor: '#FFF', height: '80%'}} mode='outlined' />                       
                        </View>                   
                        <TouchableOpacity 
                        onPress={Comment}
                        style={{ backgroundColor: 'green', borderStartWidth: 1, borderEndWidth: 1, borderBottomWidth: 1, borderColor: '#582770', alignItems: 'center', borderBottomLeftRadius: 50, borderBottomEndRadius: 50, top: -40, height: '20%' }}>
                            {
                                IsLoadingComment 
                                ?<ActivityIndicator size="large" color="#FFF" style={{ top: 17 }} />       
                                :<Text style={{ top: 20, fontWeight: 'bold', color: '#FFF', }}>Adicionar</Text>
                            }                            
                        </TouchableOpacity>
                    </View>          
                </TouchableOpacity> 
                : null
            }  
        </View>
        
                            
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
        color: '#FFF',
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