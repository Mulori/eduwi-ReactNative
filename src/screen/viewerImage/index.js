import React, {useState} from "react";
import { Image, TouchableOpacity, View, StatusBar } from "react-native"; 
import styles from "./styles";

export default function viewerImage({ navigation, route }) {    
    const { url } = route.params;

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#000' barStyle='light-content' />
            {
                !url ? null : 
                <Image source={{uri: url}} resizeMode='contain' style={{ height: '100%', width: '100%'}}/>
            }            
        </View>
    )
}