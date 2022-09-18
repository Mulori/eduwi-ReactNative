import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageEditor } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import style from './styles';

export default function ResponseSentenceUser({ navigation, route }) {
    const { data } = route.params;
    const [listSentences, setListSentences] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)
        APIActivity.Get('/activity/' + data.id + '/sentences', VG.user_uid)
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
            <StatusBar backgroundColor='#582770' barStyle='ligth-content'/>             
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
    return(
        <View>
            <FlatList data={props.item}  keyExtractor={item => item.id} renderItem={({ item }) => {       
                return (
                    <View key={item.id} style={style.container_item_list}>
                        <View style={style.container_phrase}>
                            <Text style={style.number_question}>Frase: {item.number_sentence}</Text>
                        </View>                                                     
                        <View style={{width: '90%', marginTop: 5, marginBottom: 15, padding: 10}}>
                            <Text style={style.question}>{item.complete_sentence}</Text>                                                
                        </View>                                        
                    </View>                
                );
            }}            
            />
        </View>            
    )
}
