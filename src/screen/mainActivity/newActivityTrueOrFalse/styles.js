import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    button_add_card: {
        position: 'absolute',
        bottom: 25,
        right: 15,
        borderRadius: 50,
    },
    button_text_add_card: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    container_buttons: {
        alignItems: 'center',
    },
    button_send: {
        marginTop: 10,       
        alignItems: 'center',
        width: '90%',
        padding: 15,
        backgroundColor: '#32CD32',
        borderRadius: 15,
    },
    icon:{
        color: '#0000CD',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 15,
    },    
})

export default styles;