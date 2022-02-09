import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainActivity from '../mainActivity';
import newActivity from '../mainActivity/newActivity';
import newActivityQuestionMain from '../mainActivity/newActivityQuestionMain';
import newActivityQuestions from '../mainActivity/newActivityQuestionMain/newActivityQuestions';

const Stack = createNativeStackNavigator();

export default function Home() {

    return (    
        <Stack.Navigator initialRouteName="mainActivity">
            <Stack.Screen name='mainActivity' options={{ headerShown: false }} component={MainActivity} />
            <Stack.Screen name='newActivity' options={{ headerShown: false }} component={newActivity} />
            <Stack.Screen name='newActivityQuestionMain' options={{ headerShown: false }} component={newActivityQuestionMain} />
            <Stack.Screen name='newActivityQuestions' options={{ headerShown: false }} component={newActivityQuestions} />
        </Stack.Navigator>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
})