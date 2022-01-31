import React, { useState, useEffect, state } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, TextInput, ImageBackground, FlatList, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import community from '../../../services/communityService/communityService';
import VG from '../../../components/variables/VG';


export default function exploreCommunity() {
    const [openAddCommunity, setOpenAddCommunity] = useState(false);
    const [fielEmpty, setFielEmpty] = useState(false);
    const [textMsg, setTextMsg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [listCommunity, setlistCommunity] = useState(null);

    var interval;
    function autoroll() {
        interval = setInterval(refreshList);
    }      

    useEffect(() => {
        autoroll()
    }, [])
        
    function refreshList(){
        community.communityGetAll(VG.user_uid)
        .then((response) => {
            setlistCommunity(response.data)
            console.log(response.data)
            clearInterval(interval);
        })
        .catch((error) => {
            console.log(error);
        })      
    }

    function enterCommunity(value, id){
        if(value.entered >= 1){
            return;
        }

        Alert.alert('Olá','Deseja participar da comunidade ' + value.title + '?', [
        {text: 'Sim', onPress: () => {

        let data = {
            community_id: id
        }

        community.communityEnter(data, VG.user_uid)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })   
        
        autoroll();

        }}, 
        {text: 'Não', onPress: () =>{
            return;
        }},],{cancelable: true},);
    }

    function openModalNew(value){
        setOpenAddCommunity(value);
    }

    function createCommunity(){
        const title_clean = title.trim()
        const description_clean = description.trim()

        if(!title_clean || !description_clean){
            setFielEmpty(true);
            setTextMsg('Preencha todos os campo')
        }else{
            setFielEmpty(false);
            setTextMsg('')
        }

        let data = {
            title: title_clean,
            description: description_clean
        }   

        community.communityCreate(data, VG.user_uid)
        .then((response) => {
            Alert.alert("Sucesso", "Comunidade criada com sucesso!");
            openModalNew(false);
        })
        .catch((error) => {
            Alert.alert("Erro", "Ocorreu um erro ao criar uma comunidade.");
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
                 <Icon name="md-earth" size={26} style={{ color : '#FFF'}} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginLeft: 10}}>Explorar Comunidades</Text>
            </View>
            <FlatList
                data={listCommunity}
                keyExtractor={item => item.id}
                renderItem={({ item }) => 
                <TouchableOpacity style={style.itemList} onPress={() => enterCommunity(item, item.id)}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '95%' }}>
                            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
                            <Text style={{color: '#FFF', fontSize: 12}}>{'Descrição: ' +item.description}</Text>
                            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 9}}>{'Quantidade de Usuários: ' + item.quantity_members}</Text>
                        </View>
                        <View style={{ width: '5%' }}>
                            {
                                item.entered >= 1 
                                ? <IconFont5 name="star" size={12} style={{ color : '#FFF'}} /> 
                                : null
                            }                            
                        </View>
                    </View>
                </TouchableOpacity>
                }
                removeClippedSubviews={false}
                style={{ marginBottom: 104  }}
            />           

            <TouchableOpacity style={style.refreshCommunity} onPress={() => refreshList()}>
                <Icon name="md-sync-circle-sharp" size={50} style={{ color : '#FFF'}} />
            </TouchableOpacity>
            <TouchableOpacity style={style.addCommunity} onPress={() => openModalNew(true)}>
                <Icon name="md-add-circle" size={50} style={{ color : '#FFF'}} />
            </TouchableOpacity>
            <TouchableOpacity style={style.searchCommunity}>
                <Icon name="md-search-circle" size={54} style={{ color : '#FFF'}} />
            </TouchableOpacity>

            {!openAddCommunity ? null : 
                <View style={styleModalAdd.modalNew}>
                    <ImageBackground  
                        source={require('../../../assets/image/img_new_community.png')} 
                        style={{width: '100%', height: '100%', position: 'absolute'}}  
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>                        
                        <TextInput placeholder='Nome da comunidade' maxLength={50} onChangeText={(value) => setTitle(value)} style={styleModalAdd.titleInput} /> 
                        <TextInput placeholder='Descrição' maxLength={100} onChangeText={(value) => setDescription(value)} multiline numberOfLines={3} style={styleModalAdd.descriptionInput} />
                    </View>
                    
                    <View style={styleModalAdd.containerButton}>                        
                        <TouchableOpacity style={styleModalAdd.buttonCancelar} onPress={() => openModalNew(false)}>
                            <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleModalAdd.buttonSalvar} onPress={() => createCommunity(false)}>
                            <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Salvar</Text>
                        </TouchableOpacity>
                    </View>      

                    { !fielEmpty ? null : 
                        <Animatable.View  animation="fadeInLeft" duration={2000} style={styleModalAdd.errorField}>                        
                            <Text style={styleModalAdd.textMsg}>{textMsg}</Text>
                        </Animatable.View>
                    }                 
                </View>                
            }
                        
        </View>
        
    );
}

const styleModalAdd = StyleSheet.create({
    modalNew: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fae5d9',
    },
    title:{
        marginTop: 25,
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    titleInput: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: 165,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 12,
    },
    descriptionInput: {
        width: '90%',
        padding: 10,
        backgroundColor: '#FFF',
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 12,
    },
    containerButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonCancelar: {
        backgroundColor: 'red',
        marginRight: 10,
        padding: 15,
        width: 165,
        borderRadius: 12,
    },
    buttonSalvar: {
        backgroundColor: 'green',
        marginLeft: 10,
        padding: 15,
        width: 165,
        borderRadius: 12,
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
    errorField:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'red',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
})

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#294444'
    },    
    addCommunity: {
        position: 'absolute',
        bottom: 160,
        right: 10,
    },
    searchCommunity: {
        position: 'absolute',
        bottom: 100,
        right: 10,
    },
    refreshCommunity:{
        position: 'absolute',
        bottom: 220,
        right: 10,
    },
    itemList:{
        backgroundColor: '#486d6e',
        margin: 3,
        padding: 10,
        borderRadius: 12
    }
})