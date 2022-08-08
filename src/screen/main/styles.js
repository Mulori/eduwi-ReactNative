import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169E1',
        alignItems: 'center',
    },
    container_avaliable: {
        width: '100%',
        height: '5%',
        top: 20,
        alignItems: 'center',
    },
    container_star: {
        backgroundColor: '#4169e1',
        width: '80%',
        height: '80%',
        borderRadius: 25,
        alignItems: 'center',       
    },
    container_star_title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 23,
        color: '#FFF',
    },
    container_star_input:{
        borderRadius: 25,
        marginTop: 5,
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_star_bottons:{
        backgroundColor: '#4169E1',
        borderRadius: 25,
        marginTop: 5,
        width: '80%',
        height: '30%',
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