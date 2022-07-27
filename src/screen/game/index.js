import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VG from '../../components/variables/VG';
import mainservices from '../../services/mainService/mainService';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';

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
                <ListShopComponent item={ListShop} navigate={navigation}/>
            } 
            </View>
        </View>  
    );
}

function ListShopComponent(props){
    return(
        <FlatList 
            data={props.item}  
            numColumns={2} 
            style={{ margin: '5%'}}
            keyExtractor={item => item.id} 
            renderItem={({ item }) => {
                const image = { uri: item.picture };

                return (    
                    <TouchableOpacity 
                    style={{ margin: 2, borderRadius: 15, width: '50%'}}
                    onPress={() => {props.navigate.navigate('GameDetail', { item: item})}}
                    >
                        <Animatable.View duration={2000} animation='bounceInDown' 
                        style={{backgroundColor: '#F8F8FF', borderRadius: 10, padding: 25, width: '90%', borderWidth: 1, borderColor: '#D3D3D3'}}>
                            <View style={style.containerImage}>      
                                <ImageBackground  
                                    source={image} 
                                    style={{width: 100, height: 100}}  
                                />                        
                            </View>  
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{item.name}</Text>
                            <View style={style.containerValue}>      
                                <IconFont5 name='coins' size={20} style={{ color: '#ffd700' }} />                      
                                <Text style={{color: '#FFF', fontWeight: 'bold', marginLeft: 5}}>{item.value}</Text>  
                            </View>                                 
                        </Animatable.View>      
                    </TouchableOpacity>
                );
            }}
        />                                 
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    containerValue: {
        padding: 10,
        marginTop: 15,
        marginRight: 20,
        width: '90%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    containerImage: {
        width: '100%',
        borderRadius: 10,
    },
})