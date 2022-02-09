import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView } from 'react-native';


export default function newActivityQuestions({ navigation, route }) {
    const { itens } = route.params;
    var slide = [];
        
    for(let i = 0; i < itens; i++){    
        slide.push(
            <View key = {i + 1} style={{  height: 200, backgroundColor: '#FFF', padding: 5, margin: 10}}>
                <View style={{ width: '90%'}}>
                    <Text>Questão: {i + 1}</Text>
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>Pergunta:</Text>   
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={style.inputs} placeholder='Digite a questão desejada' onChangeText={(value) => setItens(value)}/> 
                    </View> 
                </View>
            </View>
        )
    }
    
    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#008000' /> 
            <ScrollView>
                { slide }
            </ScrollView>       
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008000',
    }, 
    inputs:{
        
    }
})