import { StyleSheet } from 'react-native';


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
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
    button_two: {
        width: '90%',
        padding: 10,
        backgroundColor: 'blue',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_tree: {
        width: '90%',
        padding: 10,
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_four: {
        width: '90%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    text_response: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    number_question: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18,
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '3%',
        fontSize: 18,
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
    containerImage: {
        borderRadius: 20,
        width: '15%',
        alignItems: 'flex-start',
    },
    containerValue: {
        alignItems: 'center',
    }, 
    image:{
        width: 250,
        height: 350,
        marginTop: 25,
        borderRadius: 25,
    },
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
    container_image: {
        width: '100%',
        alignItems: 'center',
    },
    icon_check: {
        color: '#FFF'
    },
    container_button_truefalse:{
        flexDirection: 'row', 
        width: '95%',  
        marginTop: 15,
    },
    container_modal_help: {
        width: '100%',
        height: '10%',
    }
})

export default style;