import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StatusBar, ImageBackground, Alert, ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import styles from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from '../../../services/mainService/mainService'
import VG from "../../../components/variables/VG";
import { Picker } from '@react-native-picker/picker';

export default function NewEduvida({ navigation }) {
    const [tipos, setTipos] = useState(['Artes', 'Ciências', 'Conhecimentos Gerais', 'Culturas', 'Engenharias', 'Exatas', 'Física', 'História', 'Humanas', 'Linguística', 'Meio Ambiente', 'Química', 'Tecnologia', 'Outro(s)']);
    const [tipoSelecionado, setTipoSelecionado] = useState('Artes');
    const [text, setText] = useState(null);

    async function Post() {
        if(!text){
            Alert.alert('Aviso', 'Para compartilhar uma dúvida é necessário informa-la.')
            return;
        }

        let json = {
            title: text.substring(0, 35),
            help_text: text.trim(),
            help_type: tipoSelecionado,
            image_reference: "",
            image_url: "",
            image_type: "",
            image_size_wh: ""
        }

        await Axios.Post('/eduvida', VG.user_uid, json)
            .then((value) => {
                Alert.alert('Sucesso', 'Sua dúvida foi compartilhada!');
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Main' },
                    ],
                })
            }).catch((error) => {
                Alert.alert('Error', error)
                console.log(error)
            })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : "padding"}
            style={styles.container}>
            <StatusBar backgroundColor='#9400D3' barStyle='light-content' />
            <View style={styles.container_content}>
                <Text style={styles.title}>Conte-nos sua dúvida:</Text>
                <TextInput 
                style={styles.text_input} 
                placeholderTextColor={'#000'} 
                multiline={true} 
                maxLength={500} 
                placeholder='Digite aqui...'
                onChangeText={(value) => setText(value)}
                />
                <Text style={styles.title}>Área:</Text>
                <Picker
                    selectedValue={tipoSelecionado}
                    style={styles.text_input}
                    onValueChange={(itemValue) => setTipoSelecionado(itemValue)}>
                    {
                        tipos.map(cr => {
                            return <Picker.Item label={cr} value={cr} style={{ color: 'black', }} />
                        })
                    }
                </Picker>
                <TouchableOpacity style={styles.button_send} onPress={Post}>
                    <Text style={styles.button_send_text}>Compartilhar</Text>
                </TouchableOpacity>
            </View>            
        </KeyboardAvoidingView>
    )
}