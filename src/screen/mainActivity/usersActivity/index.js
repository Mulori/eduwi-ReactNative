import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import activityServices from '../../../services/activityService/activityService';
import VG from '../../../components/variables/VG';

function Header(props){
    const [title, setTitle] = useState(props.title);

    return(
        <View style={{ backgroundColor: '#582770', padding: 12, alignItems: 'center', borderRadius: 15, borderBottomWidth: 1, borderBottomColor: '#FFF'}}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 22}}>{title}</Text>
        </View>
    )
}

export default function usersActivity({ navigation, route }) {
    const { activity } =  route.params;
    const [data, setData] = useState(null);

    function GetUsers(){
        activityServices.Get('/activity/' + activity.id + '/users/concluded', VG.user_uid)
        .then((response) => {
            setData(response.data);    
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    useEffect(() => {
        GetUsers()
    }, [])

    return(
        <View style={{ flex: 1, backgroundColor: '#582770'}}>
            <View >
                <StatusBar barStyle='ligth-content' backgroundColor='#582770' />
                <Header title={activity.title} />
            </View>
            <View style={style.container}>
                <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: '#FFF', margin: 10, borderRadius: 15}}>
                            <TouchableOpacity key={item.id}  style={{ 
                                backgroundColor: '#F0F0', 
                                flexDirection: 'row', 
                                padding: 10, 
                                borderRadius: 20, 
                                margin: 5
                            }}>
                                <View style={{flexDirection: 'column', width: '85%'}}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold'}}>{item.full_name}</Text>
                                    <Text style={{ color: '#000', fontSize: 12}}>{item.email}</Text>
                                </View>        
                                <View style={{flexDirection: 'column', width: '15%'}}>
                                    <Text style={{ color: item.value >= 50 ? 'green' : 'red', fontSize: 14, fontWeight: 'bold' }}>{item.value}%</Text>
                                </View> 
                            </TouchableOpacity>
                        </View>                        
                    );
                }}
                />                
            </View> 
        </View>
              
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#582770',
        borderRadius: 20
    }
})