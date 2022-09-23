import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Image, StatusBar, Text, FlatList, Modal, Alert, TouchableOpacity } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VG from '../../../../components/variables/VG';
import style from './styles';

export default function ResponseTrueFalseUser({ navigation, route }) {
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
                    <ListResponse item={listQuestion} />
            }
        </View>
    );
}

function ListResponse(props) {

    return (
        <FlatList data={props.item} style={{ marginTop: 10, marginLeft: 1, marginRight: 1 }} keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
                <View key={item} style={{ flex: 1, alignItems: 'center' }}>
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
                    <View style={{ width: '90%', marginTop: 15, marginBottom: 15, backgroundColor: 'red', borderRadius: 20, }}>
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
                        {
                            item.comments.length == 0 ? null :
                                <Animatable.View animation='rubberBand' duration={3000} style={{ position: 'absolute', left: '90%', bottom: '80%' }}>
                                    <TouchableOpacity onPress={() => openComment(true, item.number_question)}>
                                        <MaterialCommunityIcons name='comment-edit' style={{ color: '#FFF', }} size={30} />
                                    </TouchableOpacity>
                                </Animatable.View>
                        }
                    </View>
                </View>
            );
        }}
        />
    )
}