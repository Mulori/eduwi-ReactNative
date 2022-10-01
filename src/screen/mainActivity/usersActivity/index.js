import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList, Modal, Alert, ActivityIndicator, Image, ImageEditor } from 'react-native';
import activityServices from '../../../services/activityService/activityService';
import MainService from '../../../services/mainService/mainService';
import VG from '../../../components/variables/VG';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LottieConfig from '../../../components/lotties/config';
import { TextInput } from 'react-native-paper';
import { Buffer } from 'buffer'
import Share from 'react-native-share';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ModuleStorage from '../../../services/storage';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default function UsersActivity({ navigation, route }) {
    const { activity } = route.params;
    const [data, setData] = useState(null);
    const [modalMenu, setModalMenu] = useState(false);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState(null);
    const [pass, setPass] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewAvatar, setViewAvatar] = useState(false);
    const [image, setImage] = useState(null);
    const months = ["JAN", "FEB", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    async function imagePickerCallback(data_) {
        if (data_.didCancel) {
            console.log(data_);
            return;
        }
        if (data_.assets[0].error) {
            console.log(data_);
            return;
        }
        if (!data_.assets[0].uri) {
            console.log(data_);
            return;
        }

        setViewAvatar(false)
        setIsLoading(true);

        await ModuleStorage.SendFileStorage('activity/image/' + data_.assets[0].fileName, data_.assets[0].uri)
            .then(async () => {
                await ModuleStorage.GetFileStorage('activity/image/' + data_.assets[0].fileName)
                    .then(async (value) => {
                        if (data.image_url) {
                            const retorno = await ModuleStorage.DeleteStorage(data.image_url);
                        }

                        let data_image = {
                            image_reference: 'activity/image/' + data_.assets[0].fileName,
                            image_url: value,
                            image_type: data_.assets[0].type,
                            image_size_wh: data_.assets[0].width + '|' + data_.assets[0].height,
                        }

                        await UpdateImage(data_image).then(() => {
                            setImage(value.toString())
                            setIsLoading(false);
                        })
                            .catch((error) => {
                                console.log(error)
                                setIsLoading(false);
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        setIsLoading(false);
                    })
            })
            .catch((imageUrlError) => {
                setIsLoading(false);
                console.log(imageUrlError)
            })
    }

    async function UpdateImage(data_) {
        await MainService.Put('/activity/image/' + activity.id, VG.user_uid, data_)
            .then((response) => {
                console.log(response);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }


    const formatDate = (date) => {
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        return formatted_date;
    }

    const openShared = async () => {
        const shareOption = {
            message: "EDUWI - Você acaba de receber o código de uma atividade: " + code + ""
        }

        try {
            const send = await Share.open(shareOption);
        }
        catch {

        }
    }

    function GetUsers() {
        activityServices.Get('/activity/' + activity.id + '/users/concluded', VG.user_uid)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function AlterarTitle() {
        if (!title) {
            Alert.alert('Atenção', 'Informe um titulo.');
            return;
        }

        activityServices.Put('/activity/' + activity.id + '/title', VG.user_uid, { title: title.trim() })
            .then((response) => {
                navigation.pop();
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    function AlterarPass() {
        if (!pass) {
            setPass('');
        } else {
            setPass(pass.trim());
        }

        activityServices.Put('/activity/' + activity.id + '/password', VG.user_uid, { password: pass })
            .then((response) => {
                navigation.pop();
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }

    function ShowResponse() {
        setIsLoading(true);

        if (!data) {
            setIsLoading(false);
            return;
        }

        data.map(element => {
            console.log(element);

            activityServices.Put('/activity/' + activity.id + '/display/user', VG.user_uid, { user_uid: element.user_uid })
                .then((response) => {

                })
                .catch((error) => {
                    Alert.alert(error)
                })
        });

        setIsLoading(false);
    }

    useEffect(() => {
        setCode(Buffer.from(activity.id.toString(), 'utf-8').toString('base64'))
        GetUsers();
        setImage(activity.image_url)
    }, [])

    function Header(props) {
        const [title, setTitle] = useState(props.title);

        return (
            <View style={{ backgroundColor: '#582770', padding: 10, alignItems: 'center', borderRadius: 15, borderBottomWidth: 1, borderBottomColor: '#FFF', flexDirection: 'row' }}>
                <View style={{ width: '90%' }}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19 }}>{title}</Text>
                    <TouchableOpacity style={{ backgroundColor: 'orange', borderRadius: 15, alignItems: 'center' }} onPress={() => openShared(data, code)} >
                        <Text style={{ color: '#582770', fontSize: 15, fontWeight: 'bold' }}>Compartilhar código: {code}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '10%' }}>
                    <TouchableOpacity onPress={() => { setModalMenu(true) }}>
                        <Icon name='menu' size={35} style={{ color: '#FFF' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#582770' }}>
            <View >
                <StatusBar barStyle='ligth-content' backgroundColor='#582770' />
                <Header title={activity.title} />
            </View>
            <View style={style.container}>
                <FlatList style={{ height: '88%', borderRadius: 20 }} data={data} keyExtractor={item => item.id} renderItem={({ item }) => {
                    var date = new Date(item.created);
                    return (
                        <View key={item.id} style={{ backgroundColor: '#FFF', margin: 10, borderRadius: 15 }}>
                            <TouchableOpacity key={item.id}
                                onPress={() => {
                                    if (activity.type_activity == 'questions') {
                                        navigation.navigate('QuestionsUsers', { activity: item.activity_id, user_uid: item.user_uid, name: item.full_name, value: item.value, title: activity.title })
                                    } else if (activity.type_activity == 'sentences') {
                                        navigation.navigate('SentencesUsers', { activity: item.activity_id, user_uid: item.user_uid, name: item.full_name, value: item.value, title: activity.title })
                                    } else if (activity.type_activity == 'truefalse') {
                                        navigation.navigate('TrueFalseUsers', { activity: item.activity_id, user_uid: item.user_uid, name: item.full_name, value: item.value, title: activity.title })
                                    }
                                }}
                                style={{
                                    backgroundColor: '#F0F0',
                                    flexDirection: 'row',
                                    padding: 10,
                                    borderRadius: 20,
                                    margin: 5
                                }}>
                                <Image source={!item.image_url ? require('../../../assets/image/avatarMissing.png') : { uri: item.image_url }} style={{ width: 80, height: 80, borderRadius: 50 }} />
                                <View style={{ flexDirection: 'column', width: '58%' }}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', left: 5 }}>{item.full_name}</Text>
                                    <Text style={{ color: '#000', fontSize: 12, left: 5 }}>{formatDate(date)}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', width: '23%' }}>
                                    <Text style={{ color: item.value >= 50 ? 'green' : 'red', fontSize: 20, fontWeight: 'bold' }}>{item.value}%</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                />

                <Modal visible={modalMenu}>
                    <View style={{ height: '100%', backgroundColor: '#582770' }}>
                        <View style={{ backgroundColor: '#582770', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#FFF', flexDirection: 'row' }}>
                            <View style={{ width: '90%', flexDirection: 'row' }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19 }}>Configurações</Text>
                                <LottieConfig />
                            </View>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => { setModalMenu(false) }}>
                                    <Icon name='close' size={35} style={{ color: '#FFF' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '70%', alignItems: 'center' }}>
                                    <TextInput mode='outlined' onChangeText={(value) => setTitle(value)} label={activity.title} style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff' }} />
                                </View>
                                <View style={{ width: '30%', marginTop: 5 }}>
                                    <TouchableOpacity
                                        onPress={AlterarTitle}
                                        style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15 }}>
                                        <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold' }}>Alterar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '70%', alignItems: 'center' }}>
                                    <TextInput mode='outlined' onChangeText={(value) => setPass(value)} placeholder='Senha' secureTextEntry style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff', }} />
                                </View>
                                <View style={{ width: '30%', marginTop: 5 }}>
                                    <TouchableOpacity
                                        onPress={AlterarPass}
                                        style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15 }}>
                                        <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold' }}>Alterar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ alignItems: 'center', margin: 15 }}>
                                <TouchableOpacity onPress={() => setViewAvatar(true)}>
                                    <Image source={image ? { uri: image } : require('../../../assets/image/avatarMissing.png')} style={{ width: 200, height: 200, borderRadius: 10, marginTop: 20 }} />
                                </TouchableOpacity>
                            </View>

                            <Modal style={style.modalLoading} visible={isLoading}>
                                <View style={[style.containerLoad, style.horizontal]}>
                                    <ActivityIndicator size="large" color="green" />
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => {

                                    setModalMenu(false);
                                    if (activity.type_activity == 'questions') {
                                        navigation.navigate('QuestionsActivity', { data: activity });
                                    }
                                    else if (activity.type_activity == 'sentences') {
                                        navigation.navigate('SentencesActivity', { data: activity });
                                    }
                                    else if (activity.type_activity == 'truefalse') {
                                        navigation.navigate('TrueFalseActivity', { data: activity });
                                    }
                                }}
                                style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold' }}>Visualizar {activity.type_activity == 'questions' ? 'Questões' : 'Frases'}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Atenção?", "Deseja liberar os resultados para os participantes?",
                                        [{
                                            text: "Sim",
                                            onPress: () => {
                                                ShowResponse();
                                            },
                                        },
                                        {
                                            text: "Não",
                                        },
                                        ]
                                    );
                                }}
                                style={{ padding: 15, margin: 5, backgroundColor: 'green', alignItems: 'center', borderRadius: 15 }}>
                                {
                                    isLoading
                                        ? <ActivityIndicator size="large" color="#FFF" />
                                        : <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold' }}>Liberar Resultados</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Atenção?", "Deseja encerrar a atividade permanentemente?",
                                        [{
                                            text: "Sim",
                                            onPress: () => {
                                                activityServices.Put('/activity/' + activity.id + '/close', VG.user_uid)
                                                    .then(() => {
                                                        navigation.pop();
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    })
                                            },
                                        },
                                        {
                                            text: "Não",
                                        },
                                        ]
                                    );
                                }}
                                style={{ padding: 15, margin: 5, backgroundColor: 'red', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold' }}>Encerrar Atividade</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {!viewAvatar ? null :
                        <Animatable.View animation='bounceInUp' duration={2000} style={styles.container_avatar}>
                            <View style={styles.container_buttons_media}>
                                <TouchableOpacity style={styles.button_media_library} onPress={() => { launchImageLibrary({}, imagePickerCallback) }}>
                                    <MaterialCommunityIcons name='folder-multiple-image' size={20} style={styles.icon_galery} />
                                    <Text style={styles.text_button_media_library}>Galeria</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button_media_camera} onPress={() => { launchCamera({}, imagePickerCallback) }}>
                                    <FontAwesome name='camera' size={20} style={styles.icon_camera} />
                                    <Text style={styles.text_button_media_camera}>Camera</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.button_close_view_avatar} onPress={() => setViewAvatar(false)}>
                                <Text style={styles.text_button_close_view_avatar}>Fechar</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                </Modal>
            </View>
        </View>

    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#582770',
        borderRadius: 20
    }
})