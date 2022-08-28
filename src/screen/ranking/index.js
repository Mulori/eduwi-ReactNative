import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar, ImageBackground, Alert, FlatList } from 'react-native';
import styles from './styles';
import Axios from '../../services/mainService/mainService';
import VG from '../../components/variables/VG';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';

export default function Ranking() {
    const [data, setData] = useState(null);

    useEffect(async () => {
        await GetPodium()
    }, [])

    async function GetPodium() {
        await Axios.Get('/podium', VG.user_uid)
            .then((value) => {
                setData(value.data)
            })
            .catch(() => {
                Alert.alert('Erro de conexão', 'Ocorreu um problema ao listar os usuários.')
            })
    }

    const Card = ({item, index}) => {
        return (
            <Animatable.View  animation={'bounceInDown'} duration={2000} style={styles.container_item}>
                <View style={styles.item}>
                    <Text style={styles.number}>{index}</Text>
                    <View style={styles.container_image}>
                        <Image source={item.image_url ? { uri : item.image_url } : require('../../assets/image/avatarMissing.png')} style={styles.image} />
                    </View>   
                    <View style={styles.container_user}>
                        <Text style={styles.name}>{item.name} {item.last_name}</Text>
                        <View style={styles.container_score}>
                            <AntDesign name='star' size={30} style={styles.star} />
                            <Text style={styles.score}>{item.score}</Text>
                        </View>                        
                    </View>  
                    {
                       index < 4 
                       ?  <FontAwesome5 name='trophy' size={34} style={styles.trophy} />
                       :  <Entypo name='price-ribbon' size={35} style={styles.recommend} />      
                    }       
                </View>                
            </Animatable.View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#540262' barStyle='light-content' />
            <ImageBackground source={require('../../assets/image/backgroundTop20.png')} style={styles.backgroundImage} />
            <View style={styles.container_list}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    style={styles.list}
                    renderItem={({ item, index }) => {
                        return (
                            <Card item={item} index={index + 1} />
                        );
                    }}
                />
            </View>
        </View>
    )
}