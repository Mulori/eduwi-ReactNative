import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, StatusBar, Modal, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import VG from '../../../components/variables/VG';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import activityServices from '../../../services/activityService/activityService';

export default function MyResponseActivity({ navigation }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function GetActvity() {
        setIsLoading(true);
        activityServices.Get("/activity/user/finished", VG.user_uid)
            .then((response) => {
                setData(response.data);
                console.log(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }

    function ConvertNameActivity(value) {
        switch (value) {
            case "questions":
                return "Questões";
            case "sentences":
                return "Complete a Frase";
            case "truefalse":
                return "Verdadeiro ou Falso";
        }
    }

    useEffect(() => {
        GetActvity()
    }, [])

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        console.log(date)

        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth()),
            date.getFullYear(),
        ].join('/');
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#FFA500' />
            <ScrollView>
                {!data ? null :
                    data.map((item, key) =>
                        <TouchableOpacity key={key} onPress={() => {
                            if (item.type_activity == 'questions') {
                                navigation.navigate('ResponseQuestionUser', { data: item });
                            }
                            else if (item.type_activity == 'sentences') {
                                navigation.navigate('ResponseSentenceUser', { data: item });
                            }
                        }}>
                            <View style={{ backgroundColor: '#FFF', padding: 10, width: '100%', marginTop: 5 }}>
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', borderColor: '#000', fontStyle: 'italic' }}>{item.title}</Text>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ color: '#000', fontSize: 13, borderColor: '#000', fontStyle: 'italic' }}>Membros: {item.number_members}</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        <Text style={{ color: '#000', fontSize: 13, borderColor: '#000', fontStyle: 'italic' }}>{formatDate(new Date(item.replied_in.substring(0, 4), item.replied_in.substring(5, 7), item.replied_in.substring(8, 10)))}</Text>
                                    </View>
                                </View>

                                <Text style={{ color: '#000', fontSize: 13, borderColor: '#000', fontStyle: 'italic' }}>Tipo: {ConvertNameActivity(item.type_activity)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
            </ScrollView>
            <Modal style={style.modalLoading} visible={isLoading}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="#FFA500" />
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
    containerHead: {
        backgroundColor: '#FFF',
        height: '5%',
        flexDirection: 'row'
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
    titleHead: {
        color: '#000',
        marginLeft: '5%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconHead: {
        marginLeft: '3%'
    }
})