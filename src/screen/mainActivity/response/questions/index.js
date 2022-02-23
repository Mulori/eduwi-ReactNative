import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';


export default function responseQuestion({ navigation, route }) {
    const { data } = route.params;
    const [listQuestion, setListQuestions] = useState([]);

    useEffect(() => {
        APIActivity.Get('/activity/' + data.id + '/response', VG.user_uid)
        .then((questions) => {
            setListQuestions(questions.data);
            console.log(questions.data);
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
        })
        
    }, [])

    function renderSlides({ item }){
        return(
            <View style={{ flex: 1}}>
                <Text>Opção 1: {item.answer_one}</Text>
                <Text>Opção 2: {item.answer_two}</Text>
                <Text>Opção 3: {item.answer_tree}</Text>
                <Text>Opção 4: {item.answer_four}</Text>
            </View>
        )
    }

    return(
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />         
            <AppIntroSlider 
            renderItem={renderSlides}
            data={listQuestion}
            activeDotStyle={{
                backgroundColor: '#009CFF',
                width: 30
            }}
            />
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})