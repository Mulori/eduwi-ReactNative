import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StatusBar, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../../components/variables/VG';
import ModuleStorage from '../../../../services/storage';

export default function NewActivityOptions({ navigation, route }) {
    const { types, title, image } = route.params;
    const [tipos, setTipos] = useState(['Iniciante', 'Exigente', 'Extremo']);
    const [tipoSelecionado, setTipoSelecionado] = useState('Fácil');
    const [password, setPassword] = useState(null);
    const [itens, setItens] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    async function DeleteActivityTemp() {
        firestore()
            .collection('user_activity_build_' + VG.user_uid)
            .get()
            .then(async querySnapshot => {
                querySnapshot.forEach(async documentSnapshot => {
                    //await ModuleStorage.DeleteStorage(documentSnapshot._data.image_url);
                    firestore().collection('user_activity_build_' + VG.user_uid).doc(documentSnapshot.id).delete().then((ok) => { }).catch((error) => { });
                });

                if (types == 1) {
                    setIsLoading(false);
                    navigation.navigate('NewActivityQuestions', { itens: itens, title: title, pass: password, type: types, objImage: image, tipoSelecionado: tipoSelecionado })
                } else if (types == 2) {
                    setIsLoading(false);
                    navigation.navigate('NewActivitySentence', { itens: itens, title: title, pass: password, type: types, objImage: image, tipoSelecionado: tipoSelecionado })
                } else if (types == 3) {
                    setIsLoading(false);
                    navigation.navigate('NewActivityQuestionsTrueOrFalse', { itens: itens, title: title, pass: password, type: types, objImage: image, tipoSelecionado: tipoSelecionado })
                }
            })
            .catch(() => {
                setIsLoading(false);
                Alert.alert('Erro', 'Ocorreu um erro realizar a limpeza de atividades temporarias.');
            });
    }

    function next() {

        if (!itens) {
            switch (types) {
                case 1:
                    Alert.alert('Eii', 'Informe a quantidade de questões. O valor não pode ser menor que 1.');
                case 2:
                    Alert.alert('Eii', 'Informe a quantidade de frases. O valor não pode ser menor que 1.');
                case 3:
                    Alert.alert('Eii', 'Informe a quantidade de tópicos. O valor não pode ser menor que 1.');
            }
            return;
        }
        else {
            if (itens < 1) {
                switch (types) {
                    case 1:
                        Alert.alert('Eii', 'Informe a quantidade de questões. O valor não pode ser menor que 1.');
                    case 2:
                        Alert.alert('Eii', 'Informe a quantidade de frases. O valor não pode ser menor que 1.');
                    case 3:
                        Alert.alert('Eii', 'Informe a quantidade de tópicos. O valor não pode ser menor que 1.');
                }

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
             


                <Text style={styles.title}>Quantidade de {types == 1 ? 'questões' : types == 2 ? 'frases' : 'tópicos'}:</Text>
                <TextInput style={styles.input} autoCapitalize='none' keyboardType='numeric' onChangeText={(value) => setItens(value)} />
            </View>
            <View style={styles.container_button_next}>
                <TouchableOpacity
                    onPress={next}
                    style={styles.button_next}>
                    {isLoading ? <ActivityIndicator size='large' color='#FFF' /> : <Text style={styles.button_next_text}>Próximo</Text>}
                </TouchableOpacity>
            </View>


        </KeyboardAvoidingView>
    )
}
