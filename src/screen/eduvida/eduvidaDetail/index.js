import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StatusBar, ImageBackground, Alert, ActivityIndicator, FlatList, Image, ScrollView, TextInput } from 'react-native';
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

    const formatDate = (date) => {
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        return formatted_date;
    }

    async function GetList() {
        await Axios.Get('/eduvida/' + data_header.id + '/comments', VG.user_uid)
            .then((value) => {
                setData(value.data)
            }).catch((error) => {
                Alert.alert('Error', error)
                console.log(error)
            })
    }

    useEffect(() => {
        GetList();
    }, [5000])

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

        await Axios.Post('/eduvida/' + data_header.id + '/comment', VG.user_uid, json)
            .then((sucess) => {

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

    useEffect(() => {
        console.log(data_header)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#9400D3' barStyle='light-content' />
            <ImageBackground
                source={require('../../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
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
                <View style={{ height: '87%', padding: 13,}}>
                    <FlatList data={data}  keyExtractor={item => item.id} renderItem={({ item, index }) => {
                        return (
                            <CardComment key={index} data_comment={item} />
                        );
                    }}
                    />
                </View>
                <View style={styles.comment}>
                    <TextInput placeholder='Mensagem' style={styles.text_input_comment} multiline={true} onChangeText={(value) => setComment(value)} />
                    <TouchableOpacity style={styles.button_send} onPress={() => Comment}>
                        <MaterialIcons name='send' size={18} style={styles.icon_send} />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}