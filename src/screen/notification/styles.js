import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    container:{
        flex: 1,
    },
    list_notification: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        top: 5,
    },
    name: {
        fontWeight: 'bold',
        left: 10,
    },
    context: {
        width: '100%'
    },
    text: {
        width: '75%',
        left: 10,
    },
    container_header: {
        flexDirection: 'row'
    },
    more:{
        left: 10,
        fontWeight: 'bold'
    },
    date: {
        position: 'absolute',
        right: 80
    }
})

export default styles;