import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, CheckBox, FlatList, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

export default function teste({ navigation }) {
    const [palavra, setPalavra] = useState('');
    const [palavra_escolhida, setPalavra_escolhida] = useState(null);
    const [palavra_separada, setPalavra_separada] = useState(null);
    const [palavra_espaco, setPalavra_espaco] = useState(null);
    var ocultadas = [];
    var obj_ocultado = {}

    const GeraPalavra = () => {
        setPalavra_separada(palavra.split('??'));
        setPalavra_espaco(palavra.split(' '));
    }   

    const oculta_palavra = (palav) => {
        console.log(palav)
        obj_ocultado.palavra = palav;
        ocultadas.push({...obj_ocultado});
        setPalavra(palavra.replace(palav, '??'))
        
        console.log(ocultadas)
    }

    return(
        <View style={styles.container}>
            <FlatList 
            data={palavra_espaco} 
            style={{ margin: '5%'}}
            keyExtractor={item => item.id} 
            numColumns={5} 
            renderItem={({ item }) => {
                return (
                    <Animatable.View animation='rubberBand' duration={2000}  key={item.id}>
                        {
                            ocultadas.includes(item) ? null :
                            <TouchableOpacity onPress={() => oculta_palavra(item)} style={{ backgroundColor: '#400e28', padding: 10, margin: 5, borderRadius: 10 }} >
                                <Text style={{ color: '#FFF'}}>
                                    {item}
                                </Text>
                            </TouchableOpacity>   
                        }                        
                    </Animatable.View>                    
                );
            }} />    
            { 
                !palavra_separada ? null :
                palavra_separada.map((item, index) =>
                    <View style={{ alignItems: 'center', width: '100%'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item}</Text>                  
                        {
                            index + 1 == palavra_separada.length ? null :
                            <TextInput style={{ backgroundColor: '#e7e4d5', width: '60%', borderRadius: 15, padding: 12, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}} />
                        }    
                    </View>                    
                )
            } 
            <View>
                <TextInput value={palavra} style={{ backgroundColor: '#e7e4d5' }} onChangeText={(e) => setPalavra(e)} onChange={GeraPalavra}/>
                <TouchableOpacity onPress={GeraPalavra} style={{ alignItems: 'center', backgroundColor: 'blue'}}>
                    <Text style={{ color: '#FFF', padding: 10}}>Gerar</Text>
                </TouchableOpacity>
            </View>                 
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})