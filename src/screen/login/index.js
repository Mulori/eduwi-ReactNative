import React, {useState} from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, StyleSheet, TextInput, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import LottieCrashHead from '../../components/lotties/crashHead';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFieldEmpty, setisFieldEmpty] = useState(false)
    const [EmailIncorrect, setEmailIncorrect] = useState(false)
    const [UserIncorrect, setUserIncorrect] = useState(false)
    const [sendEmail, setSendEmail] = useState(false)
    const [textMessage, setTextMessage] = useState('')

    const validator = require('validator');

    function Login(){

        setUserIncorrect(false);
        setSendEmail(false);

        if(!email || !password){
            setisFieldEmpty(true);
            return;
        }else{
            setisFieldEmpty(false);
        }

        if (validator.isEmail(email)) {
            setEmailIncorrect(false);
        } else {
            setEmailIncorrect(true);
            return;
        }

        auth()
        .signInWithEmailAndPassword(email, password)
        .then()
        .catch((erro) => {
            console.log(erro);
            if (erro.code === 'auth/user-not-found'){
                setTextMessage('Email e/ou senha invalido(s)');
                setUserIncorrect(true);
                return;
            }
            if (erro.code === 'auth/wrong-password'){
                setTextMessage('Senha incorreta');
                setUserIncorrect(true);
                return;
            }
            if (erro.code === 'auth/too-many-requests'){
                setTextMessage('Usuário bloqueado temporariamente');
                setUserIncorrect(true);
                return;
            }
        })
        .finally(() => {

        })
    }

    function back(){
        navigation.pop();
    }

    function forgot(){

        if(!email){
            setisFieldEmpty(true);
            return;
        }else{
            setisFieldEmpty(false);
        }

        auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            setSendEmail(true);
        })
        .catch((erro) => {
            console.log(erro);
            setSendEmail(false);
        })
    }

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#5e17eb' barStyle='light-content'/>
            <LottieCrashHead />            
            <Text style={style.title}>Entrar</Text>            
            <View style={style.containerForm}>                
                <TextInput style={style.inputHead} placeholder='Email' autoCapitalize='none' keyboardType='email-address' onChangeText={ (value) => setEmail(value)}/>
                <TextInput style={style.input} placeholder='Senha'  secureTextEntry onChangeText={ (value) => setPassword(value)}/>
                <TouchableOpacity style={style.containerButton} onPress={Login}>
                    <Text style={style.textButton}>Entrar</Text>

                </TouchableOpacity>    
                { !UserIncorrect 
                ? null 
                : 
                <TouchableOpacity style={style.containerforgot} onPress={forgot}>
                    <Icon name="emoji-sad" size={20} />
                    <Text style={style.textBack}>Esqueci minha senha</Text>
                </TouchableOpacity> 
                }       
                    
            </View>
            
            <TouchableOpacity style={style.containerBack} onPress={back}>
                <Icon name="reply-all" size={20} style={{ color: '#FFF', }}/>
                <Text style={style.textBack}>Não possuo uma conta</Text>
            </TouchableOpacity>
            <Icon name="mail" size={20} style={style.iconEmail} />
            <Icon name="lock" size={20} style={style.iconPass} />

            { !isFieldEmpty ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.fieldEmpty}>            
              <Text style={style.textMsg}>Preencha todos os campos</Text>
            </Animatable.View>
            } 

            { !EmailIncorrect ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.emailInvalid}>            
              <Text style={style.textMsg}>O e-mail informado é invalido</Text>
            </Animatable.View>
            } 

            { !UserIncorrect ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.userInvalid}>            
              <Text style={style.textMsg}>{textMessage}</Text>
            </Animatable.View>
            } 

            { !sendEmail ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.sendEmail}>            
              <Text style={style.textMsg}>Email de redefinição de senha enviado</Text>
            </Animatable.View>
            }
        </View>    
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5e17eb',
    },
    inputHead:{
        backgroundColor: '#FFFFFF',
        width: '90%',      
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,        
        paddingLeft: 35,
    },
    input:{
        backgroundColor: '#FFFFFF',
        width: '90%',      
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,
        alignItems: 'center',
        paddingLeft: 35,
    },
    button:{
        borderRadius: 10
    },
    containerForm:{
        alignItems : 'center'
    },
    containerButton:{
        padding: 15,
        backgroundColor: '#d2583a',
        width: '90%',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10,
    },
    textButton:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    title:{
        marginTop: 60,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFF',
    },
    iconEmail:{
        position: 'absolute',
        marginTop: 275,
        marginLeft: 28,
    },
    iconPass:{
        position: 'absolute',
        marginTop: 331,
        marginLeft: 28,
    },
    containerBack:{
        paddingLeft: 20,
        marginTop: 40,
        flexDirection: 'row',
    },
    textBack:{
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 8,
        color: '#FFF',
    },
    containerforgot:{
        paddingLeft: 20,
        marginTop: 10,
        flexDirection: 'row',
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
    emailInvalid:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'red',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    userInvalid:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'orange',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    fieldEmpty:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'blue',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    sendEmail:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'green',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    }
})