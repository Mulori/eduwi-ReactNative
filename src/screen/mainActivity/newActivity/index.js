import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet, StatusBar, SafeAreaView  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieQuestion from '../../../components/lotties/question';
import LottieWrite from '../../../components/lotties/write';
import LottieTrue from '../../../components/lotties/true';

export default function NewActivity({ navigation }) {
    const [info, setInfo] = useState(true);   
    function Info(){
        return(
            <View>
                <View style={style.container_info} >
                    <Text style={style.title}>Primeiros Passos</Text>
                    <Text style={style.subtitle}>Para construir uma nova atividade, selecione a categoria em que sua dinâmica se encaixa.
                    Para cada tipo, a atividade se comportará de uma forma. Assim que concluir a criação, sua atividade estará disponível 
                    para ser acessada. Caso tenha um publico restrito para a realização da dinâmica, informe uma senha para que sua atividade fique privada.
                    </Text>            
                </View>
                <View>
                    <TouchableOpacity style={style.buttonEntendi} onPress={() => setInfo(false)}>
                        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 18}}>Entendi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#4169E1' />       
            <ImageBackground
                source={require('../../../assets/image/imageBackgroundMain.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />     
            {info? 
                <Animatable.View animation='bounceInDown' duration={2000} style={style.content}>
                    <Info />
                </Animatable.View>
            : 
                <View style={style.view}>
                    <View style={{ alignItems: 'center', marginTop: '20%'}}>
                    <Animatable.View animation="pulse"  style={{ padding: 12, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000000'}}>Selecione o Tipo</Text>               
                    </Animatable.View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('NewActivityName', { types: 1 })} style={{
                            backgroundColor: '#008000',
                            padding: 15,
                            margin: 10,
                            width: '30%',
                            alignItems: 'center',
                            borderRadius: 20,
                            height: 160,
                        }}>
                            <LottieQuestion />
                            <Text style={{ position: 'absolute', fontWeight: 'bold', color: '#FFF', bottom: 35,}}>Questões</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('NewActivityName', { types: 2 })} style={{
                            backgroundColor: '#D2691E',
                            padding: 15,
                            margin: 10,
                            width: '30%',
                            alignItems: 'center',
                            borderRadius: 20,
                            height: 160,
                        }}>
                            <LottieWrite />
                            <Text style={{position: 'absolute', fontWeight: 'bold', color: '#FFF', bottom: 20, textAlign: 'center'}}>Complete a Frase</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('NewActivityName', { types: 3 })} style={{
                            backgroundColor: '#4169E1',
                            padding: 15,
                            margin: 10,
                            width: '30%',
                            alignItems: 'center',
                            borderRadius: 20,
                            height: 160,
                        }}>
                            <LottieTrue />
                            <Text style={{fontWeight: 'bold', color: '#FFF', textAlign: 'center'}}>Verdadeiro ou Falso</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            }       
        </SafeAreaView>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,        
    },
    content: {
        backgroundColor: '#4169E1',
        height: '50%',
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
    },
    view:{
        flex: 1,
    },
    title:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
    },
    container_info:{
        alignItems: 'center'
    },
    subtitle:{
        color: '#FFF',
        fontSize: 14,
        padding: 30
    },
    buttonEntendi:{
        backgroundColor: '#000080',
        alignItems: 'center',
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 25,
        marginTop: '1%'
    }
})
