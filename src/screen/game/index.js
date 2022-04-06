import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, FlatList } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import VG from '../../components/variables/VG';
import mainservices from '../../services/mainService/mainService';

export default function Game({ navigation }) {
    const [ListShop, setListShop] = useState(null);

    useEffect(() => {
        GetRewardShop();
    }, [])

    function GetRewardShop(){
        mainservices.Get('/reward', VG.user_uid)
        .then((questions) => {
            setListShop(questions.data)
        })
        .catch(() => {
            setModalVisible(false);
            Alert.alert('Erro', 'Ocorreu um erro ao baixar os itens da loja. Tente novamente', 'Ok');
        })      
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center'}}>
            {
                !ListShop ? null : 
                <ListShopComponent item={ListShop}/>
            } 
            </View>
        </View>  
    );
}

function ListShopComponent(props){

    return(
        <FlatList data={props.item} style={{margin: 5}} keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
                <View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
                    <View style={{width: '90%'}}>
                        <Text>{item.name}</Text>
                    </View>      
                </View>
            );
        }}
        />                          
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})