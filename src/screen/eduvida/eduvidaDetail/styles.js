import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        top: 10,
        flexDirection: 'row',
    },
    header_comments: {
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
        width: '82%',
        backgroundColor: '#FFF',
        borderRadius: 15,
    },
    conteiner_comment_you: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 5,
        width: '82%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        left: 15,
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
        bottom:  10,
        width: '100%',
        flexDirection: 'row',
        padding: 1,
    },
    text_input_comment: {
        width: '85%',
        backgroundColor: 'green',
        color: '#FFF',
        borderRadius: 15,
        padding: 8,
        fontSize: 15,
        left: 5,
        maxHeight: 120
    },
    button_send: {
        backgroundColor: '#9400D3',
        padding: 10,
        borderRadius: 50,
        right: 5,
        top: 5,
        position: 'absolute'
    },
    icon_send: {
        color: '#FFF'
    }
})

export default styles;