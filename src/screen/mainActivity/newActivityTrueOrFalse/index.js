import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../components/variables/VG';
import ActivityServices from '../../../services/activityService/activityService';
import LottieFinishBlue from '../../../components/lotties/finishBlue';
import * as Animatable from 'react-native-animatable';
import ModuleStorage from '../../../services/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function newActivityQuestions({ navigation, route }) {
    const { itens, title, pass, objImage, tipoSelecionado } = route.params;
    const [end, setEnd] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [concluded, setConcluded] = useState(false);
    var slide = [];
    const _questions = [];
    const hasUnsavedChanges = Boolean(concluded);

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (concluded) {
                    return;
                }

                e.preventDefault();

                Alert.alert(
                    'Descartar alterações?',
                    'Tem certeza que deseja descartá-las e sair da tela?',
                    [
                        { text: "Não, quero continuar", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Descartar e sair',
                            style: 'destructive',
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, hasUnsavedChanges]
    );

    async function FinishEnd() {
        var data_image = {}
        setLoadingSend(true);
        firestore()
            .collection('user_activity_build_' + VG.user_uid)
            .get()
            .then(async querySnapshot => {

                if (querySnapshot.size < itens) {
                    setLoadingSend(false);
                    Alert.alert('Atenção', 'Para concluir a criação da atividade, antes conclua as questões.');
                    return;
                }

                if (objImage.assets[0].fileName) {
                    await ModuleStorage.SendFileStorage('activity/image/' + objImage.assets[0].fileName, objImage.assets[0].uri)
                        .then(async () => {
                            await ModuleStorage.GetFileStorage('activity/image/' + objImage.assets[0].fileName)
                                .then((value) => {

                                    data_image = {
                                        image_reference: 'activity/image/' + objImage.assets[0].fileName,
                                        image_url: value,
                                        image_type: objImage.assets[0].type,
                                        image_size_wh: objImage.assets[0].width + '|' + objImage.assets[0].height,
                                    }

                                })
                                .catch((error) => {
                                    setLoadingSend(false);
                                    console.log(error)
                                    return;
                                })
                        })
                        .catch((imageUrlError) => {
                            setLoadingSend(false);
                            console.log(imageUrlError)
                            return;
                        })
                }

                let data_header = {
                    title: title,
                    password: !pass ? "" : pass,
                    type_activity: 'questions',
                    image_reference: !data_image ? '' : data_image.image_reference,
                    image_url: !data_image ? '' : data_image.image_url,
                    image_type: !data_image ? '' : data_image.image_type,
                    image_size_wh: !data_image ? '' : data_image.image_size_wh,
                    difficulty_level: tipoSelecionado
                }

                ActivityServices.ActivityCreate(data_header, VG.user_uid)
                    .then((response) => {
                        querySnapshot.forEach(documentSnapshot => {
                            const obj_f = documentSnapshot.data()

                            let data_answer = {
                                activity_id: parseInt(response.data.id),
                                number_question: parseInt(obj_f.number_question),
                                answer_one: obj_f.responseOne,
                                answer_two: obj_f.responseTwo,
                                answer_tree: obj_f.responseTree,
                                answer_four: obj_f.responseFour,
                                right_answer: obj_f.question_correcty,
                                question: obj_f.question,
                            }

                            ActivityServices.ActivityQuestionCreate(data_answer, VG.user_uid)
                                .then((response) => {

                                })
                                .catch((error) => {
                                    console.log(error);
                                    setLoadingSend(false);
                                    Alert.alert('Erro', 'Ocorreu um problema ao criar uma questão da atividade', [{ text: 'Ok', style: 'destructive', }]);
                                })
                        });
                        setConcluded(true);
                        //setEnd(true);
                        setLoadingSend(false);

                        navigation.reset({
                            index: 1,
                            routes: [
                                { name: 'Main' },
                                { name: 'Sucess', params: { title: 'Atividade Criada', avaliable: false, activity_id: 0 }, },
                            ],
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoadingSend(false);
                        Alert.alert('Erro', 'Ocorreu um problema ao criar a atividade', [{ text: 'Ok', style: 'destructive', }]);
                    })
            })
            .catch(() => {
                Alert.alert('Erro', 'Ocorreu um erro ao concluir a atividade. Tente novamente!')
                setLoadingSend(false);
            });
    }   

    for (let i = 0; i < itens; i++) {
        const [showModal, setShowModal] = useState(true);
        const [Doubt, setDoubt] = useState(null);
        const [image, setImage] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const [checked, setChecked] = React.useState('one');

        async function imagePickerCallback(data) {
            setIsLoading(true);
    
            if (data.didCancel) {
                console.log(data_);
                setIsLoading(false);
                return;
            }
            if (data.assets[0].error) {
                console.log(data);
                setIsLoading(false);
                return;
            }
            if (!data.assets[0].uri) {
                console.log(data);
                setIsLoading(false);
                return;
            }
    
            setImage(data)
            setIsLoading(false);
        }

        function Finish(value, Doubt, ResponseOne, ResponseTwo, ResponseTree, ResponseFour, checked) {

            if (!Doubt || !ResponseOne || !ResponseTwo || !ResponseTree || !ResponseFour || !checked || !value) {
                Alert.alert('Atenção', 'Preencha todos os campos!');
                return;
            }

            let obj = {
                number_question: value.toString(),
                question: Doubt,
                responseOne: ResponseOne,
                responseTwo: ResponseTwo,
                responseTree: ResponseTree,
                responseFour: ResponseFour,
                question_correcty: checked
            }

            firestore().collection('user_activity_build_' + VG.user_uid).add(obj)
                .then(() => {
                    setShowModal(false);
                })
                .catch((erro) => {
                    console.log(erro)
                    Alert.alert('Erro', 'Ocorreu um erro ao concluir a questão. Tente novamente!');
                    return;
                })
        }


        slide.push(
            <View key={i + 1} style={{ backgroundColor: '#FFF', padding: 5, margin: 10, borderRadius: 15 }}>
                {
                    !showModal ?

                        <View style={{ padding: 12, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', }}>Tópico {i + 1}:  Concluida </Text>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Icon name='check-double' size={20} style={{ color: '#008000' }} />
                            </View>
                        </View>

                        :
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text>Tópico: {i + 1}</Text>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Texto:</Text>
                            <View style={{ backgroundColor: 'black', borderRadius: 15, margin: 5 }}>
                                <TextInput style={style.inputs} multiline placeholder='Digite um texto' onChangeText={(value) => setDoubt(value)} />
                            </View>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Imagem:</Text>
                            <View style={{ borderRadius: 15, margin: 5 }}>
                                <TouchableOpacity
                                    onPress={() => { launchImageLibrary({}, imagePickerCallback) }}
                                    style={style.container_input}>
                                    <Image source={!image ? require('../../../assets/image/imageNotFound.png') : { uri: image.assets[0].uri }} style={style.image} />
                                    {!isLoading ? null : <ActivityIndicator size='large' color='green' style={style.loading_image} />}
                                </TouchableOpacity>
                            </View>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Respostas:</Text>
                            <View style={{ flexDirection: 'row', width: '95%' }}>
                                <TouchableOpacity style={{
                                    backgroundColor: 'green',
                                    borderRadius: 15,
                                    margin: 5,
                                    width: '50%',
                                    height: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={style.textResponse}>Verdadeiro</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: 'red',
                                    borderRadius: 15,
                                    margin: 5,
                                    width: '50%',
                                    height: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={style.textResponse}>Falso</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => Finish(i + 1, Doubt, checked)} style={{
                                backgroundColor: '#4169E1',
                                borderRadius: 15,
                                padding: 15,
                                alignItems: 'center',
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 10,
                            }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Concluir o Tópico</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#4169E1' />
            <ScrollView>
                {slide}
                <View>
                    <TouchableOpacity
                        onPress={FinishEnd}
                        style={{
                            backgroundColor: '#32CD32',
                            padding: 15,
                            marginTop: 20,
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 15,
                            marginBottom: 15,
                            alignItems: 'center',
                        }}>
                        {
                            loadingSend
                                ? <ActivityIndicator size="large" color="white" />
                                : <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>Concluir a Atividade</Text>
                        }
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {!end ? null :
                <View style={{ flex: 1, position: 'absolute', backgroundColor: '#394FBC', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <StatusBar barStyle='light-content' backgroundColor='#394FBC' />
                    <Animatable.Text animation='fadeInUpBig' duration={1000} style={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>
                        Atividade criada!
                    </Animatable.Text>
                    <View>
                        <LottieFinishBlue />
                    </View>
                </View>
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169E1',
    },
    inputs: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
        margin: 5,
    },
    textResponse: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 15,
    },
    radioQuestion: {
        color: '#FFF'
    },
    container_input: {
        alignItems: 'center',
    },
    loading_image: {
        position: 'absolute',
        top: '50%'
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 15,
    },
})