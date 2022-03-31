import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList, Modal, Alert, Linking } from 'react-native';
import activityServices from '../../../services/activityService/activityService';
import VG from '../../../components/variables/VG';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieConfig from '../../../components/lotties/config';
import { TextInput } from 'react-native-paper';
import { Buffer } from 'buffer'
import Share  from 'react-native-share';


export default function usersActivity({ navigation, route }) {
    const { activity } =  route.params;
    const [data, setData] = useState(null);
    const [modalMenu, setModalMenu] = useState(false);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState(null);    
    const [pass, setPass] = useState(null);

    const openShared = async () => {
        const shareOption = {
            message: "EDUWI - Você acaba de receber o código de uma atividade: " + code + ""
        }

        try{
            const send = await Share.open(shareOption);
        }
        catch{

        }
    }


    function GetUsers(){
        activityServices.Get('/activity/' + activity.id + '/users/concluded', VG.user_uid)
        .then((response) => {
            console.log(response.data)
            setData(response.data);    
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    function AlterarTitle(){
        if(!title){
            Alert.alert('Atenção', 'Informe um titulo.');
            return;
        }

        activityServices.Put('/activity/' + activity.id + '/title', VG.user_uid, { title: title.trim()})
        .then((response) => {
            navigation.pop();   
        })
        .catch((error) => {
            Alert.alert(error)
        })  
    }

    function AlterarPass(){
        if(!pass){
            setPass('');
        }else{
            setPass(pass.trim());
        }

        activityServices.Put('/activity/' + activity.id + '/password', VG.user_uid, { password: pass})
        .then((response) => {
            navigation.pop();   
        })
        .catch((error) => {
            Alert.alert(error)
        })  
    }

    useEffect(() => {
        setCode(Buffer.from(activity.id.toString(), 'utf-8').toString('base64'))
        GetUsers();
    }, [])

    function Header(props){
        const [title, setTitle] = useState(props.title);
    
        return(
            <View style={{ backgroundColor: '#582770', padding: 10, alignItems: 'center', borderRadius: 15, borderBottomWidth: 1, borderBottomColor: '#FFF', flexDirection: 'row'}}>
                <View style={{ width: '90%'}}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19}}>{title}</Text>  
                    <TouchableOpacity onPress={() => openShared(data, code)} >
                        <Text style={{ color: '#FFF', fontSize: 15}}>Código: {code}</Text>  
                    </TouchableOpacity>                    
                </View>
                <View style={{ width: '10%'}}>
                    <TouchableOpacity onPress={() => {setModalMenu(true)}}>
                        <Icon name='menu' size={35} style={{ color: '#FFF'}}/>
                    </TouchableOpacity>
                </View>            
            </View>
        )
    }

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
                            <TouchableOpacity key={item.id} 
                            onPress={() => {navigation.navigate('QuestionsUsers', { activity: item.activity_id, user_uid: item.user_uid, name: item.full_name, value: item.value})}}  
                            style={{ 
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

                <Modal visible={modalMenu}>
                    <View style={{ height: '100%'}}>
                        <View style={{ backgroundColor: '#582770', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#FFF', flexDirection: 'row'}}>
                            <View style={{ width: '90%', flexDirection: 'row'}}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19}}>Configurações</Text>
                                <LottieConfig />
                            </View>
                            <View style={{ width: '10%'}}>
                                <TouchableOpacity onPress={() => {setModalMenu(false)}}>
                                    <Icon name='close' size={35} style={{ color: '#FFF'}}/>
                                </TouchableOpacity>
                            </View>            
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ width: '70%', alignItems: 'center'}}>
                                   <TextInput mode='outlined' onChangeText={(value) => setTitle(value)} label={activity.title} style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff'}}/>
                                </View>
                                <View style={{ width: '30%', marginTop: 5}}>
                                    <TouchableOpacity 
                                    onPress={AlterarTitle}
                                    style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15}}>
                                        <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>Alterar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ width: '70%', alignItems: 'center'}}>
                                   <TextInput mode='outlined' onChangeText={(value) => setPass(value)} placeholder='Senha' secureTextEntry style={{ width: '90%', fontWeight: 'bold', backgroundColor: '#FFF', borderColor: '#4e71ff'}}/>
                                </View>
                                <View style={{ width: '30%', marginTop: 5}}>
                                    <TouchableOpacity 
                                    onPress={AlterarPass}
                                    style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15}}>
                                        <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>Alterar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                activity.type_activity == 'questions' ? 
                                <TouchableOpacity 
                                onPress={() => {
                                    setModalMenu(false);
                                    navigation.navigate('QuestionsActivity', { data: activity});
                                }}
                                style={{ padding: 15, margin: 5, backgroundColor: '#4e71ff', alignItems: 'center', borderRadius: 15}}>
                                    <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>Visualizar Questões</Text>
                                </TouchableOpacity>
                                :
                                null
                            }        

                            <TouchableOpacity 
                            onPress={() => {
                                Alert.alert("Atenção?", "Deseja encerrar a atividade permanentemente?",  
                                    [{  text: "Sim",
                                        onPress: () => {
                                            activityServices.Put('/activity/' + activity.id + '/close', VG.user_uid)
                                            .then(() => {
                                                navigation.pop(); 
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })    
                                        },
                                    },
                                        {
                                        text: "Não",
                                        },
                                    ]
                                );
                            }}
                            style={{ padding: 15, margin: 5, backgroundColor: 'red', alignItems: 'center', borderRadius: 15}}>
                                <Text style={{ color: '#FFF', fontSize: 15, fontWeight: 'bold'}}>Encerrar</Text>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                </Modal>           
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