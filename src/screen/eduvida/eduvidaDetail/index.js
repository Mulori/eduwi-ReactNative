import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, StatusBar, Alert, Keyboard, FlatList, Image, KeyboardAvoidingView, TextInput, Modal, ImageBackground } from 'react-native';
import styles from "./styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from '../../../services/mainService/mainService'
import VG from "../../../components/variables/VG";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModuleStorage from '../../../services/storage';

export default function EduvidaDetail({ navigation, route }) {
    const { data_header } = route.params;
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date_header = new Date(data_header.created);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const flatList = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [send, setSend] = useState(false)
    const [viewImage, setViewImage] = useState(false);

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
        setViewImage(false);
    }

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const formatDate = (date) => {
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        return formatted_date;
    }

    async function GetList() {
        await Axios.Get('/eduvida/' + data_header.id + '/comments', VG.user_uid)
            .then((value) => {
                setData(value.data);
            }).catch((error) => {
                Alert.alert('Error', error)
                console.log(error)
            })
    }

    useEffect(() => {
        GetList();
    }, [])

    async function Comment() {
        if (send) {
            return;
        }

        if (!comment) {
            return;
        }

        setSend(true)

        let json = {
            comment: comment,
            image_reference: '',
            image_url: '',
            image_type: '',
            image_size_wh: '',
        }

        await Axios.Post('/eduvida/' + data_header.id + '/comment', VG.user_uid, json)
            .then((sucess) => {
                GetList();
                setComment(null);
                Keyboard.dismiss();
            })
            .catch((error) => {
                Alert.alert('Erro ao adicionar um comentário', error)
            })

        setSend(false)
    }

    async function CommentWithMedia() {

        if (send) {
            return;
        }

        if (!image) {
            return;
        }

        setSend(true)

        await ModuleStorage.SendFileStorage('eduvida/media/image/' + image.assets[0].fileName, image.assets[0].uri)
            .then(async () => {
                await ModuleStorage.GetFileStorage('eduvida/media/image/' + image.assets[0].fileName)
                    .then(async (value) => {

                        let json = {
                            comment: comment,
                            image_reference: 'eduvida/media/image/' + image.assets[0].fileName,
                            image_url: value,
                            image_type: image.assets[0].type,
                            image_size_wh: image.assets[0].width + '|' + image.assets[0].height,
                        }


                        await Axios.Post('/eduvida/' + data_header.id + '/comment', VG.user_uid, json)
                            .then((sucess) => {
                                GetList();
                                setComment(null);
                                setModalVisible(false);
                                Keyboard.dismiss();
                            })
                            .catch((error) => {
                                Alert.alert('Erro ao adicionar um comentário com media.', error)
                            })
                    })
                    .catch((error) => {
                        Alert.alert('Erro ao adicionar um comentário com media.', error)
                    })
            })
            .catch((imageUrlError) => {
                Alert.alert('Erro ao adicionar um comentário com media.', imageUrlError)
            })

        setSend(false)
    }

    function CardComment({ data_comment, index, sizeData }) {
        var date = new Date(data_comment.created);

        if ((sizeData - 1) == index) {
            flatList.current.scrollToEnd();
        }

        return (
            <View style={styles.header_comments}>
                <View style={{ width: '15%', }}>
                    <Image style={styles.logo} source={data_comment.image_user ? { uri: data_comment.image_user } : require('../../../assets/image/avatarMissing.png')} />
                </View>
                <View style={styles.conteiner_comment}>
                    <View style={styles.container_name_two}>
                        <Text style={styles.text_name_comment}>{data_comment.name + ' ' + data_comment.last_name}</Text>
                        <Text style={styles.text_date_comment}>{formatDate(date)}</Text>
                    </View>
                    <View style={styles.container_text}>
                        <Text>{data_comment.comment}</Text>
                        {
                            data_comment.image_comment == '' ? null :
                                <TouchableOpacity onPress={() => navigation.navigate('viewerImage', { url: data_comment.image_comment })}>
                                    <Image source={{ uri: data_comment.image_comment }} resizeMode='contain' style={{ width: 300, height: 300 }} />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "padding"}
                style={styles.container}
            >
                <StatusBar backgroundColor='#9400D3' barStyle='light-content' />
                <View style={styles.header}>
                    <View style={styles.conteiner_comment_main}>
                        <View style={styles.container_name}>
                            <Image style={styles.logo} source={data_header.image_url ? { uri: data_header.image_url } : require('../../../assets/image/avatarMissing.png')} />
                            <Text style={styles.text_name}>{data_header.name + ' ' + data_header.last_name}</Text>
                            <Text style={styles.text_date}>{formatDate(date_header)}</Text>
                        </View>
                        <View style={styles.container_text}>
                            <Text style={{ color: '#FFF' }}>{data_header.help_text}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={data}
                        ref={flatList}
                        scrollToEnd={{ animated: false }}
                        style={{ height: !isKeyboardVisible ? '76%' : '125%' }}
                        renderItem={({ item, index }) => {
                            return (
                                <CardComment data_comment={item} index={index} sizeData={data.length} />
                            );
                        }}
                    />
                </View>
                <View style={styles.comment}>
                    <TextInput
                        placeholder='Responder'
                        maxLength={500}
                        placeholderTextColor='#FFF'
                        style={styles.text_input_comment}
                        multiline={true}
                        value={comment}
                        onChangeText={(value) => setComment(value)} />
                    <TouchableOpacity style={styles.button_media} onPress={() => {

                        setModalVisible(true);
                        setViewImage(true);
                    }} >
                        <MaterialIcons name='perm-media' size={18} style={styles.icon_send} />
                    </TouchableOpacity>
                    {
                        send ? null :
                            <TouchableOpacity style={styles.button_send} onPress={Comment}>
                                <MaterialIcons name='send' size={18} style={styles.icon_send} />
                            </TouchableOpacity>
                    }
                </View>
                <Modal visible={modalVisible} >
                    <View style={styles.container_modal_media}>
                        <TouchableOpacity 
                        style={styles.button_image_selected}
                        onPress={() => {
                            if (viewImage) {
                                setViewImage(false)
                            } else {
                                setViewImage(true)
                            }
                        }}>
                            {
                                image ? 
                                <Image source={{ uri: image.assets[0].uri }} resizeMode='contain' style={styles.image_selected} />
                                :
                                <View style={styles.container_icon_image}>
                                    <FontAwesome name='image' size={40} style={styles.icon_image} /> 
                                </View>
                                
                            } 
                        </TouchableOpacity>
                        <View style={styles.comment}>
                            <TextInput
                                placeholder='Responder'
                                maxLength={500}
                                placeholderTextColor='#FFF'
                                style={styles.text_input_comment_media}
                                multiline={true}
                                value={comment}
                                onChangeText={(value) => setComment(value)} />
                            {
                                send ? null :
                                    <TouchableOpacity style={styles.button_send} onPress={CommentWithMedia}>
                                        <MaterialIcons name='send' size={18} style={styles.icon_send} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false);
                            setImage(null);
                        }}
                            style={{ position: 'absolute', right: 10, top: 10, }}>
                            <FontAwesome name='window-close' size={30} style={{ color: '#808080' }} />
                        </TouchableOpacity>
                        {!viewImage ? null :
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
                            </Animatable.View>
                        }
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>

    )
}