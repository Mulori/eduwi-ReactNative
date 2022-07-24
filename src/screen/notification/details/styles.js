import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    container:{
        flex: 1,
    },
    image_user: {
        width: 80,
        height: 80,
        borderRadius: 50,
        top: 15,
        left: 15,
    },
    name: {
        fontWeight: 'bold',
        left: 20,
        top: 15,
        fontSize: 20,
    },
    header: {
        flexDirection: 'row',
        height: 50
    },
    date: {
        top: 20,
        left: 20,
    },
    image_body: {
        width: '100%',
        height: '100%', 
    },
    container_body: {
        width: '100%', 
        height: '40%', 
        top: 55,
    },
    text: {
        top: 15,
        left: 10,
    },
})

export default styles;