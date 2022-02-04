import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import community from '../../../services/communityService/communityService';
import VG from '../../../components/variables/VG';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconFont from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const wait = (timeout) => {
return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function myCommunity({ navigation }) {
    const [listCommunity, setlistCommunity] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        autoroll();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    var interval;
    function autoroll() {
        interval = setInterval(refreshList);
    }      

    useEffect(() => {
        autoroll()
    }, [])
        
    function refreshList(){
        clearInterval(interval);
        community.communityGetAllUser(VG.user_uid)
        .then((response) => {
            setlistCommunity(response.data)          
        })
        .catch((error) => {
            console.log(error);
        })   
    }

    return(
        <View style={style.container}>  
        <StatusBar barStyle='light-content' backgroundColor={'#294444'} />
            <View style={{ 
                backgroundColor: '#294444', 
                padding: 12, 
                borderBottomLeftRadius:10, 
                borderBottomRightRadius: 10,
                flexDirection: 'row',
            }}>
                <IconFont name="users" size={26} style={{ color : '#FFF'}} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginLeft: 10}}>Minhas comunidades</Text>
            </View>                 
        <ScrollView
            style={{ marginBottom: 0, backgroundColor: '#fff'  }}  
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
        >

            {
                listCommunity ?
                listCommunity.map((value, key) => 
                    <TouchableOpacity style={style.itemList} key={key} >
                        <View style={{ flexDirection: 'row'}}>
                            <View style={{ width: '95%' }}>
                                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>{value.title}</Text>
                                <Text style={{color: '#000', fontSize: 12}}>{'Descrição: ' + value.description}</Text>
                                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 9}}>{'Quantidade de membros: ' + value.quantity_members}</Text>
                                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 9}}>{'Criado por: ' + value.name}</Text>
                            </View>
                            <View style={{ width: '5%' }}> 
                                {
                                    value.with_password >= 1 
                                    ? <IconFont5 name="lock" size={12} style={{ color : '#000', marginTop: '50%'}} /> 
                                    : <IconFont5 name="lock-open" size={12} style={{ color : '#000', marginTop: '50%'}} /> 
                                }                           
                            </View>
                        </View>
                </TouchableOpacity>
                )
                : null

            }
                     
        </ScrollView>   
               
                    
    </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#294444'
    },    
    addCommunity: {
        position: 'absolute',
        bottom: 10,
        right: 50,
    },
    searchCommunity: {
        position: 'absolute',
        bottom: 8,
        right: 10,
    },
    refreshCommunity:{
        position: 'absolute',
        bottom: 10,
        right: 90,
    },
    itemList:{
        backgroundColor: '#FFF',
        margin: 3,
        padding: 10,
        borderRadius: 12,
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 10
    }
})