import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#008000',
    },
    container_title: {
        fontWeight: 'bold',
        color: 'white'
    },
    button_next: {        
        padding: 15,
        backgroundColor: '#6ec846',
        borderRadius: 25,
    },
    button_next_text:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,        
    },
    container_button_next: {
        position: 'relative',
        top: '48%',
        width: '100%',
        alignItems: 'center',
    },
    container_input: {
        position: 'relative',
        top: '30%',
        width: '100%',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        color:'#FFF',
        fontWeight: 'bold',
        fontSize: 25
    },
    picker: {
        backgroundColor: '#FFF',
        borderColor: '#474ebb',
        width: '80%',
        color: '#000000',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFF',
        borderColor: '#474ebb',
        width: '80%',
        color: '#000000', 
        padding: 15,
        fontWeight: 'bold',
    }
})

export default styles;