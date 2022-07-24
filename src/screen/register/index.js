import React, { useState } from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, StyleSheet, TextInput, Alert, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import userServices from '../../services/userService/userService';
import style from './styles.js'
import MainActivity from '../../services/mainService/mainService';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isEmaiIncorrect, setEmailIncorrect] = useState(false);
    const [isPassIncorrect, setPassIncorrect] = useState(false);
    const [isFieldEmpty, setisFieldEmpty] = useState(false);
    const [isPassLower, setisPassLower] = useState(false);

    const validator = require('validator');

    async function Register() {
        const name_clean = name.trim()
        const last_name_clean = lastName.trim()
        const email_clean = email.trim()
        const password_clean = password.trim()
        const password_confirm_clean = passwordConfirm.trim()

        if (!name_clean || !last_name_clean || !email_clean || !password_clean || !password_confirm_clean) {
            setisFieldEmpty(true);
            return;
        } else {
            setisFieldEmpty(false);
        }

        if (validator.isEmail(email_clean)) {
            setEmailIncorrect(false);
        } else {
            setEmailIncorrect(true);
            return;
        }

        if (password_clean !== password_confirm_clean) {
            setPassIncorrect(true);
            return;
        } else {
            setPassIncorrect(false);
        }

        if (password_clean.length < 6) {
            setisPassLower(true);
            return;
        } else {
            setisPassLower(false);
        }

        let data_email = {
            email: email_clean
        }
        
        await MainActivity.PostByKey('/users/email/exist', data_email)
        .then((ret) => {
            console.log(ret.data)
            if(ret.data.length > 0){
                Alert.alert('Aviso de e-mail', 'O e-mail informado já está cadastrado.')
                return;
            }
        })
        .catch((cat) => {
            console.log(cat.data)
        })

        auth()
            .createUserWithEmailAndPassword(email_clean, password_clean)
            .then(ok => {
                let data = {
                    firebase_uid: ok.user.uid,
                    email: ok.user.email,
                    name: name_clean,
                    last_name: last_name_clean
                }

                userServices.userCreate(data)
                    .then((response) => {
                        auth().signOut();
                        Alert.alert('Sucesso', 'Conta criada com sucesso!', [{ text: 'Ok', style: 'destructive', }]);
                    })
                    .catch((error) => {
                        console.log(error);
                        Alert.alert('Ocorreu um problema ao criar a conta', error, [{ text: 'Ok', style: 'destructive', }]);
                    })
            })
            .catch((erro) => {
                Alert.alert("Erro", erro);
            })
    }

    function back() {
        navigation.pop();
    }

    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#d2583a' barStyle='light-content' />
            <ScrollView>
                <Animatable.Text animation="fadeInLeft" duration={500} style={style.title}>Cadastre-se</Animatable.Text>
                <View style={style.containerForm}>
                    <TextInput style={style.inputHead} placeholder='Nome' autoCapitalize='sentences' onChangeText={(value) => setName(value)} />
                    <TextInput style={style.input} placeholder='Sobrenome' autoCapitalize='sentences' onChangeText={(value) => setLastName(value)} />
                    <TextInput style={style.input} placeholder='Seu melhor e-mail' autoCapitalize='none' onChangeText={(value) => setEmail(value)} />
                    <TextInput style={style.input} placeholder='Senha' autoCapitalize='none' secureTextEntry onChangeText={(value) => setPassword(value)} />
                    <TextInput style={style.input} placeholder='Confirme a senha' autoCapitalize='none' secureTextEntry onChangeText={(value) => setPasswordConfirm(value)} />

                    <TouchableOpacity style={style.containerButton} onPress={Register}>
                        <Text style={style.textButton}>Registrar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.containerBack} onPress={back}>
                    <Entypo name="reply-all" size={20} style={{ color: '#FFF' }} />
                    <Text style={style.textBack}>Já possuo uma conta</Text>
                </TouchableOpacity>
            </ScrollView>

            {!isEmaiIncorrect ? null :
                <Animatable.View animation="fadeInLeft" duration={500} style={style.emailInvalid}>

                    <Text style={style.textMsg}>O e-mail informado é invalido</Text>
                </Animatable.View>
            }

            {!isPassIncorrect ? null :
                <Animatable.View animation="fadeInLeft" duration={500} style={style.passInvalid}>

                    <Text style={style.textMsg}>As senhas não coincidem</Text>
                </Animatable.View>
            }

            {!isFieldEmpty ? null :
                <Animatable.View animation="fadeInLeft" duration={500} style={style.fieldEmpty}>

                    <Text style={style.textMsg}>Preencha todos os campos</Text>
                </Animatable.View>
            }

            {!isPassLower ? null :
                <Animatable.View animation="fadeInLeft" duration={500} style={style.fieldEmpty}>

                    <Text style={style.textMsg}>A senha deve conter no minimo 6 caracteres</Text>
                </Animatable.View>
            }
        </View>
    );
}