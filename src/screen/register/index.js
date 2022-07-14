import React, { useState } from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, StyleSheet, TextInput, Alert, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieRegister from '../../components/lotties/register';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import userServices from '../../services/userService/userService';
import style from './styles.js'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

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
    const [viewAvatar, setViewAvatar] = useState(false);
    const [image, setImage] = useState(null);
    const [isImageNull, setIsImageNull] = useState(false);

    const validator = require('validator');

    function Register() {
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

        if (!image) {
            setIsImageNull(true);
            return;
        } else {
            setIsImageNull(false);
        }

        

        auth()
            .createUserWithEmailAndPassword(email_clean, password_clean)
            .then((ok) => {
                RNFS.readFile(image.assets[0].uri, 'base64')
                .then(res =>{
                    let data = {
                        firebase_uid: ok.user.uid,
                        email: ok.user.email,
                        name: name_clean,
                        last_name: last_name_clean,
                        avatar: res,
                        avatar_format: image.assets[0].type + '|' + image.assets[0].width + '|' + image.assets[0].height
                    }
    
                    userServices.userCreate(data)
                    .then((response) => {
                        navigation.pop();
                        Alert.alert('Sucesso', 'Conta criada com sucesso!', [{ text: 'Ok', style: 'destructive', }]);
    
                    })
                    .catch((error) => {
                        console.log(error);
                        Alert.alert('Erro', 'Ocorreu um problema ao criar a conta', [{ text: 'Ok', style: 'destructive', }]);
                    })
                })
                .catch(cat => {
                    console.log(cat);
                });
                
            })
            .catch((erro) => {
                Alert.alert("Erro", erro);
            })
    }

    function back() {
        navigation.pop();
    }

    function imagePickerCallback(data) {
        if (data.didCancel) {
            console.log(data);
            return;
        }
        if (data.assets[0].error) {
            console.log(data);
            return;
        }
        if (!data.assets[0].uri) {
            console.log(data);
            return;
        }

        setImage(data);
        setViewAvatar(false)
    }

    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#d2583a' barStyle='light-content' />
            <ScrollView>
                <Animatable.Text animation="fadeInLeft" duration={500} style={style.title}>Cadastre-se</Animatable.Text>
                <View style={style.containerForm}>
                    <TextInput style={style.inputHead} placeholder='Nome' onChangeText={(value) => setName(value)} />
                    <TextInput style={style.input} placeholder='Sobrenome' onChangeText={(value) => setLastName(value)} />
                    <TextInput style={style.input} placeholder='Email' autoCapitalize='none' onChangeText={(value) => setEmail(value)} />
                    <TextInput style={style.input} placeholder='Senha' autoCapitalize='none' secureTextEntry onChangeText={(value) => setPassword(value)} />
                    <TextInput style={style.input} placeholder='Confirme a senha' autoCapitalize='none' secureTextEntry onChangeText={(value) => setPasswordConfirm(value)} />

                    <TouchableOpacity style={style.button_search_image} onPress={() => setViewAvatar(true)}>
                        <Image source={image ? { uri: image.assets[0].uri } : require('../../assets/image/avatarMissing.png')} style={style.avatar} />
                        <Text style={style.text_button_search_image}>Escolher Foto</Text>
                    </TouchableOpacity>

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

            {!isImageNull ? null :
                <Animatable.View animation="fadeInLeft" duration={500} style={style.fieldEmpty}>

                    <Text style={style.textMsg}>Insira uma imagem de perfil</Text>
                </Animatable.View>
            }

            {!viewAvatar ? null :
                <Animatable.View animation='bounceInUp' duration={2000} style={style.container_avatar}>
                    <View style={style.container_buttons_media}>
                        <TouchableOpacity style={style.button_media_library} onPress={() => { launchImageLibrary({}, imagePickerCallback) }}>
                            <MaterialCommunityIcons name='folder-multiple-image' size={20} style={style.icon_galery} />
                            <Text style={style.text_button_media_library}>Galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button_media_camera} onPress={() => { launchCamera({}, imagePickerCallback) }}>
                            <FontAwesome name='camera' size={20} style={style.icon_camera} />
                            <Text style={style.text_button_media_camera}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={style.button_close_view_avatar} onPress={() => setViewAvatar(false)}>
                        <Text style={style.text_button_close_view_avatar}>Fechar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            }
        </View>
    );
}