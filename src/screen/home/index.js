import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainActivity from '../mainActivity';
import newActivity from '../mainActivity/newActivity';

const Stack = createNativeStackNavigator();

export default function Home() {

    return (    
        <Stack.Navigator initialRouteName="mainActivity">
            <Stack.Screen name='mainActivity' options={{ headerShown: false }} component={MainActivity} />
            <Stack.Screen name='newActivity' options={{ headerShown: false }} component={newActivity} />
        </Stack.Navigator>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
})