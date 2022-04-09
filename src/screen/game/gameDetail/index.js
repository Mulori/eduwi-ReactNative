import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VG from '../../../components/variables/VG';
import mainservices from '../../../services/mainService/mainService';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export default function GameDetail({ navigation, route }) {
    const { item } = route.params;
    const [count, setCount] = useState(1);
    const image = { uri: item.picture };
    const [user, setUser] = useState(null);

    useEffect(() => {
        GetUser();
    }, [])

    function GetUser(){
        mainservices.Get('/users', VG.user_uid)
        .then((response) => {
            setUser(response.data);      
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function Buy(){
        Alert.alert("Atenção", "Deseja adquirir este recompensa?",  
            [{  text: "Sim",
            
            },
                {
                text: "Não",
                },
            ]
        );
    }

    function More(){
        setCount(count + 1);
    }

    function Less(){
        if(count - 1 >= 0){
            setCount(count - 1);
        }        
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#3CB371' />
            <View style={{ alignItems: 'center'}}>
                <Animatable.View animation='bounceInDown' duration={2000} style={{ backgroundColor: '#FFF', height: '99%', width: '100%', alignItems: 'center'}}>
                    <View style={{ width: '100%', alignItems: 'flex-start'}}>
                        <View style={style.containerValue}>      
                            <ImageBackground  
                                source={require('../../../assets/image/cifrao.png')} 
                                style={{width: 20, height: 20}}  
                            />                        
                            <Text style={{color: '#FFF', fontWeight: 'bold', marginLeft: 5}}>{!user ? '0' : user.score}</Text>  
                        </View> 
                    </View>                   
                    <View style={style.containerImage}>      
                        <ImageBackground  
                            source={image} 
                            style={{width: 170, height: 170}}  
                        />                        
                    </View>  
                    <Text style={style.title}>{item.name}</Text>
                    <Text style={style.description}>{item.description.replace('*', '\n')}</Text>
                    <View style={style.containerPrice}>      
                        <ImageBackground  
                            source={require('../../../assets/image/cifrao.png')} 
                            style={{width: 35, height: 35}}  
                        />                        
                        <Text style={{color: '#000', fontWeight: 'bold', marginLeft: 8, fontSize: 25}}>{item.value}</Text>  
                        <Text style={{color: '#000', marginLeft: 8, fontSize: 15, bottom: -10}}>/ Por recompensa</Text>  
                    </View> 
                    <View style={{ width: '90%', padding: 5, flexDirection: 'row', position: 'absolute', bottom: 0}}>
                        <View style={{ width: '40%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={Buy}style={{ backgroundColor: '#3CB371', padding: 15, borderRadius: 15, width: '100%', alignItems: 'center'}}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Adquirir</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '25%',  alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={Less}>
                                <IconAntDesign name='minussquare' size={50}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '10%', alignItems: 'center', }}>
                            <View>
                                <TextInput value={count.toString()} editable={false} style={{  width: '100%', color: '#000', fontSize: 35}}/>
                            </View>
                        </View>
                        <View style={{ width: '25%', alignItems: 'flex-start'}}>
                            <TouchableOpacity onPress={More}>
                                <IconAntDesign name='plussquare' size={50}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Animatable.View>
                
            </View>
        </View>  
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerImage: {
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '5%',
    },
    containerValue: {
        padding: 10,
        marginTop: 15,
        marginRight: 20,
        marginLeft: 20,
        width: '26%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
    },
    containerPrice: {
        padding: 10,
        marginTop: 15,
        marginRight: 20,
        alignItems: 'flex-start',
        marginLeft: '12%',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 20,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 22,
    },
    description:{
        fontSize: 15,
        margin: 5
    }
})