import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, CheckBox, FlatList, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';


export default function Teste2({ navigation, route }) {
    const { routes } = route.params;
    
    console.log(routes)

    return(
        <View style={styles.container}>
            { 
                !routes ? null :
                routes.map((item, index) =>
                    <View style={{ alignItems: 'center', width: '100%'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item}</Text>                  
                        {
                            index + 1 == routes.length ? null :
                            <TextInput style={{ backgroundColor: '#e7e4d5', width: '60%', borderRadius: 15, padding: 12, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}} />
                        }    
                    </View>                    
                )
            } 
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})