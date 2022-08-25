import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar, ImageBackground, Alert } from 'react-native';
import styles from './styles';
import Axios from '../../services/mainService/mainService';
import VG from '../../components/variables/VG';

export default function Ranking(){
    const [data, setData] = useState(null);

    useEffect( async () => {
        await GetPodium()
    }, [])

    async function GetPodium(){
        await Axios.Get('/podium', VG.user_uid)
        .then((value) => {
            setData(value.data)
        })
        .catch(() => {
            Alert.alert('Erro de conexão', 'Ocorreu um problema ao listar os usuários.')
        })
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#540262' barStyle='light-content' />
            <ImageBackground source={require('../../assets/image/backgroundTop20.png')} style={styles.backgroundImage} />
        </View>
    )
}