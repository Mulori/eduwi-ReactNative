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
            <StatusBar backgroundColor='#FFF' barStyle='dark-content' />
            <Animatable.View animation='bounceInDown' duration={2000}>
                <ImageBackground  
                    source={require('../../assets/image/logoEduwi.png')} 
                    style={{width: 400, height: 350, position: 'absolute'}}  
                />
            </Animatable.View>
                      
            <Animatable.View animation='bounceInLeft' duration={2000} style={style.containerChild}> 
                <View style={style.containerHeader}>
                    <View style={{ width: '100%'}}>          
                        <View style={style.containerScore}>      
                            <ImageBackground  
                                source={require('../../assets/image/cifrao.png')} 
                                style={{width: 20, height: 20}}  
                            />                        
                            <Text style={{color: '#FFF', fontWeight: 'bold', marginLeft: 5}}>{!user ? '0' : user.score}</Text>                        
                            
                            <View style={{ alignItems: 'flex-end', width: '40%'}}>
                                <TouchableOpacity onPress={GetUser}>
                                    <IconFoundation name='refresh' size={20} style={{ color: '#FFF'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>                  
                </View>


                <View
                    style={{
                        alignItems: 'center',
                        width: '70%',
                        height: '7%',
                        marginTop: '95%',
                        backgroundColor: '#f97d25',
                        borderBottomEndRadius: 15,
                        borderTopEndRadius: 15,
                        borderTopLeftRadius: 20,
                        borderBottomStartRadius: 20,
                    }}
                >
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '20%', justifyContent: 'center'}}>
                            <IconFont5 name='globe-americas' style={{ color: '#FFF', marginLeft: 10}} size={35} />             
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center'}}>
                            <TouchableOpacity style={style.buttonGame} onPress={() => {navigation.navigate('mainActivity')}}>
                                <View>                            
                                    <Text style={style.textButtonGame}>EXPLORAR</Text>
                                </View>                        
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        width: '70%',
                        height: '7%',
                        marginTop: '5%',
                        backgroundColor: '#f97d25',
                        borderBottomEndRadius: 15,
                        borderTopEndRadius: 15,
                        borderTopLeftRadius: 20,
                        borderBottomStartRadius: 20,
                    }}
                >
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '20%', justifyContent: 'center'}}>
                            <IconFont5 name='bars' style={{ color: '#FFF', marginLeft: 12}} size={35} />             
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center'}}>
                            <TouchableOpacity style={style.buttonGame} onPress={(() => setModalMenu(true))}>
                                <View>                            
                                    <Text style={style.textButtonGame}>MENU</Text>
                                </View>                        
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        width: '70%',
                        height: '7%',
                        marginTop: '5%',
                        backgroundColor: '#f97d25',
                        borderBottomEndRadius: 15,
                        borderTopEndRadius: 15,
                        borderTopLeftRadius: 20,
                        borderBottomStartRadius: 20,
                    }}
                >
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '20%', justifyContent: 'center' }}>
                            <IconFont5 name='gamepad' style={{ color: '#FFF', marginLeft: 5}} size={35} />             
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center'}}>
                            <TouchableOpacity style={style.buttonGame} onPress={() => {navigation.navigate('Game')}}>
                                <View>                            
                                    <Text style={style.textButtonGame}>GAMIFICAÇÃO</Text>
                                </View>                        
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={{ color: '#FFF', marginTop: 35}}>Escolha uma das opções acima e divirta-se!</Text>
               
            </Animatable.View>    

             <Modal visible={modalVisible} style={style.modalMenu} animationType="slide" >
                <View style={{backgroundColor: '#FFF', padding: 12, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {setModalMenu(false)}}>
                        <Icon name="arrow-down-left" size={26} style={{ color : '#000'}} />
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
        flex: 1,
        backgroundColor: '#FFF'
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    buttonGame:{
        backgroundColor: '#FFF',
        borderBottomEndRadius: 15,
        borderTopEndRadius: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',   
        borderColor: '#9225ed',
        borderWidth: 2
    },
    textButtonGame:{
        color: '#9225ed',
        fontWeight: 'bold',
        fontSize: 20
    },
    modalMenu: {
        position: 'absolute'
    },
    title:{
        fontSize: 50,
        textAlign: 'center',
    },
})