import React, {useState} from "react";
import { Image, TouchableOpacity, View, StatusBar } from "react-native"; 
import styles from "./styles";

export default function viewerImage({ navigation, route }) {    
    const { data, imageDecode } = route.params;
    console.log(data.avatar_format)

    const w = data.avatar_format.split('|')[1]
    const h = data.avatar_format.split('|')[2]

    console.log(w)
    console.log(h)

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#000' barStyle='light-content' />
            {
                !h ? null : 
                <Image source={{uri: imageDecode}} resizeMode='contain' style={{ height: '100%', width: '100%'}}/>
            }            
        </View>
    )
}