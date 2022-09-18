import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, StatusBar, FlatList, Image, RefreshControl, ScrollView, ImageBackground } from 'react-native';
import mainservices from '../../services/mainService/mainService';
import activityServices from '../../services/activityService/activityService';
import WindMill from '../../components/lotties/WindMill';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import VG from '../../components/variables/VG';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MainActivity({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [configMenu, setConfigMenu] = useState(null);
    const [listActivitys, setListActivitys] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);

    const encodedData = 'R0lGODlhAQABAIAAAAAA...7';

    const onRefresh = React.useCallback(() => {
        GetActvity();
        //configMenuMain();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        //configMenuMain();
        GetActvity();
    }, [])

    function setModalMenu(value) {
        setModalVisible(value);
    }

    function configMenuMain() {
        mainservices.GetConfigMenu(VG.user_uid)
            .then((response) => {
                setConfigMenu(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function GetActvity() {
        activityServices.GetActivitys(VG.user_uid)
            .then((response) => {
                setListActivitys(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function CaseScreen(item) {
        switch (item) {
            case 1:
                navigation.navigate('NewActivity')
                setModalVisible(false)
                break;
            case 2:
                navigation.navigate('MyActivity')
                setModalVisible(false)
                break;
            case 3:
                navigation.navigate('SearchActivity')
                setModalVisible(false)
                break;
            case 4:
                navigation.navigate('MyProfile')
                setModalVisible(false)
                break;
            case 5:
                auth().signOut();
                break;
        }
    }

    function Enter(item) {
        if (item.author_uid == VG.user_uid) {
            navigation.navigate('UsersActivity', { activity: item })
        } else {
            if (item.with_password == 1) {
                navigation.navigate('PassActivity', { activity: item })
            } else {
                navigation.navigate('MainSearchActivity', { activity: item })
            }
        }
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
            <ImageBackground
                source={require('../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            {
                !bannerVisible ? null :
                    <View style={{ width: '90%', height: '18%', }}>
                        <Image
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/eduwi-64db3.appspot.com/o/banner%2Finternos%2Fbanner_explore.png?alt=media&token=a844fe1d-9ac4-4edd-a167-3f340f316682' }}
                            style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        />
                        <TouchableOpacity
                            onPress={() => setBannerVisible(false)}
                            style={{ position: 'absolute', right: 20, top: 5, backgroundColor: '#FFF', padding: 2, borderRadius: 25 }}>
                            <FontAwesome name='close' size={25} style={{ color: '#000' }} />
                        </TouchableOpacity>
                    </View>
            }
            <View style={{ width: '100%', marginTop: 25}}>
            <Text style={{ left: 20, fontSize: 20, fontWeight: 'bold' }}>Atividades Populares</Text>
            </View>
            <ScrollView
                style={{ width: '100%', height: '100%'}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {!listActivitys ? null :
                    listActivitys.map((item, key) =>
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity key={key} onPress={() => { Enter(item) }} style={{
                                backgroundColor: '#004c91',
                                margin: 5,
                                height: 150,
                                borderRadius: 15,
                                padding: 20,
                                width: '90%'
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ position: 'absolute', color: '#FFF', left: -10, top: -15, fontWeight: 'bold' }}>{key + 1}</Text>
                                    <Image
                                        style={style.logo}
                                        source={item.image_url ? { uri: item.image_url } : require('../../assets/image/imageNotFound.png')}
                                    />
                                    <View >
                                        <View>
                                            <Text style={{color: '#FFF',  width: '90%', fontSize: 18, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic', left: 5, top: 5 }}>{item.title.toString()}</Text>     
                                        </View>
                                        {/* <View>
                                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic', left: 5 }}>{item.title.toString().substring(20, 40)}</Text>     
                                        </View> */}
                                    </View>                                    
                                    <Text style={{ color: '#FFF', position: 'absolute', bottom: 0, left: 115, fontSize: 15 }}>Dificuldade: {item.difficulty_level}</Text>
                                    <FontAwesome name='star' size={22} style={{ color: '#FFF', position: 'absolute', bottom: 3, right: 20}} />
                                    {
                                        key + 1 > 3 ? null :
                                        <Icon name='medal' size={30} style={{ color: key + 1 == 1 ? '#eaea32' : key + 1 == 2 ? '#c0c0c0' : key + 1 == 3 ? '#996515' : '#FFF', position: 'absolute', top: -20, right: -5}} />
                                    }
                                    <Text style={{ color: '#FFF', position: 'absolute', bottom: 0, right: 5, fontSize: 22 }}>5</Text>
                                </View>


                            </TouchableOpacity>
                        </View>

                    )}
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" >
                <View style={{ backgroundColor: '#FFF', padding: 12, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { setModalMenu(false) }}>
                        <Icon name="arrow-left" size={26} style={{ color: '#000000' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', marginLeft: 10 }}>Voltar</Text>
                </View>

                <FlatList data={configMenu} keyExtractor={item => item.id} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => CaseScreen(item.id)} style={{ backgroundColor: item.color_background, flexDirection: 'row', padding: 15, borderRadius: 20, margin: 5 }}>
                            <Icon name={item.name_icon} style={{ color: item.color_icon, marginRight: 10 }} size={20} />
                            <Text style={{ color: item.color_title }}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                />
                <WindMill />
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    searchCommunity: {
        position: 'absolute',
        bottom: 15,
        right: 10,
    },
    buttonMenu: {
        backgroundColor: '#294444',
        padding: 8,
        borderRadius: 10,
        shadowColor: '#470000',
        elevation: 10
    },
    logo: {
        height: 110,
        width: 110,
        borderRadius: 25,
    }
})