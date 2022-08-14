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
    },
    title_input: {
        fontWeight: 'bold',
    }
})

export default styles;