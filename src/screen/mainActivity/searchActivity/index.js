import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, Modal, ActivityIndicator, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActivityServices from '../../../services/activityService/activityService';
import VG from '../../../components/variables/VG';

export default function searchActivity({ navigation }) {
    const [code, setCode] = useState(null);
    const [error, setErro] = useState(false);
    const [msgErro, setMsgErro] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [Loading, setIsLoading] = useState(false);
    const [colorError, setColorError] = useState(null);
    const [activity, setActivity] = useState(null);
    const [tipo, setTipo] = useState('');

    function Search(){
        if(!code){
            setMsgErro('Informe o código da atividade');
            setErro(true);
            setColorError('red')
            return;
        }
        else{
            setMsgErro('null')
            setErro(false);
        }

        setModalVisible(true);
        setIsLoading(true);  
        
        ActivityServices.GetActivityById(VG.user_uid, code)
        .then((response) => {
            setMsgErro('');
            setErro(false);
            setIsLoading(false);
            setActivity(response.data[0])

            if(response.data[0].type_activity === 'questions'){
                setTipo('Questões');                
            }
        })
        .catch((error) => {            
            setColorError('orange')
            SetModal(false);
            setMsgErro('Nenhuma atividade encontrada com o código informado.');
            setErro(true);
            setActivity(null)
            return;
        })            
    }

    function SetModal(value){
        setModalVisible(value);
        setIsLoading(value);
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#9400D3' />
            <View style={{ alignItems: 'center', marginTop: '25%'}}>
                <Animatable.Text animation="slideInDown" iterationCount={3} direction="alternate" style={style.textTitle}>Informe o código da atividade:</Animatable.Text>
                <TextInput placeholder='Informe o código' onChangeText={(value) => setCode(value)} autoCapitalize='none' style={style.textInput} />
                <TouchableOpacity 
                onPress={Search}
                style={{ 
                    backgroundColor: '#4B0082', 
                    padding: 15, 
                    marginTop: 10, 
                    width: '90%', 
                    alignItems: 'center',
                    borderBottomStartRadius: 20,
                    borderTopEndRadius: 20,
                    flexDirection: 'row',
                }}>
                    <Icon name='search' size={20} style={{color: '#FFF', marginLeft: '30%'}}/>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18, marginLeft: '5%'}}>Encontrar</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', width: '75%', marginTop: 35}}>
                    <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>Caso não tenha o código da atividade, solicite ao criador ou explore as atividades mais populares.</Text>
                </View>
            </View>
            { !error ? null : 
                <Animatable.View 
                style={{
                    position: 'absolute',
                    padding: 10,
                    backgroundColor: colorError,
                    borderTopEndRadius: 20,
                    borderBottomEndRadius: 20,
                }}
                animation="fadeInLeft" 
                duration={500} >                
                    <Text style={style.textMsg}>{msgErro}</Text>
                </Animatable.View>
            } 

            <Modal visible={modalVisible} animationType="slide" >
                    <ImageBackground  
                        source={require('../../../assets/image/activity.png')} 
                        style={{width: '100%', height: '100%', position: 'absolute'}}  
                    />
                    <Animatable.View animation='fadeInDownBig' duration={1000} style={{height: '8%', padding: 15, backgroundColor: '#9400D3', borderBottomEndRadius: 20, borderBottomStartRadius: 20, }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => SetModal(false)}>
                            <Icon name='arrow-left' size={23} style={{ color: '#FFF'}} />
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>Voltar</Text>
                        </TouchableOpacity>                        
                    </Animatable.View>
                    {
                        !Loading 
                        
                        ? 
                           <View>
                                <View style={{ alignItems: 'flex-start', width: '90%', marginTop: '38%', padding: '8%'}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Nome da Atividade:</Text>
                                    <Text style={{color: '#FFF'}}>{ !activity ? null : activity.title}</Text>
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 5}}>Nome do(a) Autor(a):</Text>
                                    <Text style={{color: '#FFF'}}>{ !activity ? null : activity.name}</Text> 
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 5}}>Acesso:</Text>
                                    <Text style={{color: '#FFF'}}>{ !activity ? null : activity.with_password == 1 ? 'Privado' : 'Publico'}</Text> 
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 5}}>Tipo:</Text>
                                    <Text style={{color: '#FFF'}}>{ !activity ? null : tipo}</Text>                                                                   
                                </View>  
                                <View style={{ alignItems: 'center'}}>
                                    <TouchableOpacity style={{ padding: 10, backgroundColor: 'green', width: '50%', alignItems: 'center', marginTop: '13%', borderRadius: 20}}>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Iniciar</Text>
                                            <Icon name='angle-right' size={18} style={{ marginLeft: '3%', color: '#FFF' }}/>
                                        </View>                                        
                                    </TouchableOpacity>
                                </View>
                           </View>                                                        
                        :
                        <View style={{ marginTop: 15, height: '90%'}}>
                            <View style={[style.containerLoad, style.horizontal]}>
                                <ActivityIndicator size="large" color="#FFF" />                                                    
                            </View>
                        </View>
                    }              
            </Modal>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9400D3'
    },
    textTitle:{
        color: '#FFF',
        fontSize: 23,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 15,
        width: '90%',
        padding: 15,
        fontSize: 23,
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
    containerLoad: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})