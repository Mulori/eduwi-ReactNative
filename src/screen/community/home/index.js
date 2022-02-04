import React from 'react';
import { StyleSheet } from 'react-native';

export default function Home() {
    return(
        <View style={style.container}>
            <Text>Pagina Lista</Text>
        </View>  
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#294444'
    }
})