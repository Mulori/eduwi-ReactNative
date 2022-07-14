import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container_avatar:{
        backgroundColor: '#FFF',
        width: '100%',
        height: '15%',
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
        height: '60%',
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
})

export default styles;
