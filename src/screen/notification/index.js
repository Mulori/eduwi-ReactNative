import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, Alert, StatusBar } from 'react-native';
import VG from '../../components/variables/VG';
import styles from './styles';
import mainServices from '../../services/mainService/mainService';

export default function Notification({ navigation }) {
    const [data, setData] = useState(null);
    const months = ["JAN", "FEB", "MAR","ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    useEffect(() => {
        GetNotification();
    }, [])

    async function GetNotification() {
        await mainServices.Get('/notification', VG.user_uid)
            .then((notification) => {
                console.log(notification.data)
                setData(notification.data)
            })
            .catch((error) => {
                Alert.alert('Erro', 'Ocorreu um erro ao baixar as notificações.');
            })
    }

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor='#4169E1' barStyle='light-content' />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                style={styles.list_notification}
                renderItem={({ item }) => {
                    var date = new Date(item.notification_date);

                    const formatDate = (date)=>{
                        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
                        return formatted_date;
                    }

                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { data: item })}>
                            <Image source={item.user_image ? { uri : item.user_image } : require('../../assets/image/avatarMissing.png')} style={styles.image} />
                            <View style={styles.context}>
                                <View style={styles.container_header}>
                                    <Text style={styles.name}>{item.user_name + ' ' + item.user_last_name}</Text>
                                    <Text style={styles.date}>{formatDate(date)}</Text>
                                </View>                                
                                <Text style={styles.text}>{item.notification_text.toString().substring(0, 120)}</Text>
                                <Text style={styles.more}>Ler Mais</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}