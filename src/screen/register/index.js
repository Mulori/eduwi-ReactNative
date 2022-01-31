import React, {useState} from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, StyleSheet, TextInput, Alert, StatusBar, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import LottieRegister from '../../components/lotties/register';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import userServices from '../../services/userService/userService';

export default function Register({ navigation }) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isEmaiIncorrect, setEmailIncorrect] = useState(false)
    const [isPassIncorrect, setPassIncorrect] = useState(false)
    const [isFieldEmpty, setisFieldEmpty] = useState(false)
    const [isPassLower, setisPassLower] = useState(false)

    const validator = require('validator');

    function Register(){

        const name_clean = name.trim()
        const last_name_clean = lastName.trim()
        const email_clean = email.trim()
        const password_clean = password.trim()
        const password_confirm_clean = passwordConfirm.trim()

        if(!name_clean || !last_name_clean || !email_clean || !password_clean || !password_confirm_clean){
            setisFieldEmpty(true);
            return;
        }else{
            setisFieldEmpty(false);
        }

        if (validator.isEmail(email_clean)) {
            setEmailIncorrect(false);
        } else {
            setEmailIncorrect(true);
            return;
        }

        if(password_clean !== password_confirm_clean){
            setPassIncorrect(true);
            return;
        }else{
            setPassIncorrect(false);
        }

        if(password_clean.length < 6){
            setisPassLower(true);
            return;
        }else{
            setisPassLower(false);
        }

        auth()
        .createUserWithEmailAndPassword(email_clean, password_clean)
        .then((ok) => {
            let data = {
                firebase_uid: ok.user.uid,
                email: ok.user.email,
                name: name_clean,
                last_name: last_name_clean
            }   

            userServices.userCreate(data)
            .then((response) => {
                Alert.alert('Sucesso', 'Conta criada com sucesso!', [{text: 'Ok',style: 'destructive', }]);
                navigation.pop();
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Erro', 'Ocorreu um problema ao criar a conta', [{text: 'Ok',style: 'destructive', }]);
            })        
        })
        .catch((erro) => {
            Alert.alert("Erro", erro);
        })
    }

    function back(){
        navigation.pop();
    }

    return (    
        <View style={style.container}>
            <StatusBar backgroundColor='#d2583a' barStyle='light-content'/>   
            <Animatable.Text animation="fadeInLeft" duration={500} style={style.title}>Cadastre-se</Animatable.Text>            
            <View style={style.containerForm}>     
                <TextInput style={style.inputHead} placeholder='Nome' onChangeText={ (value) => setName(value)}/>
                <TextInput style={style.input} placeholder='Sobrenome' onChangeText={ (value) => setLastName(value)}/>           
                <TextInput style={style.input} placeholder='Email' autoCapitalize = 'none' onChangeText={ (value) => setEmail(value)}/>
                <TextInput style={style.input} placeholder='Senha' autoCapitalize = 'none' secureTextEntry onChangeText={ (value) => setPassword(value)}/>
                <TextInput style={style.input} placeholder='Confirme a senha' autoCapitalize = 'none' secureTextEntry onChangeText={ (value) => setPasswordConfirm(value)}/>
                <TouchableOpacity style={style.containerButton} onPress={Register}>
                    <Text style={style.textButton}>Registrar</Text>
                </TouchableOpacity>        
            </View>
            
            <TouchableOpacity style={style.containerBack} onPress={back}>
                <Icon name="reply-all" size={20} style={{ color: '#FFF'}} />
                <Text style={style.textBack}>Já possuo uma conta</Text>
            </TouchableOpacity>
            <Icon name="star" size={20} style={style.iconName} />
            <Icon name="star-outlined" size={20} style={style.iconLastName} />
            <Icon name="mail" size={20} style={style.iconEmail} />
            <Icon name="lock" size={20} style={style.iconPass} />
            <Icon name="lock" size={20} style={style.iconPassTwo} />

            { !isEmaiIncorrect ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.emailInvalid}>
            
              <Text style={style.textMsg}>O e-mail informado é invalido</Text>
            </Animatable.View>
            }   

            { !isPassIncorrect ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.passInvalid}>
            
              <Text style={style.textMsg}>As senhas não coincidem</Text>
            </Animatable.View>
            }   
        
            { !isFieldEmpty ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.fieldEmpty}>
            
              <Text style={style.textMsg}>Preencha todos os campos</Text>
            </Animatable.View>
            }   

            { !isPassLower ? null : 
            <Animatable.View  animation="fadeInLeft" duration={500} style={style.fieldEmpty}>
            
              <Text style={style.textMsg}>A senha deve conter no minimo 6 caracteres</Text>
            </Animatable.View>
            }   
        </View>    
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2583a',
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
    containerForm:{
        alignItems : 'center'
    },
    containerButton:{
        padding: 15,
        backgroundColor: '#1b2d94',
        width: '90%',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
    textButton:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    title:{
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFF',
    },    
    iconName:{
        position: 'absolute',
        marginTop: 104,
        marginLeft: 28,
    },
    iconLastName:{
        position: 'absolute',
        marginTop: 160,
        marginLeft: 28,
    },
    iconEmail:{
        position: 'absolute',
        marginTop: 221,
        marginLeft: 28,
    },
    iconPass:{
        position: 'absolute',
        marginTop: 276,
        marginLeft: 28,
    },
    iconPassTwo:{
        position: 'absolute',
        marginTop: 333,
        marginLeft: 28,
    },
    containerBack:{
        paddingLeft: 20,
        marginTop: 40,
        flexDirection: 'row',
    },
    textBack:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 8,
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
    passInvalid:{
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
    }
})