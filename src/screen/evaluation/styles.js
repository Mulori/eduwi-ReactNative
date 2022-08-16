import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_header: {
        alignItems: 'center',
        top: 25,
    },
    container_input:{
        width: '100%',
        top: 30,
        alignItems: 'center'
    },
    container_input_title: {
        alignItems: 'flex-start',
        width: '90%',
    },
    text_header: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        height: 250,
        width: '90%',
        textAlignVertical: 'top',
        padding: 5,
    },
    title_input: {
        fontWeight: 'bold',        
    },
    container_star_bottons:{
        borderRadius: 25,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    container_button_send: {
        top: 20,
        width: '100%',
        alignItems: 'center',
    },
    button_send: {
        backgroundColor: '#FFD700',
        padding: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
    },
    text_button_send: {
        fontWeight: 'bold',
    }
})

export default styles;