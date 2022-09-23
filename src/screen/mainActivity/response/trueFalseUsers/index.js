import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, TextInput, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity, Image } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './styles';
import VG from '../../../../components/variables/VG';


export default function TrueFalseUsers({ navigation, route }) {
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
            <StatusBar backgroundColor='#582770' barStyle='light-content' />
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            </Modal>
            {
                !listQuestion ? null :
                    <ListResponse item={listQuestion} />
            }
        </View>
    );
}

function ListResponse(props) {
    const [commentVisible, setCommentVisible] = useState(false);
    const [numberSentence, setNumberSentence] = useState('0');
    const [IsLoadingComment, setIsLoadingComment] = useState(false);
    const [textComment, setTextComment] = useState('');

    function openComment(commentVisible, numberSentence) {
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

    function closeComment(commentVisible, numberSentence) {
        setCommentVisible(commentVisible);
        setNumberSentence(numberSentence);
        setTextComment('');
        setIsLoadingComment(false);
    }

    function Comment() {
        setIsLoadingComment(true);

        if (!textComment) {
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

    return (
        <View>
            <FlatList data={props.item} style={{ marginTop: 10, marginLeft: 1, marginRight: 1 }} keyExtractor={item => item.id} renderItem={({ item, index }) => {
                return (
                    <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '100%', marginBottom: 15, }}>
                            <Text style={style.number_question}>Questão: {item.number_question}</Text>
                        </View>
                        <Text style={style.question}>{item.text}</Text>
                        <View style={style.container_image}>
                                {
                                    item.image_url == '*' 
                                    ? null
                                    : <Image source={{ uri: item.image_url }} style={style.image} />  
                                }                                                      
                            </View> 
                        <View style={{ width: '90%', marginTop: 15, marginBottom: 15, backgroundColor: 'red', borderRadius: 20,  }}>
                            <View
                                style={{
                                    width: '90%',
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    marginLeft: '5%',
                                    marginTop: '2%',
                                    backgroundColor: item.response_user == item.response_correcty ? 'green' : 'red'
                                }}
                            >
                                {item.response_user == item.response_correcty
                                    ?
                                    <Text style={{ color: '#FFF', marginLeft: 10, fontWeight: 'bold', }}>Resposta Correta</Text>
                                    :
                                    <Text style={{ color: '#FFF', marginLeft: 10, fontWeight: 'bold', }}>Resposta Incorreta</Text>
                                }
                            </View>                            
                            <Text style={style.number_question}>Resposta: {item.response_user == 'true' ? 'Verdadeiro' : 'Falso'}</Text>
                            <Animatable.View animation='rubberBand' duration={3000} style={{ position: 'absolute', left: '90%', bottom: '80%' }}>
                                <TouchableOpacity onPress={() => openComment(true, item.number_question)}>
                                    <MaterialCommunityIcons name='comment-edit' style={{ color: '#FFF', }} size={30} />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>
                );
            }}
            />
            {
                commentVisible ?
                    <TouchableOpacity
                        onPress={() => closeComment(false, numberSentence)}
                        style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.6)', }}>
                        <View style={{ flex: 1, backgroundColor: '#FFF', width: '90%', height: 300, borderRadius: 50, position: 'absolute' }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => closeComment(false, numberSentence)}>
                                <View style={{ width: '85%', }}>

                                </View>
                                <View style={{ width: '15%', }}>
                                    <FontAwesome name='close' size={40} style={{ color: '#582770', top: '30%', }} />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TextInput onChangeText={(text) => setTextComment(text)} value={textComment} label={'Insira um comentário na frase ' + numberSentence} multiline={true} maxLength={500} style={{ top: 15, backgroundColor: '#FFF', height: '80%' }} mode='outlined' />
                            </View>
                            <TouchableOpacity
                                onPress={Comment}
                                style={{ backgroundColor: 'green', borderStartWidth: 1, borderEndWidth: 1, borderBottomWidth: 1, borderColor: '#582770', alignItems: 'center', borderBottomLeftRadius: 50, borderBottomEndRadius: 50, top: -40, height: '20%' }}>
                                {
                                    IsLoadingComment
                                        ? <ActivityIndicator size="large" color="#FFF" style={{ top: 17 }} />
                                        : <Text style={{ top: 20, fontWeight: 'bold', color: '#FFF', }}>Adicionar</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    : null
            }
        </View>

    )
}