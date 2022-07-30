import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StatusBar, ImageBackground, Alert, ActivityIndicator, FlatList, Image } from 'react-native';
import styles from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from '../../services/mainService/mainService'
import VG from "../../components/variables/VG";

export default function Eduvida({ navigation }) {
    const [data, setData] = useState(null);
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const formatDate = (date) => {
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        return formatted_date;
    }

    async function GetList() {
        await Axios.Get('/eduvida', VG.user_uid)
            .then((value) => {
                setData(value.data)
            }).catch((error) => {
                Alert.alert('Error', error)
                console.log(error)
            })
    }

    useEffect(() => {
        GetList();
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#9400D3' barStyle='light-content' />
            <ImageBackground
                source={require('../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            {
                data ? null :
                    <View style={styles.container_load}>
                        <ActivityIndicator size='large' color='#9400D3' />
                    </View>

            }
            <FlatList data={data} keyExtractor={item => item.id} style={{ marginTop: 5, }} renderItem={({ item }) => {
                var date = new Date(item.created);
                return (
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => navigation.navigate('EduvidaDetail', { data_header: item })} key={item.id} style={styles.list_item}>
                            <View style={styles.container_content}>
                                <Image style={styles.logo} source={item.image_url ? { uri: item.image_url } : require('../../assets/image/imageNotFound.png')} />
                                <View>
                                    <Text style={styles.title}>{item.title.substring(0, 30)}...</Text>
                                    <View style={styles.container_content_two}>
                                        <View style={{ width: '50%', flexDirection: 'row'}}>
                                            <MaterialCommunityIcons name='brain' size={15} style={styles.materialcommunityicons} />
                                            <Text style={styles.info}>{item.help_type}</Text>
                                        </View>
                                        <View style={{ width: '50%'}}>
                                            <Text style={styles.info}>{formatDate(date)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                );
            }}
            />
            <TouchableOpacity style={styles.button_plus} onPress={() => navigation.navigate('NewEduvida')}>
                <MaterialCommunityIcons name='head-plus' size={40} style={styles.button_plus_icon} />
            </TouchableOpacity>
        </View>
    )
}