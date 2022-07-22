import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, StatusBar, ActivityIndicator, ImageBackground, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';

export default function NewActivityImage({ navigation, route }) {
    const { types, title } = route.params;
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function imagePickerCallback(data) {
        setIsLoading(true);

        if (data.didCancel) {
            console.log(data_);
            setIsLoading(false);
            return;
        }
        if (data.assets[0].error) {
            console.log(data);
            setIsLoading(false);
            return;
        }
        if (!data.assets[0].uri) {
            console.log(data);
            setIsLoading(false);
            return;
        }

        setImage(data)
        setIsLoading(false);
    }

    function next() {
        if (!image) {
            Alert.alert('Eii', 'Você não selecionou a imagem da atividade.');
            return;
        }

        navigation.navigate('NewActivityOptions', { types: types, title: title, image: image })
    }

    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#008000' />
            <ImageBackground source={require('../../../../assets/image/new_activity.png')} style={styles.backgroundImage} />
            <TouchableOpacity
                onPress={() => { launchImageLibrary({}, imagePickerCallback) }}
                style={styles.container_input}>
                <Text style={styles.title}>Imagem:</Text>
                <Image source={!image ? require('../../../../assets/image/imageNotFound.png') : { uri: image.assets[0].uri }} style={styles.image} />
                {!isLoading ? null : <ActivityIndicator size='large' color='green' style={styles.loading_image} />}
            </TouchableOpacity>
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
