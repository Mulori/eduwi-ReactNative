import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        top: 10,
        flexDirection: 'row',
    },
    header_comments: {
        width: '100%',
        top: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    logo: {
        height: 40,
        width: 40,
        left: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 5,
    },
    container_name: {
        padding: 3,
        backgroundColor: '#9400D3',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        flexDirection: 'row',
    },
    container_name_two: {
        padding: 3,
        backgroundColor: 'green',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        flexDirection: 'row',
    },
    conteiner_comment: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 5,
        height: '100%',
        width: '82%',
        backgroundColor: '#FFF',
        borderRadius: 15,
    },
    text_name: {
        color: '#FFF',
        left: 5,
    },
    text_date: {
        position: 'absolute',
        color: '#FFF',
        right: 10,
    },
    container_text: {
        padding: 10,
    },
    comment: {
        position: 'absolute',
        bottom: 25,
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        padding: 8,
    },
    text_input_comment: {
        width: '87%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 8,
        fontSize: 15,
    },
    button_send: {
        backgroundColor: '#9400D3',
        padding: 10,
        borderRadius: 50,
        right: 10,
        top: 10,
        position: 'absolute'
    },
    icon_send: {
        color: '#FFF'
    }
})

export default styles;