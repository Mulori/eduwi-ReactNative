import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconFont from 'react-native-vector-icons/FontAwesome';

import ModalMenu from '../component/menu_main';

export default function group({ route, navigation,  }) {
    const { valueCommunity } = route.params;
    const [menuVisible, setMenuVisible] = useState(false);

    function setModalMenu(){
        if(menuVisible){
            setMenuVisible(false);
        }else{
            setMenuVisible(true);
        }
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor={'#294444'} />
            <ImageBackground  
                source={require('../../../assets/image/back_group.png')} 
                style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <View style={{ 
                    backgroundColor: '#294444', 
                    padding: 12, 
                    borderBottomLeftRadius:15, 
                    borderBottomRightRadius: 15,
                    flexDirection: 'column',
            }}>
                <View style={{ 
                    flexDirection: 'row',
                    marginBottom: 8
                }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <IconFont name="chevron-left" size={26} style={{ color : '#FFF'}} />
                    </TouchableOpacity>
                    <IconFont name="users" size={26} style={{ color : '#FFF', marginLeft: '5%'}} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginLeft: 10}}>Grupos da comunidade</Text>
                    <TouchableOpacity onPress={setModalMenu}>
                        <IconFont name="list-ul" size={26} style={{ color : '#FFF', marginLeft: '30%', }} />
                    </TouchableOpacity>
                </View> 
                <View style={{ alignItems: 'center'}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFF', marginLeft: 10}}>{valueCommunity.title}</Text>
                </View>
            </View>
            

            <View>
            {
                !menuVisible ? null :
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ModalMenu />
                </View>                
            }
                
            </View>  
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    }
})