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
    const [colorError, setColorError] = useState(null);

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
        
        ActivityServices.GetActivityById(VG.user_uid, code)
        .then((response) => {
            setMsgErro('');
            setErro(false);
            SetModal(false);

            if(response.data[0].author_uid == VG.user_uid){
                navigation.navigate('usersActivity', { activity: response.data[0]})
            }else{
                if(response.data[0].with_password == 1){
                    navigation.navigate('passActivity', { activity: response.data[0]})
                }else{
                    navigation.navigate('mainSearchActivity', { activity: response.data[0]})
                }
            }     
        })
        .catch((error) => {            
            setColorError('orange')
            SetModal(false);
            setMsgErro('Nenhuma atividade encontrada com o código informado.');
            setErro(true);

            return;
        })            
    }

    function SetModal(value){
        setModalVisible(value);
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
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="#9400D3" />                                                    
                </View>     
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