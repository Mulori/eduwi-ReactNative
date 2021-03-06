import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, ImageBackground, Modal, FlatList, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFoundation from 'react-native-vector-icons/Foundation';
import WindMill from '../../components/lotties/WindMill';
import mainservices from '../../services/mainService/mainService';
import userService from '../../services/userService/userService';
import VG from '../../components/variables/VG';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';



export default function Main({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [configMenu, setConfigMenu] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        GetUser();
        configMenuMain();
    }, [])

    setTimeout(() => {
        GetUser();
    }, 10000);

    function configMenuMain() {
        mainservices.GetConfigMenu(VG.user_uid)
            .then((response) => {
                setConfigMenu(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function GetUser() {
        userService.Get('/users', VG.user_uid)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function setModalMenu(value) {
        setModalVisible(value);
    }

    function CaseScreen(item) {
        switch (item) {
            case 1:
                navigation.navigate('newActivity')
                setModalVisible(false)
                break;
            case 2:
                navigation.navigate('activity')
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

    return (
        <View style={style.containerMaster}>
            <StatusBar backgroundColor='#FFF' barStyle='dark-content' />

            <ImageBackground
                source={require('../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />

            <Animatable.View animation='bounceInLeft' duration={2000} style={style.containerChild}>
                <View style={style.containerHeader}>
                    <View style={{ width: '60%' }}>
                        <View style={style.containerScore}>
                            {/* <ImageBackground  
                                source={require('../../assets/image/cifrao.png')} 
                                style={{width: 20, height: 20}}  
                            />       */}
                            <IconFont5 name='coins' size={20} style={{ color: '#ffd700' }} />
                            <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 5, fontSize: 15 }}>{!user ? '0' : user.score}</Text>

                            {/* <View style={{ alignItems: 'flex-end', width: '40%'}}>
                                <TouchableOpacity onPress={GetUser}>
                                    <IconFoundation name='refresh' size={20} style={{ color: '#FFF'}}/>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                        style={{ right: -80, backgroundColor: '#4169E1', padding: 5, borderRadius: 50 }}>
                        <MaterialIcons name='notifications-active' size={30} style={{ color: '#FFF' }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('mainActivity')}
                    style={{ left: 20, top: 80 }}>
                    <Image source={require('../../assets/image/Explorar.png')} style={{ width: 100, height: 100, borderRadius: 50, left: -5 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Game')}
                    style={{ left: 20, top: 100 }}>
                    <Image source={require('../../assets/image/Loja.png')} style={{ width: 100, height: 100, borderRadius: 50, left: -5 }} />
                </TouchableOpacity>


                <FlatList
                    data={configMenu}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    style={{ position: 'absolute', bottom: 3 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => CaseScreen(item.id)} style={{ backgroundColor: item.color_background, alignItems: 'center', width: 150, borderRadius: 20, height: 100, margin: 5, justifyContent: 'center' }}>
                                <IconFont5 name={item.name_icon} style={{ color: item.color_icon, }} size={40} />
                                <Text style={{ color: item.color_title, fontWeight: 'bold' }}>{item.title}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </Animatable.View>

            <Modal visible={modalVisible} style={style.modalMenu} animationType="slide" >
                <View style={{ backgroundColor: '#FFF', padding: 12, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { setModalMenu(false) }}>
                        <Icon name="arrow-down-left" size={26} style={{ color: '#000' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', marginLeft: 10 }}>Voltar</Text>
                </View>

                <FlatList data={configMenu} keyExtractor={item => item.id} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => CaseScreen(item.id)} style={{ backgroundColor: item.color_background, flexDirection: 'row', padding: 15, borderRadius: 20, margin: 5 }}>
                            <IconFont5 name={item.name_icon} style={{ color: item.color_icon, marginRight: 10 }} size={20} />
                            <Text style={{ color: item.color_title }}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                />
                <WindMill />
            </Modal>

            <Modal style={style.modalLoading} visible={isLoading}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            </Modal>


        </View>
    )
}

const style = StyleSheet.create({
    containerMaster: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerChild: {
        flex: 1,
        width: '100%',
    },
    containerHeader: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '100%'
    },
    containerLoad: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    containerScore: {
        padding: 10,
        marginTop: 15,
        marginRight: 20,
        left: 15,
        width: '40%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    buttonGame: {
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
    textButtonGame: {
        color: '#9225ed',
        fontWeight: 'bold',
        fontSize: 20
    },
    modalMenu: {
        position: 'absolute'
    },
    modalLoading: {
        position: 'absolute'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    },
})