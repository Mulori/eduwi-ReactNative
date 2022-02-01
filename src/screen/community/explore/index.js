import React, { useState, useEffect, state } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, TextInput, ImageBackground, RefreshControl, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import community from '../../../services/communityService/communityService';
import VG from '../../../components/variables/VG';

const wait = (timeout) => {
return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function exploreCommunity() {
    const [openAddCommunity, setOpenAddCommunity] = useState(false);
    const [openAddCommunityPassword, setOpenAddCommunityPassword] = useState(false);
    const [fielEmpty, setFielEmpty] = useState(false);
    const [textMsg, setTextMsg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('0');
    const [passwordEnter, setPasswordEnter] = useState('');
    const [idCommuniySelected, setIdCommuniySelected] = useState('');
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
        community.communityGetAll(VG.user_uid)
        .then((response) => {
            setlistCommunity(response.data)          
        })
        .catch((error) => {
            console.log(error);
        })   
    }

    function enterCommunityPassword(){
        if(!passwordEnter){
            Alert.alert("Atenção", "Informe a senha da comunidade.");
            return;
        }    
        
        if(!idCommuniySelected){
            Alert.alert("Atenção", "Nenhuma comunidade selecionada. Tente novamente.");
            return;
        }

        let data = {
            community_id: idCommuniySelected,
            password: passwordEnter
        }

        console.log(VG.user_uid)

        community.communityEnter(data, 'PrVBgJEDUBSqll2BosFyWyBgblM2')
        .then((response) => {
            console.log(response.data)
            setOpenAddCommunityPassword(false);
        })
        .catch((error) => {
            console.log(error);
            Alert.alert("Atenção", "Senha incorreta.");
            return;            
        })           
        
        autoroll();
    }

    function enterCommunity(value, id){
        if(value.entered >= 1){
            return;
        }

        Alert.alert('Olá','Deseja participar da comunidade ' + value.title + '?', [
        {text: 'Sim', onPress: () => {

        if(value.with_password === 1){
            setPasswordEnter(null)
            openModalNewPass(true);
            setIdCommuniySelected(id);
            return;
        }

        let data = {
            community_id: id,
            password: '0'
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
        setPassword('0')
        setOpenAddCommunity(value);
        setOpenAddCommunityPassword(value ? !value : false);
    }

    function openModalNewPass(value){
        setOpenAddCommunityPassword(value);
        setOpenAddCommunity(value ? !value : false);
    }

    function createCommunity(){
        const title_clean = title.trim()
        const description_clean = description.trim()
        const password_clean = password.trim()

        if(!title_clean || !description_clean){
            setFielEmpty(true);
            setTextMsg('Preencha todos os campo')
        }else{
            setFielEmpty(false);
            setTextMsg('')
        }

        let data = {
            title: title_clean,
            description: description_clean,
            password: !password_clean ? '0' :  password_clean
        }   

        community.communityCreate(data, VG.user_uid)
        .then((response) => {
            Alert.alert("Sucesso", "Comunidade criada com sucesso!");
            openModalNew(false);
            autoroll();
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
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginLeft: 10}}>Explorar comunidades</Text>
                              
                <TouchableOpacity style={style.addCommunity} onPress={() => openModalNew(true)}>
                    <Icon name="md-add-circle" size={30} style={{ color : '#FFF'}} />
                </TouchableOpacity>
                <TouchableOpacity style={style.searchCommunity}>
                    <Icon name="md-search-circle" size={33} style={{ color : '#FFF'}} />
                </TouchableOpacity>
            </View>
            <ScrollView 
            style={{ marginBottom: 104  }}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
            >
            {
                listCommunity ?  
                listCommunity.map((item, key) => 
                    <TouchableOpacity style={style.itemList} key={key} onPress={() => enterCommunity(item, item.id)}>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={{ width: '95%' }}>
                                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
                                <Text style={{color: '#FFF', fontSize: 12}}>{'Descrição: ' +item.description}</Text>
                                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 9}}>{'Quantidade de membros: ' + item.quantity_members}</Text>
                                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 9}}>{'Criado por: ' + item.name}</Text>
                            </View>
                            <View style={{ width: '5%' }}>
                                {
                                    item.entered >= 1 
                                    ? <IconFont5 name="star" size={12} style={{ color : '#FFF'}} /> 
                                    : null
                                }   
                                {
                                    item.with_password >= 1 
                                    ? <IconFont5 name="lock" size={12} style={{ color : '#FFF', marginTop: '50%'}} /> 
                                    : <IconFont5 name="lock-open" size={12} style={{ color : '#FFF', marginTop: '50%'}} /> 
                                }                           
                            </View>
                        </View>
                    </TouchableOpacity>
                )
                : null
            }
            </ScrollView>

            {
                //aqui tinha uns botao
            }
    

            {!openAddCommunity ? null : 
                <View style={styleModalAdd.modalNew}>
                    <ImageBackground  
                        source={require('../../../assets/image/img_new_community.png')} 
                        style={{width: '100%', height: '100%', position: 'absolute'}}  
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>                        
                        <TextInput placeholder='Nome da comunidade' maxLength={50} onChangeText={(value) => setTitle(value)} style={styleModalAdd.titleInput} /> 
                        <TextInput placeholder='Descrição' maxLength={100} onChangeText={(value) => setDescription(value)} multiline numberOfLines={3} style={styleModalAdd.descriptionInput} />
                        <TextInput placeholder='Senha opcional' maxLength={20} secureTextEntry={true} autoCapitalize='none' onChangeText={(value) => setPassword(value)} style={styleModalAdd.passInput} /> 
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

           {!openAddCommunityPassword ? null : 
                <View style={styleModalPass.modalNew}>
                    <View style={{flex: 1, backgroundColor: '#FFF', width: '85%', alignItems: 'center', borderRadius: 20}}>
                    <Text style={{ fontWeight: 'bold'}}>Informe a senha:</Text>   
                        <View style={{flexDirection: 'row'}}>         
                            <IconFont5 name="lock" size={20} style={{ color : '#294444', bottom: -25, marginLeft: '25%'}} />
                            <TextInput placeholder='**********' secureTextEntry={true} autoCapitalize='none' onChangeText={(value) => setPasswordEnter(value)} style={styleModalPass.passInput} /> 
                        </View>
                        
                        <View style={styleModalPass.containerButton}>                        
                            <TouchableOpacity style={styleModalPass.buttonCancelar} onPress={() => openModalNewPass(false)}>
                                <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleModalPass.buttonSalvar} onPress={enterCommunityPassword}>
                                <Text style={{ textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Entrar</Text>
                            </TouchableOpacity>
                        </View>

                        { !fielEmpty ? null : 
                            <Animatable.View  animation="fadeInLeft" duration={2000} style={styleModalPass.errorField}>                        
                                <Text style={styleModalPass.textMsg}>{textMsg}</Text>
                            </Animatable.View>
                        }                 
                    </View> 
                </View>   
            }
                        
        </View>
        
    );
}

const styleModalPass = StyleSheet.create({
    modalNew: {
        position: 'absolute',
        width: '100%',
        height: 140,
        alignItems: 'center',
        marginTop: '50%',
    },
    passInput: {
        width: 150,
        backgroundColor: '#FFF',
        padding: 5,
        marginLeft: 10,
        marginTop: '3%',
        marginRight: '30%',
        borderBottomWidth: 2
    },
    buttonCancelar: {
        backgroundColor: 'red',
        marginRight: 10,
        padding: 10,
        width: '25%',
        borderRadius: 12,
    },
    buttonSalvar: {
        backgroundColor: 'green',
        marginLeft: 10,
        padding: 10,
        width: 165,
        borderRadius: 12,
    },
    containerButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '3%'
    },
})

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
        marginTop: '35%',
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 12,
    },
    passInput: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: '3%',
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 12,
    },
    descriptionInput: {
        width: '90%',
        padding: 10,
        backgroundColor: '#FFF',
        marginTop: '3%',
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 12,
    },
    containerButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
    },
    buttonCancelar: {
        backgroundColor: 'red',
        marginRight: 10,
        padding: 10,
        width: 165,
        borderRadius: 12,
    },
    buttonSalvar: {
        backgroundColor: 'green',
        marginLeft: 10,
        padding: 10,
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
        backgroundColor: '#486d6e',
        margin: 3,
        padding: 10,
        borderRadius: 12
    }
})