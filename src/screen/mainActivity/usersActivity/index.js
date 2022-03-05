import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';


function Header(props){
    const [title, setTitle] = useState(props.title);

    return(
        <Animatable.View animation='flipInY' duration={1500} style={{ backgroundColor: '#582770', padding: 12, alignItems: 'center'}}>
            <Text style={{ color: '#FFF', fontWeight: 'bold'}}>{title}</Text>
        </Animatable.View>
    )
}

export default function usersActivity({ navigation, route }) {
    const { activity } =  route.params;

    return(
        <View>
            <View >
                <StatusBar barStyle='ligth-content' backgroundColor='#582770' />
                <Header title={activity.title} />
            </View>
            <View style={style.container}>
            
            </View>  
        </View>
              
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    }
})