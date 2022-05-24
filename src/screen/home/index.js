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
import responseQuestion from '../mainActivity/response/questions';
import PageSucess from '../../screen/mainActivity/response/sucess';
import usersActivity from '../../screen/mainActivity/usersActivity';
import QuestionsActivity from '../mainActivity/myActivity/questionsActivity';
import QuestionsUsers from '../../screen/mainActivity/response/questionsUsers';
import myProfile from '../profile';
import Main from '../main';
import Game from '../game';
import GameDetail from '../game/gameDetail';
import newActivityCompleteSentence from '../mainActivity/newActivityCompleteSentence';
import newActivitySentence from '../mainActivity/newActivityCompleteSentence/newActivitySentence';

import Teste from '../teste/';
import Teste2 from '../teste/teste2';

const Stack = createNativeStackNavigator();

export default function Home() {

    return (    
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name='Main' options={{ headerShown: false }} component={Main} />  
            <Stack.Screen name='mainActivity' options={{ headerShown: false }} component={MainActivity} />
            <Stack.Screen name='newActivity' options={{ headerShown: false }} component={newActivity} />
            <Stack.Screen name='newActivityQuestionMain' options={{ headerShown: false }} component={newActivityQuestionMain} />
            <Stack.Screen name='newActivityQuestions' options={{ headerShown: false }} component={newActivityQuestions} />
            <Stack.Screen name='searchActivity' options={{ headerShown: false }} component={searchActivity} />
            <Stack.Screen name='myActivity' options={{ headerShown: false }} component={myActivity} />
            <Stack.Screen name='mainSearchActivity' options={{ headerShown: false }} component={mainSearchActivity} />            
            <Stack.Screen name='passActivity' options={{ headerShown: false }} component={passActivity} />   
            <Stack.Screen name='responseQuestion' options={{ headerShown: false }} component={responseQuestion} />    
            <Stack.Screen name='pageSucess' options={{ headerShown: false }} component={PageSucess} />         
            <Stack.Screen name='usersActivity' options={{ headerShown: false }} component={usersActivity} />
            <Stack.Screen name='QuestionsActivity' options={{ headerShown: false }} component={QuestionsActivity} />    
            <Stack.Screen name='QuestionsUsers' options={{ headerShown: false }} component={QuestionsUsers} />    
            <Stack.Screen name='myProfile' options={{ headerTitle: 'Meu Perfil' }} component={myProfile} />
            <Stack.Screen name='Game' options={{ headerTitle: 'Gamificação - Loja' }} component={Game} />
            <Stack.Screen name='GameDetail' options={{ headerTitle: 'Gamificação - Item' }} component={GameDetail} />
            <Stack.Screen name='newActivityCompleteSentence' options={{ headerShown: false }} component={newActivityCompleteSentence} />
            <Stack.Screen name='newActivitySentence' options={{ headerShown: false }} component={newActivitySentence} />

            <Stack.Screen name='Teste' options={{ headerTitle: 'Teste' }} component={Teste} />           
            <Stack.Screen name='Teste2' options={{ headerTitle: 'Teste 2' }} component={Teste2} />     
        </Stack.Navigator>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
})