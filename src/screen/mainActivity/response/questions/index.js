import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';


export default function responseQuestion({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listQuestion, setListQuestions] = useState([]);

    useEffect(() => {

        setModalVisible(true);

        APIActivity.Get('/activity/' + data.id + '/response', VG.user_uid)
        .then((questions) => {
            setListQuestions(questions.data);
            setModalVisible(false);
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
            setModalVisible(false);
        })
        
    }, [])

    function renderSlides({ item }){
        return(
            <View style={{ flex: 1, }}>
                <View style={{width: '90%'}}>
                    <Text style={style.number_question}>Questão: {item.number_question}</Text>
                </View>                
                <ScrollView>
                    <View style={{ alignItems: 'center'}}>
                        <TouchableOpacity style={style.button_one}>
                            <Text style={style.text_response}>
                                {item.answer_one}
                            </Text>                     
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button_two}>
                            <Text style={style.text_response}>
                                {item.answer_two}
                            </Text>                    
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button_tree}>
                            <Text style={style.text_response}>
                                {item.answer_tree}
                            </Text>                     
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button_four}>
                            <Text style={style.text_response}>
                                {item.answer_four}
                            </Text>                    
                        </TouchableOpacity>
                    </View>
                </ScrollView>  
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
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />                                                    
                </View>     
            </Modal>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerLoad: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    button_one: {
        width: '90%',
        padding: 10,
        backgroundColor: 'red',
        margin: 5,
        borderRadius: 12,
    },
    button_two: {
        width: '90%',
        padding: 10,
        backgroundColor: 'blue',
        margin: 5,
        borderRadius: 12,
    },
    button_tree: {
        width: '90%',
        padding: 10,
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 12,
    },
    button_four: {
        width: '90%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 5,
        borderRadius: 12,
    },
    text_response: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    number_question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        fontSize: 15,
    },
})