import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal, ImageBackground, FlatList, TextInput, Image } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainServices from '../../../../services/mainService/mainService';
import { NavigationActions, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import style from './styles';

export default function ResponseTrueFalse({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listSentences, setListSentences] = useState([]);
    
    useEffect(() => {
        setModalVisible(true);

        APIActivity.Get('/activity/' + data.id + '/truefalse', VG.user_uid)
            .then((sentences) => {
                setListSentences(sentences.data);
                //GetReward();
                setModalVisible(false);
            })
            .catch(() => {
                Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
                setModalVisible(false);
            })

    }, [])

    return (
        <View style={style.container}>
            <ImageBackground
                source={require('../../../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <StatusBar barStyle='light-content' backgroundColor='#5271ff' />
            <RenderActivity data={listSentences} user={VG.user_uid} navi={navigation} />
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            </Modal>
        </View>
    );
}

function ListResponse(props) {
    const [icons, setIcons] = useState(null);
    const [item, setItem] = useState(props.item);
    const [itemPalavra, setItemPalavra] = useState('');
    const [helpVisible, setHelpVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataReward, setDataReward] = useState(null);
    const [response, setResponse] = useState(null);

    function Rewarding(type) {
        switch (type) {
            case 7: //Dica de resposta
                setHelpVisible(true);
                break;
        }
    }

    function Reward(item) {
        // if(item[0].type.toString() == '6'){ //Espie uma resposta
        //     setType(6);
        //     setIsVisible(true); 
        // }

        if (item[0].type.toString() == '7') { //Dica de resposta
            //setType(7);
            setIsVisible(false);
            Rewarding(7);
        }

        // if(item[0].type.toString() == '5'){ //Gabarite uma atividade
        //     Rewarding(item.number_question, 5)
        // }
    }

    function UseReward(item_) {
        console.log(item_)
        if (item_.type == 7) {
            if (item.words_help == "0") {
                Alert.alert('Atenção', 'Não existe dicas para está frase.');
                return;
            }
        }

        Alert.alert(item_.name, "Deseja utilizar está recompensa?",
            [{
                text: "Sim",
                onPress: () => {
                    MainServices.Post("/reward/" + item_.id_amount + "/use", VG.user_uid, null)
                        .then((response) => {
                            GetReward();
                            Reward(response.data);
                        })
                        .catch((error) => {
                            Alert.alert('Atenção', error)
                        })
                },
            },
            {
                text: "Não",
            },
            ]
        );
    }

    const HandleSaveText = async (text, number, index) => {
        try {
            sentenca[index] = text;
            const text_json = {
                sentence: text
            }
            await AsyncStorage.setItem('@response;' + item.activity_id + ';' + number + ';' + index, JSON.stringify(text_json));
        } catch (error) {
            console.log(error);
        }
    }

    const HandleEditingField = (text) => {
        console.log(text)
    }

    function GetReward() {
        setIsLoading(true);
        MainServices.Get("/reward/users", VG.user_uid)
            .then((response) => {
                console.log(response.data);
                setDataReward(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        setIsLoading(false)
    }

    function ModalReward() {
        return (
            <View style={{ position: 'absolute', flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#FFF', height: '60%', width: '80%', borderRadius: 15 }}>
                    <View style={{ top: 5 }}>
                        {
                            isLoading ?
                                <View style={[style.containerLoad, style.horizontal]}>
                                    <ActivityIndicator size="large" color="green" />
                                </View>
                                :
                                <View>
                                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Recompensas</Text>
                                    </View>
                                    <FlatList
                                        data={dataReward}
                                        horizontal
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => {
                                            const image = { uri: item.picture };
                                            return (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={{ borderRadius: 15, marginLeft: 5 }}
                                                    onPress={() => UseReward(item)}
                                                >
                                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                                        <View style={style.containerImage}>
                                                            <ImageBackground
                                                                source={image}
                                                                style={{ width: 40, height: 40, borderRadius: 50 }}
                                                            />
                                                        </View>
                                                        <View style={{ width: '85%', alignItems: 'flex-start' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#000' }}>{item.name}</Text>
                                                            <View style={style.containerValue}>
                                                                <Text style={{ color: '#000', fontSize: 12, }}>Quantidade: {item.amount}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={{
                            backgroundColor: '#5e17eb', padding: 10, width: '100%',
                            borderBottomLeftRadius: 15, borderBottomEndRadius: 15, bottom: -1, position: 'absolute', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#FFF', }}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent' }}>
            <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#5271ff', padding: 10 }}>
                <View style={{ width: '90%', marginLeft: 5 }}>
                    <Text style={style.number_question}>Questão: {item.number_question}</Text>
                </View>
                <TouchableOpacity style={{ width: '10%' }} onPress={() => {
                    setIsVisible(true);
                    GetReward();
                }}>
                    <Icon name='game-controller' size={25} style={{ color: '#FFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', marginTop: 15, marginBottom: 15 }}>

            </View>
            <ScrollView>
                <Text style={style.question}>{item.text}</Text>
                <View style={style.container_image}>
                    <Image source={{ uri: item.image_url }} style={style.image} />
                </View>
                <View style={style.container_button_truefalse}>
                    <TouchableOpacity style={{
                        backgroundColor: 'green',
                        borderRadius: 15,
                        margin: 5,
                        width: '50%',
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            setResponse('true')
                            firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                            .update({
                                response: 'true',
                            })
                            .then()
                            .catch(() => {
                                Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                            })
                        }}
                    >
                        <Text style={style.text_response}>Verdadeiro</Text>
                        {
                            response != 'true' ? null :
                                <FontAwesome name='check-circle' style={style.icon_check} size={30} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: 'red',
                        borderRadius: 15,
                        margin: 5,
                        width: '50%',
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            setResponse('false')
                            firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                            .update({
                                response: 'false',
                            })
                            .then()
                            .catch(() => {
                                Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                            })
                        }}
                    >
                        <Text style={style.text_response}>Falso</Text>
                        {
                            response != 'false' ? null :
                                <FontAwesome name='check-circle' style={style.icon_check} size={30} />
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {
                isVisible ? <ModalReward /> : null
            }
        </View>
    )
}

class RenderActivity extends React.Component {


    _renderSlides = ({ item }) => {

        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
            .set({
                response: 'null',
            })
            .then()
            .catch((erro) => {
                console.log(erro)
                Alert.alert('Erro', 'Ocorreu um erro ao montar as questões. Tente novamente!');
            })

        return (
            <ListResponse item={item} />
        )
    };
    _renderNextButton = () => {
        return (
            <View style={style.buttonCircle}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>Próxima</Text>
                <Ionicons
                    name="arrow-forward-sharp"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={style.buttonCircle}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>Finalizar</Text>
                <Ionicons
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    render() {
        const { data, user, navi } = this.props;

        async function done() {
            firestore().collection('user_activity_' + data[0].activity_id + '_response_' + VG.user_uid).get()
                .then(querySnapshot => {
                    var bloqueia_post = false;
                    var sucess = true;
                    var index = 0;
                    var activity = {};
                    var activityArray = [];

                    querySnapshot.forEach(documentSnapshot => {
                        const valid = documentSnapshot.data()
                        if (valid.response == 'null') {
                            Alert.alert('Atenção', 'Responda todas as questões.');
                            bloqueia_post = true;
                            return;
                        }

                        index++

                        activity.activity_id = parseInt(data[0].activity_id);
                        activity.number_question = index;
                        activity.answer = valid.response;
                        activityArray.push({ ...activity });

                    });

                    console.log(bloqueia_post)
                    if (bloqueia_post) {
                        return;
                    }

                    console.log(JSON.stringify(activityArray))

                    APIActivity.Post('/activity/question/users', VG.user_uid, { activity_id: data[0].activity_id }) //Faz a postagem do cabeçalho da atividade
                        .then(() => {
                            APIActivity.Post('/activity/question/users/response', VG.user_uid, activityArray)
                                .then()
                                .catch((erro) => {
                                    sucess = false;
                                    console.log(erro)
                                    Alert.alert('Erro', 'Ocorreu um problema ao responder as questões da atividade', [{ text: 'Ok', style: 'destructive', }]);
                                })

                            if (sucess) {
                                navi.reset({
                                    index: 1,
                                    routes: [
                                        { name: 'Main' },
                                        { name: 'Sucess', params: { title: 'Resposta Enviada', avaliable: true, activity_id: data[0].activity_id }, },
                                    ],
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            Alert.alert('Erro', 'Ocorreu um problema ao enviar a resposta da atividade', [{ text: 'Ok', style: 'destructive', }]);
                        })
                })
                .catch(() => {
                    Alert.alert('Erro', 'Ocorreu um erro ao realizara leitura das respostas temporarias.');
                });           
        }

        return (
            <AppIntroSlider
                data={data}
                style={{ backgroundColor: 'transparent' }}
                renderItem={this._renderSlides}
                onDone={done}
                renderNextButton={this._renderNextButton}
                renderDoneButton={this._renderDoneButton}
            />
        );
    }
}