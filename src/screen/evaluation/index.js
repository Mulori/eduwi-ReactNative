import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

export default function Evaluation() {
    return (
        <View style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.text_header}>Sua avaliação é muito importante para nós!</Text>
                <View style={styles.container_input}>
                    <View style={styles.container_input_title}>
                        <Text style={styles.title_input}>Diga o que achou:</Text>
                    </View>
                    <TextInput style={styles.input} multiline={true} />
                </View>
            </View>
        </View>
    )
}