import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, FlatList, Image, Alert, Modal, ActivityIndicator } from 'react-native';
import activityServices from '../../services/activityService/activityService';
import MainService from '../../services/mainService/mainService'
import VG from '../../components/variables/VG';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ModuleStorage from '../../services/storage';

export default function myProfile({ navigation }) {
    const [data, setData] = useState(null);
    const [dataReward, setDataReward] = useState(null);
    const [viewAvatar, setViewAvatar] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function GetUser() {
        setIsLoading(true);
        activityServices.Get("/users", VG.user_uid)
            .then((response) => {
                setData(response.data);
                console.log(response.data)
                setImage(response.data.image_url)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function GetReward() {
        activityServices.Get("/reward/users", VG.user_uid)
            .then((response) => {
                setDataReward(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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

        await ModuleStorage.SendFileStorage('user/profile/image/' + data_.assets[0].fileName, data_.assets[0].uri)
            .then(async () => {
                await ModuleStorage.GetFileStorage('user/profile/image/' + data_.assets[0].fileName)
                    .then( async (value) => {
                        if(data.image_url){
                            const retorno = await ModuleStorage.DeleteStorage(data.image_url);
                        }

                        let data_image = {
                            image_reference: 'user/profile/image/' + data_.assets[0].fileName,
                            image_url: value,
                            image_type: data_.assets[0].type,
                            image_size_wh: data_.assets[0].width + '|' + data_.assets[0].height,
                        }

                        console.log(data_image)

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
        await MainService.Put('/users/image', VG.user_uid, data_)
            .then((response) => {
                console.log(response);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    useEffect(() => {
        GetUser()
        GetReward()
    }, [])

    return (
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center' }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        if (image) {
                            navigation.navigate('viewerImage', { url: image })
                        }
                    }}>
                        <Image source={image ? { uri : image } : require('../../assets/image/avatarMissing.png')} style={{ width: 150, height: 150, borderRadius: 75, marginTop: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setViewAvatar(true)}
                        style={{ backgroundColor: '#3CB371', borderRadius: 50, padding: 5, position: 'absolute', right: 10, bottom: 0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome name='camera' size={20} style={{ color: '#FFF' }} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    mode='outlined'
                    outlineColor='#3CB371'
                    value={!data ? null : data.name}
                    label='Nome' style={{
                        width: '90%',
                        fontWeight: 'bold',
                        backgroundColor: '#FFF',
                        borderColor: '#4e71ff',
                        marginTop: 10
                    }} />
                <TextInput
                    mode='outlined'
                    outlineColor='#3CB371'
                    value={!data ? null : data.last_name}
                    label='Sobrenome'
                    style={{
                        width: '90%',
                        fontWeight: 'bold',
                        backgroundColor: '#FFF',
                        borderColor: '#4e71ff',
                        marginTop: 10
                    }} />
                <TextInput
                    mode='outlined'
                    outlineColor='#3CB371'
                    value={!data ? null : data.email}
                    label='E-mail'
                    style={{
                        width: '90%',
                        fontWeight: 'bold',
                        backgroundColor: '#FFF',
                        borderColor: '#4e71ff',
                        marginTop: 10
                    }} />
            </View>
            {
                !dataReward ? null :
                    dataReward.length == 0 ? null :
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 15 }}>Minhas Recompensas</Text>
                            <FlatList
                                data={dataReward}
                                horizontal
                                style={{ marginLeft: 20, marginTop: 15 }}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    const image = { uri: item.picture };

                                    return (
                                        <Animatable.View key={item.id} duration={2000} animation='bounceInDown' style={{ backgroundColor: '#3CB371', borderRadius: 15, padding: 25, margin: 5, }}>
                                            <View style={style.containerImage}>
                                                <ImageBackground
                                                    source={image}
                                                    style={{ width: 80, height: 80 }}
                                                />
                                            </View>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>{item.name}</Text>
                                            <View style={style.containerValue}>
                                                <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 5 }}>Quantidade: {item.amount}</Text>
                                            </View>
                                        </Animatable.View>
                                    );
                                }}
                            />
                        </View>
            }
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
            <Modal style={style.modalLoading} visible={isLoading}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerImage: {
        borderRadius: 10,
        alignItems: 'center',
    },
    containerValue: {
        alignItems: 'center',
    },
    modalLoading: {
        position: 'absolute'
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
})