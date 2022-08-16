import React, { useState }  from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Evaluation() {
    const [starOne, setStarOne] = useState(false);
    const [starTwo, setStarTwo] = useState(false);
    const [starTree, setStarTree] = useState(false);
    const [starFour, setStarFour] = useState(false);
    const [starFive, setStarFive] = useState(false);
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

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.text_header}>Sua avaliação é muito importante para nós!</Text>
                <View style={styles.container_input}>
                    <View style={styles.container_star_bottons}>
                        <TouchableOpacity onPress={() => SetStar(1)}>
                            <AntDesign name='star' size={30} style={{ margin: 5, color: starOne ? '#FFD700' : 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetStar(2)}>
                            <AntDesign name='star' size={30} style={{ margin: 5, color: starTwo ? '#FFD700' : 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetStar(3)}>
                            <AntDesign name='star' size={30} style={{ margin: 5, color: starTree ? '#FFD700' : 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetStar(4)}>
                            <AntDesign name='star' size={30} style={{ margin: 5, color: starFour ? '#FFD700' : 'black' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetStar(5)}>
                            <AntDesign name='star' size={30} style={{ margin: 5, color: starFive ? '#FFD700' : 'black' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container_input_title}>
                        <Text style={styles.title_input}>Conte-nos o que achou:</Text>
                    </View>
                    <TextInput style={styles.input} multiline={true} />
                    <View style={styles.container_button_send}>
                        <TouchableOpacity style={styles.button_send}>
                            <Text style={styles.text_button_send}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}