import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import myCommunity from '../my';
import Home from '../home';
import Activity from '../activity';

const stack = createNativeStackNavigator();

export default function my_main() {
    return(
        <stack.Navigator initialRouteName="myCommunity">
            <stack.Screen name="listCommunity" options={{ headerShown: false }} component={myCommunity}/>           
            <stack.Screen name="listUsers" options={{ headerShown: false }} component={Home}/>  
            <stack.Screen name="listActivity" options={{ headerShown: false }} component={Activity}/>           
        </stack.Navigator>   
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