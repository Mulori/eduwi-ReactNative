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
        backgroundColor: '#2b8f17',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    list: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        left: 10,
        fontSize: 17,
    },
    info:{
        color: '#FFF',
        left: 10,
    },
    logo: {
        height: 40,
        width: 40,
        borderRadius: 25,
    },
    container_content: {
        flexDirection: 'row',
    },
    container_content_two: {
        flexDirection: 'row',
        width: '100%'
    },
    materialcommunityicons: {
        color: '#FFF',
        left: 10,
        top: 2
    },
    button_plus: {
        backgroundColor: '#9400D3',
        position: 'absolute',
        bottom: 35,
        right: 20,
        padding: 15,
        borderRadius: 50,
    },
    button_plus_icon:{
        color: '#FFF',
    }
})

export default styles;