import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StatusBar, SafeAreaView, ImageBackground, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

export default function NewActivityName({ navigation, route }) {
    const { types } = route.params;
    const [title, setTitle] = useState(null);

    function next(){
        if(!title){
            Alert.alert('Eii', 'Você não informou o titulo da atividade.');
            return;
        }

        navigation.navigate('NewActivityImage', { types: types, title: title })
    }

    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#008000' />
            <ImageBackground source={require('../../../../assets/image/new_activity.png')} style={styles.backgroundImage} />
                <View style={styles.container_input}>
                    <Text style={styles.title}>Titulo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setTitle(value)}
                    />
                </View>
                <View style={styles.container_button_next}>
                    <TouchableOpacity 
                    onPress={next}
                    style={styles.button_next}>
                        <Text style={styles.button_next_text}>Próximo</Text>
                    </TouchableOpacity>
                </View>


        </KeyboardAvoidingView>
    )
}
