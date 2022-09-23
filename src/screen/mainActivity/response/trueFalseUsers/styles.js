import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#582770'
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
        flexDirection: 'row'
    },
    text_response: {
        color: '#FFF',
    },
    number_question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        color: '#FFF',
        fontSize: 18,
        marginTop: 15,
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '5%',
        color: '#FFF',
        width: '90%',
        fontSize: 15,
    },
    buttonCircle: {
        width: 110,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image:{
        width: 250,
        height: 350,
        marginTop: 25,
        borderRadius: 25,
    },
    container_image: {
        width: '100%',
        alignItems: 'center',
    },
});

export default styles;