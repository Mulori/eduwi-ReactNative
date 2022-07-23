import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from './styles';
import MainServices from '../../services/mainService/mainService'
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import VG from '../../components/variables/VG';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';

export default function Sucess({ navigation, route }) {
    const { title, avaliable, activity_id } = route.params;
    const [starOne, setStarOne] = useState(false);
    const [starTwo, setStarTwo] = useState(false);
    const [starTree, setStarTree] = useState(false);
    const [starFour, setStarFour] = useState(false);
    const [starFive, setStarFive] = useState(false);
    const [viewAvaliable, setViewAvaliable] = useState(avaliable);
    const [evaluatd, setEvaluated] = useState(null);

    function SetStar(value) {

        setEvaluated(value);

        switch (value) {
            case 1:
                setStarOne(true);
                setStarTwo(false);
                setStarTree(false);
                setStarFour(false);
                setStarFive(false);
                break;
            case 2:
                setStarOne(true);
                setStarTwo(true);
                setStarTree(false);
                setStarFour(false);
                setStarFive(false);
                break;
            case 3:
                setStarOne(true);
                setStarTwo(true);
                setStarTree(true);
                setStarFour(false);
                setStarFive(false);
                break;
            case 4:
                setStarOne(true);
                setStarTwo(true);
                setStarTree(true);
                setStarFour(true);
                setStarFive(false);
                break;
            case 5:
                setStarOne(true);
                setStarTwo(true);
                setStarTree(true);
                setStarFour(true);
                setStarFive(true);
                break;
        }
    }

    function SendEvaluated() {
        if (!evaluatd) {
            Alert.alert('Atenção', 'Informe sua experiência.')
            return;
        }

        MainServices.Put('/activity/' + activity_id + '/evaluated', VG.user_uid, { star: evaluatd })
            .then((value) => {
                setViewAvaliable(false);
            })
            .catch((error) => {
                Alert.alert('Erro', 'Ocorreu um erro ao enviar sua experiência. Tente novamente.')
                return;
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#4169E1' />
            <View style={styles.container_components}>
                <Text style={styles.title}>{title}</Text>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    source={require('../../assets/lottie/sucess.json')}
                    loop
                    autoSize
                    resizeMode="cover"
                />
            </View>
            {
                !viewAvaliable ? null :
                    <View style={styles.container_avaliable}>
                        <Animatable.View animation='bounceIn' duration={3000} style={styles.container_star}>
                            <TouchableOpacity style={styles.container_close}>
                                <FontAwesome style={styles.icon_close} name='close' size={22} />
                            </TouchableOpacity>
                            <Text style={styles.container_star_title}>Avalie sua experiência com está atividade.</Text>
                            <View style={styles.container_star_bottons}>
                                <TouchableOpacity onPress={() => SetStar(1)}>
                                    <AntDesign name='star' size={30} style={{ margin: 5, color: starOne ? 'yellow' : 'black' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetStar(2)}>
                                    <AntDesign name='star' size={30} style={{ margin: 5, color: starTwo ? 'yellow' : 'black' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetStar(3)}>
                                    <AntDesign name='star' size={30} style={{ margin: 5, color: starTree ? 'yellow' : 'black' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetStar(4)}>
                                    <AntDesign name='star' size={30} style={{ margin: 5, color: starFour ? 'yellow' : 'black' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => SetStar(5)}>
                                    <AntDesign name='star' size={30} style={{ margin: 5, color: starFive ? 'yellow' : 'black' }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.button_send} onPress={SendEvaluated}>
                                <Text style={styles.button_send_text}>Enviar</Text>
                                <Feather name='send' size={23} style={styles.icon_send} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
            }
        </View>
    )
}