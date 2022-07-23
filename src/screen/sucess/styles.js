import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 27,
    },
    lottie: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: '#4169E1',
    },
    container_avaliable: {
        width: '100%',
        height: '20%',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_star: {
        backgroundColor: '#FFF',
        width: '80%',
        height: '100%',
        borderRadius: 25,
        alignItems: 'center',
        top: 20,        
    },
    container_star_title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 23,
        color: '#708090',
    },
    container_star_bottons:{
        backgroundColor: '#4169E1',
        borderRadius: 25,
        width: '80%',
        height: '35%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_close: {
        position: 'absolute',
        backgroundColor: '#FFF',
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#004F9C',
        right: -13,
        top: -15,
        padding: 3,
    },
    icon_close: {
        color: '#004F9C',
    },
    button_send: {
        padding: 5,
        right: 30,
        position: 'absolute',
        bottom: 5,
        flexDirection: 'row',
    },
    button_send_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#708090',
    },
    icon_send: {
        color: '#708090',
        bottom: -2,
    }
})

export default styles;