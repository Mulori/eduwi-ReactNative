import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    container_list:{
        width: '100%',
        height: '80%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 120,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    list:{       
        width: '95%',
        height: '100%',
    },
    container_item:{
        padding: 10,
    },
    item: {
        flexDirection: 'row',
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    container_image:{
        padding: 2,
        backgroundColor: '#ff00ff',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#00ffff',
    },
    name:{
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    number: {
        color: '#FFF',
        top: 0,
        marginRight: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    container_user:{
        width: '55%',
    },
    score: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#01feff'
    },
    container_score:{
        flexDirection: 'row',
    },
    star: {
        marginLeft: 5,
        color: '#01feff',
    },
    trophy:{
        color: '#efb810',
    },
    recommend:{
        color: '#efb810',
    },
})

export default styles;