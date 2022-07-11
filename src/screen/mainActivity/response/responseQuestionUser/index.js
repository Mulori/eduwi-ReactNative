import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import APIActivity  from '../../../../services/activityService/activityService';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VG from '../../../../components/variables/VG';
import style from './styles';

export default function responseQuestionUser({ navigation, route }) {
    const { data } = route.params;
    const [listQuestion, setListQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true)
        APIActivity.Get('/activity/' + data.id + '/users/response/finished', VG.user_uid)
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
            <StatusBar backgroundColor='#582770' barStyle='light-content' /> 
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
                    <View style={{width: '100%', marginBottom: 15, }}>
                        <Text style={style.number_question}>Questão: {item.number_question}</Text>
                    </View>                                  
                    <Text style={style.question}>{item.question}</Text>
                    <View style={{width: '90%', marginTop: 15, marginBottom: 15,backgroundColor: 'red', borderRadius: 20, }}>                        
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
                                <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold', }}>Resposta Correta</Text>
                                :
                                <Text style={{color: '#FFF', marginLeft: 10, fontWeight: 'bold',}}>Resposta Incorreta</Text>
                                }
                        </View>   
                        
                                           
                        <View style={{ alignItems: 'center'}}>
                            <Animatable.View animation='fadeIn' duration={2000} style={{
                                width: '90%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 12,
                                flexDirection: 'row',
                            }}>  
                                {
                                    item.response_user !== 'one' ? null : <FontAwesome5 style={{color: 'white', marginRight: 5}} name='user-alt' size={20} />
                                }     
                                {                        
                                    item.response_correcty == 'one' ?
                                    <Icon style={{color: 'white', marginRight: 5}} name='md-checkmark-circle-sharp' size={20}/>  :  null
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
                            }}>  
                                <View>
                                    {
                                        item.response_user !== 'two' ? null : <FontAwesome5 style={{color: 'white', marginRight: 5}} name='user-alt' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'two' ?
                                    <Icon style={{color: 'white', marginRight: 5}} name='md-checkmark-circle-sharp' size={20}/>  :  null
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
                            }}>   
                                <View>
                                    {
                                        item.response_user !== 'tree' ? null : <FontAwesome5 style={{color: 'white', marginRight: 5}} name='user-alt' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'tree' ?
                                    <Icon style={{color: 'white', marginRight: 5}} name='md-checkmark-circle-sharp' size={20}/>  :  null
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
                            }}>  
                                <View>
                                    {
                                        item.response_user !== 'four' ? null : <FontAwesome5 style={{color: 'white', marginRight: 5}} name='user-alt' size={20} />
                                    }                                    
                                </View>   
                                {                        
                                    item.response_correcty == 'four' ?
                                    <Icon style={{color: 'white', marginRight: 5}} name='md-checkmark-circle-sharp' size={20}/>  : null
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