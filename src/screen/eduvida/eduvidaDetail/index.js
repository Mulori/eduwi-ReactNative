import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, StatusBar, ImageBackground, Alert, Keyboard, FlatList, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import styles from "./styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from '../../../services/mainService/mainService'
import VG from "../../../components/variables/VG";

export default function EduvidaDetail({ navigation, route }) {
    const { data_header } = route.params;
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date_header = new Date(data_header.created);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const flatList = useRef(null);

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

        if (!comment) {
            return;
        }

        let json = {
            comment: comment,
            image_reference: '',
            image_url: '',
            image_type: '',
            image_size_wh: '',
        }

        console.log('foi')

        await Axios.Post('/eduvida/' + data_header.id + '/comment', VG.user_uid, json)
            .then((sucess) => {
                GetList();
                setComment(null);
            })
            .catch((error) => {
                Alert.alert('Erro ao adicionar um comentário', error)
            })
    }

    function CardComment({ data_comment }) {
        var date = new Date(data_comment.created);

        return (
            <View style={styles.header_comments}>
                <View style={{ width: '15%', }}>
                    <Image style={styles.logo} source={data_comment.image_user ? { uri: data_comment.image_user } : require('../../../assets/image/imageNotFound.png')} />
                </View>
                <View style={styles.conteiner_comment}>
                    <View style={styles.container_name_two}>
                        <Text style={styles.text_name}>{data_comment.name + ' ' + data_comment.last_name}</Text>
                        <Text style={styles.text_date}>{formatDate(date)}</Text>
                    </View>
                    <View style={styles.container_text}>
                        <Text>{data_comment.comment}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function CardCommentyou({ data_comment }) {
        var date = new Date(data_comment.created);

        return (
            <View style={styles.header_comments}>
                <View style={styles.conteiner_comment_you}>
                    <View style={styles.container_name_two}>
                        <Text style={styles.text_name}>{data_comment.name + ' ' + data_comment.last_name}</Text>
                        <Text style={styles.text_date}>{formatDate(date)}</Text>
                    </View>
                    <View style={styles.container_text}>
                        <Text>{data_comment.comment}</Text>
                    </View>
                </View>
                <View style={{ width: '15%', left: 10 }}>
                    <Image style={styles.logo} source={data_comment.image_user ? { uri: data_comment.image_user } : require('../../../assets/image/imageNotFound.png')} />
                </View>
            </View>
        )
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : "padding"}
            style={styles.container}
        >
            <StatusBar backgroundColor='#9400D3' barStyle='light-content' />
            <View style={styles.header}>
                <View style={{ width: '15%', }}>
                    <Image style={styles.logo} source={data_header.image_url ? { uri: data_header.image_url } : require('../../../assets/image/imageNotFound.png')} />
                </View>
                <View style={styles.conteiner_comment}>
                    <View style={styles.container_name}>
                        <Text style={styles.text_name}>{data_header.name + ' ' + data_header.last_name}</Text>
                        <Text style={styles.text_date}>{formatDate(date_header)}</Text>
                    </View>
                    <View style={styles.container_text}>
                        <Text>{data_header.help_text}</Text>
                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    data={data}
                    style={{ height: !isKeyboardVisible ? '76%' : '100%' }}
                    ref={flatList}
                    onContentSizeChange={() => flatList.current.scrollToEnd()}
                    renderItem={({ item }) => {

                        if (item.firebase_uid == VG.user_uid) {
                            return (
                                <CardCommentyou  data_comment={item} />
                            );
                        } else {
                            return (
                                <CardComment  data_comment={item} />
                            );
                        }


                    }}
                />
            </View>
            <View style={styles.comment}>
                <TextInput
                    placeholder='Responder'
                    placeholderTextColor='#FFF'
                    style={styles.text_input_comment}
                    multiline={true}
                    value={comment}
                    onChangeText={(value) => setComment(value)} />
                <TouchableOpacity style={styles.button_send} onPress={Comment}>
                    <MaterialIcons name='send' size={18} style={styles.icon_send} />
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}