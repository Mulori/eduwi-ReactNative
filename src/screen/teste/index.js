import { Axios } from 'axios';
import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';


export default function testee({ navigation }) {
    const [image, setImage] = useState(null);
    const [imageView, setImageView] = useState(null);

    const imagePickerOptions = {
        title: 'Selecione uma imagem',
    }

    function imagePickerCall(data){
        console.log(data);

        if(data.didCancel){
            console.log(data);
            return;
        }        
        if(data.assets[0].error){
            console.log(data);
            return;
        }
        if(!data.assets[0].uri){
            console.log(data);
            return;
        }

        setImage(data);
    }

    function uploadImage(){
        const data = new FormData();
        console.log(1);

        data.append('image', {
            fileName: image.assets[0].fileName,
            uri: image.assets[0].uri,
            type: image.assets[0].type,
            fileSize: image.assets[0].fileSize,
            height: image.assets[0].height,
            width: image.assets[0].width
        })

        //await Axios.post('', data)

        RNFS.readFile(image.assets[0].uri, 'base64')
        .then(res =>{
            console.log(res);
            setImageView('data:image/png;base64,' + res);
        })
        .catch(cat => {
            console.log(cat);
        });

    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: image 
                    ? image.assets[0].uri 
                    : 'https://thewomensfilmfestival.org/wp-content/uploads/2018/11/placeholder.jpg' }} style={styles.image} />
                <TouchableOpacity style={styles.buttonSearchImage} onPress={() => {launchImageLibrary(imagePickerOptions, imagePickerCall)}}>
                    <Text style={styles.textButtonSearchImage}>Escolher Imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSearchImage} onPress={uploadImage}>
                    <Text style={styles.textButtonSearchImage}>Enviar Imagem</Text>
                </TouchableOpacity>            

                <Image style={{width: 200, height: 200}} source={{uri: imageView ? imageView : 'https://thewomensfilmfestival.org/wp-content/uploads/2018/11/placeholder.jpg'}}/>
            </ScrollView>            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSearchImage:{
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 10,
    },
    textButtonSearchImage:{
        color: '#FFF',
        fontWeight: 'bold',
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 1
    }
})