import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VG from '../../../components/variables/VG';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import activityServices from '../../../services/activityService/activityService';

export default function myActivity({ navigation }) {
    const [data, setData] = useState(null);

    function GetActvity(){
        activityServices.Get("/activity/users", VG.user_uid)
        .then((response) => {
            setData(response.data);    
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function ConvertNameActivity(value){
        switch(value){
            case "questions":
                return "Questões";
        }
    }

    useEffect(() => {
        GetActvity()
    }, [])
        
    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFD700' />
            <Animatable.View  animation='fadeInDownBig' duration={1000}  style={style.containerHead}>
                <Text style={style.titleHead}>Minhas atividades</Text>
                <IconFont5 style={style.iconHead} name='book' size={22} />
            </Animatable.View>
            <ScrollView>
                {!data ? null : 
                        data.map((item, key) => 
                        <TouchableOpacity key={key} onPress={() => {navigation.navigate('usersActivity', { activity: item})}}>
                            <View style={{ backgroundColor: '#f5f5f5', padding: 15, borderBottomWidth: 0.5, marginTop: 3}}>
                                <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>{item.title}</Text> 
                                <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>Membros: {item.number_members}</Text>     
                                <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>Tipo: {ConvertNameActivity(item.type_activity)}</Text> 
                                <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>Acesso: {item.with_password == 1 ? 'Privado' : 'Publico'}</Text>   
                            </View>                            
                        </TouchableOpacity>             
                )}
            </ScrollView>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerHead: {
        backgroundColor: '#FFD700',
        height: '5%',
        flexDirection: 'row'
    },
    titleHead: {
        color: '#000',
        marginLeft: '5%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconHead: {
        marginLeft: '3%'
    }
})