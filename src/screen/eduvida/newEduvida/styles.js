import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        alignItems: 'center',   
    },
    text_input: {
        width: '80%',
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 16,
        padding: 8,
    },  
    title: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 19
    },  
    container_content: {
        top: 70,
        width: '100%',
        alignItems: 'center',
    },
    button_send: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#9400D3',
        marginTop: 20,
        width: '80%',
        borderRadius: 15,
    },
    button_send_text: {
        color: '#FFF',
    }
})

export default styles;