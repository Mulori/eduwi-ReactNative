import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: '100%',        
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
        padding: 5,
        backgroundColor: '#9400D3',
        flexDirection: 'row',
        width: '100%',
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
    conteiner_comment_main:{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 5,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        backgroundColor: '#9400D3'
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
        left: 15,
        top: 10,
        fontWeight: 'bold',
    },
    text_date: {
        position: 'absolute',
        color: '#FFF',
        right: 10,
        top: 14,
    },
    text_name_comment: {
        color: '#FFF',
        left: 15,
        fontWeight: 'bold',
    },
    text_date_comment: {
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
        width: '72%',
        backgroundColor: '#808080',
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
        right: 15,
        top: 5,
        position: 'absolute'
    },
    button_media:{
        backgroundColor: '#808080',
        padding: 10,
        borderRadius: 50,
        right: 60,
        top: 5,
        position: 'absolute'
    },
    icon_send: {
        color: '#FFF'
    },
    container_modal_media: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },
    container_avatar:{
        backgroundColor: '#FFF',
        width: '100%',
        height: '10%',
        bottom: 0,
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
    },
    button_close_view_avatar:{
        padding: 15,
        backgroundColor: '#9400D3',
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
        height: '100%',
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        flexDirection: 'row',
    },
    button_media_library:{
        width: '50%',
        height: '100%',
        backgroundColor: '#9400D3',
        borderTopStartRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_media_camera: {
        width: '50%',
        height: '100%',
        backgroundColor: '#9400D3',
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
    text_input_comment_media: {
        width: '82%',
        backgroundColor: '#808080',
        color: '#FFF',
        borderRadius: 15,
        padding: 8,
        fontSize: 15,
        left: 5,
        maxHeight: 120
    },
    icon_image: {
        color: '#9400D3'
    },
    image_selected:{
        width: '100%', 
        height: '100%' ,
    },
    button_image_selected: {
        alignItems: 'center',
    },
    container_icon_image: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    comment_top: {        
        color: '#9400D3'
    },
    button_close: {
        position: 'absolute',
        right: 0,
        top: -15,
        backgroundColor: '#FFF',
        borderRadius: 50,
        padding: 2,
    }
})

export default styles;