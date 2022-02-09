import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, StatusBar, FlatList, RefreshControl, ScrollView } from 'react-native';
import mainservices from '../../services/mainService/mainService';
import activityServices from '../../services/activityService/activityService';
import WindMill from '../../components/lotties/WindMill';
import Icon from 'react-native-vector-icons/FontAwesome5';
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

    const onRefresh = React.useCallback(() => {
        GetActvity();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        configMenuMain();
        GetActvity();
    }, [])

    function setModalMenu(value){
        setModalVisible(value);
    }

    function configMenuMain(){
        mainservices.GetConfigMenu(VG.user_uid)
        .then((response) => {
            setConfigMenu(response.data);      
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function GetActvity(){
        activityServices.GetActivitys(VG.user_uid)
        .then((response) => {
            setListActivitys(response.data);    
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function CaseScreen(item){
        switch(item) { 
            case 1:             
                navigation.navigate('newActivity')
                setModalVisible(false)
                break;
            
            case 4:
                auth().signOut();
                break;          
        }
    }
    

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
            <Animatable.View animation="jello" duration={2000} style={{ backgroundColor: '#FFF', padding: 12, flexDirection: 'row' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000000'}}>Atividades Populares</Text>
                <TouchableOpacity style={style.searchCommunity} onPress={(() => setModalMenu(true))}>
                    <Icon name="dice-six" size={29} style={{ color : '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0'), }} />
                </TouchableOpacity>
            </Animatable.View>

            <ScrollView 
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
            >
               {!listActivitys ? null : 
                    listActivitys.map((item, key) => 
                    <TouchableOpacity key={key} style={{ 
                        flexGrow: 1, 
                        flexBasis: 0, 
                        backgroundColor: '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0'),                        
                        margin: 5,
                        padding: 18,
                        borderRadius: 15,
                        }}>
                        <Text style={{ 
                        color: '#FFF', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 10,
                        fontSize: 15, 
                        fontWeight: 'bold', 
                        borderColor: '#000', 
                        fontStyle: 'italic'
                        }}>{item.title}</Text>
                        <Text style={{ 
                        color: '#FFF',
                        fontSize: 10,
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 10,
                        }}>Autor: {item.name}</Text>
                    </TouchableOpacity>             
               )}
            </ScrollView>         

            <Modal visible={modalVisible} animationType="slide" >
                <View style={{backgroundColor: '#FFF', padding: 12, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {setModalMenu(false)}}>
                        <Icon name="arrow-left" size={26} style={{ color : '#000000'}} />
                    </TouchableOpacity>                    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', marginLeft: 10}}>Voltar</Text>
                </View>

                <FlatList data={configMenu} keyExtractor={item => item.id} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => CaseScreen(item.id)} style={{ backgroundColor: item.color_background, flexDirection: 'row', padding: 15, borderRadius: 20, margin: 5}}>
                            <Icon name={item.name_icon} style={{ color: item.color_icon, marginRight: 10}} size={20} />
                            <Text style={{ color: item.color_title}}>{item.title}</Text>
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
        backgroundColor: '#FFF'
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
})