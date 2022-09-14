import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_load: {
        flex: 1,
        justifyContent: "center"
    },
    list_item: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    list: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        color: '#1C1C1C',
        fontWeight: 'bold',
        left: 10,
        fontSize: 19,
    },
    info:{
        color: '#9400D3',
        fontSize: 13,
        fontWeight: 'bold',
        left: 10,
    },
    logo: {
        height: 40,
        width: 40,
        borderRadius: 25,
        top: 2
    },
    container_content: {
        flexDirection: 'row',
        width: '100%'
    },
    container_content_two: {
        flexDirection: 'row',
        width: '100%',
    },
    materialcommunityicons: {
        color: '#9400D3',
        left: 10,
        top: 2
    },
    button_plus: {
        backgroundColor: '#9400D3',
        position: 'absolute',
        bottom: 35,
        right: 20,
        padding: 5,
        borderRadius: 50,
    },
    button_plus_icon:{
        color: '#FFF',
    },
    button_search_icon:{
        color: '#FFF',
    },
    button_search: {
        backgroundColor: '#9400D3',
        position: 'absolute',
        bottom: 105,
        right: 20,
        padding: 5,
        borderRadius: 50,
    },
    container_modal_search:{
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    container_modal_seach_form:{
        width: '90%',
        height: 180,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },
    text_title:{
        fontWeight: 'bold',
        fontSize: 16,
        top: 10,
    },
    input_search:{
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        width: '90%',
        height: 50,
        top: 25,
    },
    input_button_search:{
        top: 50,
        backgroundColor: '#696969',
        padding: 15,
        borderRadius: 15,
        width: '50%',
        alignItems: 'center',
    },
    input_button_search_text: {
        color: '#FFF',
        fontWeight: 'bold',
    }
})

export default styles;