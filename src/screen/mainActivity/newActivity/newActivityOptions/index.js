import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StatusBar, ActivityIndicator, ImageBackground, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../../components/variables/VG';

export default function NewActivityOptions({ navigation, route }) {
    const { types, title, image } = route.params;
    const [tipos, setTipos] = useState(['Iniciante', 'Exigente', 'Extremo']);
    const [tipoSelecionado, setTipoSelecionado] = useState('Fácil');
    const [password, setPassword] = useState(null);
    const [itens, setItens] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    function DeleteActivityTemp() {
        firestore()
            .collection('user_activity_build_' + VG.user_uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    firestore().collection('user_activity_build_' + VG.user_uid).doc(documentSnapshot.id).delete().then((ok) => { }).catch((error) => { });
                });

                if (types == 1) {
                    setIsLoading(false);
                    navigation.navigate('newActivityQuestions', { itens: itens, title: title, pass: password, type: types, objImage: image, tipoSelecionado: tipoSelecionado })
                } else if (types == 2) {
                    setIsLoading(false);
                    navigation.navigate('newActivitySentence', { itens: itens, title: title, pass: password, type: types, objImage: image, tipoSelecionado: tipoSelecionado })
                }
            })
            .catch(() => {
                setIsLoading(false);
                Alert.alert('Erro', 'Ocorreu um erro realizar a limpeza de atividades temporarias.');
            });
    }

    function next() {
        if (!itens) {
            Alert.alert('Eii', 'Informe a quantidade de ' + types == 1 ? 'questões' : 'frases' + '.');
            return;
        }
        else {
            if (itens < 1) {
                Alert.alert('Eii', 'Informe a quantidade de ' + types == 1 ? 'questões' : 'frases' + ' não pode ser menor que 1.');
                return;
            }
        }

        setIsLoading(true);
        DeleteActivityTemp();
    }

    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#008000' />
            <ImageBackground source={require('../../../../assets/image/new_activity.png')} style={styles.backgroundImage} />
            <View style={styles.container_input}>
                <Text style={styles.title}>Nivel de dificuldade:</Text>
                <Picker
                    selectedValue={tipoSelecionado}
                    style={styles.picker}
                    onValueChange={(itemValue) => setTipoSelecionado(itemValue)}>
                    {
                        tipos.map(cr => {
                            return <Picker.Item label={cr} value={cr} style={{ color: 'black', }} />
                        })
                    }
                </Picker>
                <Text style={styles.title}>Senha: (opcional)</Text>
                <TextInput style={styles.input} autoCapitalize='none' secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
                <Text style={styles.title}>Quantidade de {types == 1 ? 'questões' : 'frases'}:</Text>
                <TextInput style={styles.input} autoCapitalize='none' keyboardType='numeric' onChangeText={(value) => setItens(value)} />
            </View>
            <View style={styles.container_button_next}>
                <TouchableOpacity
                    onPress={next}
                    style={styles.button_next}>
                    { isLoading ? <ActivityIndicator size='large' color='#FFF' /> : <Text style={styles.button_next_text}>Próximo</Text> }
                </TouchableOpacity>
            </View>


        </KeyboardAvoidingView>
    )
}
