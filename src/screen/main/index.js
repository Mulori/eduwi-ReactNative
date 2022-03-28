import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Modal, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import WindMill from '../../components/lotties/WindMill';
import mainservices from '../../services/mainService/mainService';
import userService from '../../services/userService/userService';
import VG from '../../components/variables/VG';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


export default function Main({ navigation }){
    const [modalVisible, setModalVisible] = useState(false);
    const [configMenu, setConfigMenu] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        GetUser();
        configMenuMain();
    }, [])

    setTimeout(() => {
       GetUser();
    }, 10000);

    function configMenuMain(){
        mainservices.GetConfigMenu(VG.user_uid)
        .then((response) => {
            setConfigMenu(response.data);      
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function GetUser(){
        userService.Get('/users', VG.user_uid)
        .then((response) => {
            setUser(response.data);      
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function setModalMenu(value){
        setModalVisible(value);
    }

    function CaseScreen(item){
        switch(item) { 
            case 1:             
                navigation.navigate('newActivity')
                setModalVisible(false)
                break;
            case 2:             
                navigation.navigate('myActivity')
                setModalVisible(false)
                break;
            case 3:             
                navigation.navigate('searchActivity')
                setModalVisible(false)
                break;
            case 4:             
                navigation.navigate('myProfile')
                setModalVisible(false)
                break;
            case 5:
                auth().signOut();
                break;          
        }
    }

    return(
        <View style={style.containerMaster}>
            <StatusBar backgroundColor='#1b9cf0' barStyle='ligth-content' />
            <ImageBackground  
                source={require('../../assets/image/carnaval_edwi.jpg')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <Animatable.View animation='bounceInLeft' duration={2000} style={style.containerChild}> 
                <View style={style.containerHeader}>
                    <View style={{ width: '90%'}}>                        
                        <View style={style.containerScore}>
                            <ImageBackground  
                                source={require('../../assets/image/cifrao.png')} 
                                style={{width: 20, height: 20}}  
                            />                        
                            <Text style={{color: '#FFF', fontWeight: 'bold', marginLeft: 5}}>{!user ? '0' : user.score}</Text>                        
                            
                            <View style={{ alignItems: 'flex-end', width: '50%'}}>
                                <TouchableOpacity onPress={GetUser}>
                                    <IconFoundation name='refresh' size={20} style={{ color: '#FFF'}}/>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                    </View>
                    <View style={{ width: '20%', top: -5}}>
                        <TouchableOpacity onPress={(() => setModalMenu(true))}>
                            <Icon name="menu" size={30} style={{ color : '#000', }} />
                        </TouchableOpacity>
                    </View>                    
                </View>
                <TouchableOpacity style={style.buttonGame} onPress={() => {navigation.navigate('mainActivity')}}>
                    <Text style={style.textButtonGame}>JOGAR</Text>
                </TouchableOpacity>
            </Animatable.View>    

             <Modal visible={modalVisible} style={style.modalMenu} animationType="slide" >
                <View style={{backgroundColor: '#FFF', padding: 12, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {setModalMenu(false)}}>
                        <Icon name="arrow-down-left" size={26} style={{ color : '#000000'}} />
                    </TouchableOpacity>                    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', marginLeft: 10}}>Voltar</Text>
                </View>

                <FlatList data={configMenu} keyExtractor={item => item.id} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => CaseScreen(item.id)} style={{ backgroundColor: item.color_background, flexDirection: 'row', padding: 15, borderRadius: 20, margin: 5}}>
                            <IconFont5 name={item.name_icon} style={{ color: item.color_icon, marginRight: 10}} size={20} />
                            <Text style={{ color: item.color_title}}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                />
                <WindMill />
            </Modal>        
        </View>
    )
}

const style = StyleSheet.create({
    containerMaster:{
        flex: 1
    },
    containerChild:{
        alignItems: 'center',
        flex: 1
    },
    containerHeader:{
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '90%'
    },  
    containerScore: {
        padding: 10,
        marginTop: 15,
        marginRight: 20,
        width: '40%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginLeft: '30%',
    },
    buttonGame:{
        position: 'absolute',
        backgroundColor: '#7ed957',
        padding: 15,
        borderRadius: 15,
        width: '50%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        left: '10%', 
        right: '10%',
        bottom: '22%',       
        borderWidth: 2,
        borderColor: '#ff5757',
    },
    textButtonGame:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    modalMenu: {
        position: 'absolute'
    },
})