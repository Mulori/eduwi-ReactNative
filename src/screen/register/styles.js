import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2583a',
    },
    inputHead:{
        backgroundColor: '#FFFFFF',
        width: '90%',      
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,     
    },
    input:{
        backgroundColor: '#FFFFFF',
        width: '90%',      
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,
        alignItems: 'center',
    },
    containerForm:{
        alignItems : 'center'
    },
    containerButton:{
        padding: 15,
        backgroundColor: '#1b2d94',
        width: '90%',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
    textButton:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    title:{
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFF',
    },    
    containerBack:{
        paddingLeft: 20,
        marginTop: 40,
        flexDirection: 'row',
    },
    textBack:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 8,
    },
    containerforgot:{
        paddingLeft: 20,
        marginTop: 10,
        flexDirection: 'row',
    },
    textMsg:{
        fontSize: 16,
        color: '#FFF'
    },
    emailInvalid:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'red',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    passInvalid:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'orange',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    fieldEmpty:{
        position: 'absolute',
        padding: 10,
        backgroundColor: 'blue',
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
    },
    avatar:{
        width: 100, 
        height: 100,
        borderRadius: 50,
    },
    button_search_image:{
        alignItems: 'center',
        margin: 5,
    },  
    text_button_search_image:{
        fontWeight: 'bold',
        color: '#FFF',
    },
    container_avatar:{
        backgroundColor: '#FFF',
        width: '100%',
        height: '60%',
        bottom: 0,
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
    },
    button_close_view_avatar:{
        padding: 15,
        backgroundColor: 'orange',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    text_button_close_view_avatar: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    container_buttons_media:{
        width: '100%',
        height: '15%',
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        flexDirection: 'row',
    },
    button_media_library:{
        width: '50%',
        height: '100%',
        backgroundColor: 'orange',
        borderTopStartRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_media_camera: {
        width: '50%',
        height: '100%',
        backgroundColor: 'orange',
        borderTopEndRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_button_media_library: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    text_button_media_camera: {
        color: '#FFF',
        fontWeight: 'bold', 
    },
    icon_galery: {
        color: '#FFF',
    },
    icon_camera: {
        color: '#FFF',
    },
    avatar_monster: {
        width: 100, 
        height: 100
    },
    container_list_avatar:{
        marginTop: 5,
        height: '70%',
    },
    button_avatar: {
        marginLeft: 50,
        padding: 10,
    }
})

export default styles;