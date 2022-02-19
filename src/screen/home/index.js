import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainActivity from '../mainActivity';
import newActivity from '../mainActivity/newActivity';
import newActivityQuestionMain from '../mainActivity/newActivityQuestionMain';
import newActivityQuestions from '../mainActivity/newActivityQuestionMain/newActivityQuestions';
import searchActivity from '../mainActivity/searchActivity';
import myActivity from '../mainActivity/myActivity';
import mainSearchActivity from '../mainActivity/searchActivity/mainSearchActivity';
import passActivity from '../mainActivity/passActivity';

const Stack = createNativeStackNavigator();

export default function Home() {

    return (    
        <Stack.Navigator initialRouteName="mainActivity">
            <Stack.Screen name='mainActivity' options={{ headerShown: false }} component={MainActivity} />
            <Stack.Screen name='newActivity' options={{ headerShown: false }} component={newActivity} />
            <Stack.Screen name='newActivityQuestionMain' options={{ headerShown: false }} component={newActivityQuestionMain} />
            <Stack.Screen name='newActivityQuestions' options={{ headerShown: false }} component={newActivityQuestions} />
            <Stack.Screen name='searchActivity' options={{ headerShown: false }} component={searchActivity} />
            <Stack.Screen name='myActivity' options={{ headerShown: false }} component={myActivity} />
            <Stack.Screen name='mainSearchActivity' options={{ headerShown: false }} component={mainSearchActivity} />            
            <Stack.Screen name='passActivity' options={{ headerShown: false }} component={passActivity} />            
        </Stack.Navigator>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
})