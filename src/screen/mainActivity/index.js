import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, StatusBar, FlatList, Image, RefreshControl, ScrollView } from 'react-native';
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

    function Enter(item){
        if(item.author_uid == VG.user_uid){
            navigation.navigate('usersActivity', { activity: item})
        }else{
            if(item.with_password == 1){
                navigation.navigate('passActivity', { activity: item})
            }else{
                navigation.navigate('mainSearchActivity', { activity: item})
            }
        }
    }   

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />      

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
                    <TouchableOpacity key={key} onPress={() => {Enter(item)}} style={{ 
                        backgroundColor: '#365663',                     
                        margin: 5,
                        borderRadius: 15,                
                        }}>
                        <View style={{flexDirection: 'row'}}>
                        <Image
                            style={style.logo}
                            source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                            }}
                        />
                            {/* <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', width:'86%', borderBottomStartRadius: 15, borderTopLeftRadius: 15, padding: 15}}>
                                <Text style={{color: '#FFF', fontSize: 15, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>{item.title}</Text>     
                            </View> */}
                        </View>
                        
                        
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
    logo: {
        height: 50,
        width: 50,
    }
})