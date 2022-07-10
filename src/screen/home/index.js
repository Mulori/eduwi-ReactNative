import React, { useEffect, useState } from 'react';
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
import sentencesActivity from '../mainActivity/myActivity/sentencesActivity';
import QuestionsUsers from '../../screen/mainActivity/response/questionsUsers';
import myProfile from '../profile';
import Main from '../main';
import Game from '../game';
import GameDetail from '../game/gameDetail';
import newActivityCompleteSentence from '../mainActivity/newActivityCompleteSentence';
import newActivitySentence from '../mainActivity/newActivityCompleteSentence/newActivitySentence';
import responseSentences from '../mainActivity/response/sentences';
import sentencesUsers from '../mainActivity/response/sentencesUsers';
import responseSentenceUser from '../mainActivity/response/responseSentenceUser';
import activitypage from '../mainActivity/activity';

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
            <Stack.Screen name='myActivity' options={{ headerShown: false,  }} component={myActivity} />
            <Stack.Screen name='mainSearchActivity' options={{ headerShown: false }} component={mainSearchActivity} />            
            <Stack.Screen name='passActivity' options={{ headerShown: false }} component={passActivity} />   
            <Stack.Screen name='responseQuestion' options={{ headerShown: false }} component={responseQuestion} />    
            <Stack.Screen name='pageSucess' options={{ headerShown: false }} component={PageSucess} />         
            <Stack.Screen name='usersActivity' options={{ headerShown: false }} component={usersActivity} />
            <Stack.Screen name='QuestionsActivity' options={{ headerShown: false }} component={QuestionsActivity} />    
            <Stack.Screen name='sentencesActivity' options={{ headerShown: false }} component={sentencesActivity} /> 
            <Stack.Screen name='QuestionsUsers' options={{ headerShown: false }} component={QuestionsUsers} />    
            <Stack.Screen name='myProfile' options={{ headerTitle: 'Meu Perfil' }} component={myProfile} />
            <Stack.Screen name='Game' options={{ headerTitle: 'Gamificação - Loja' }} component={Game} />
            <Stack.Screen name='GameDetail' options={{ headerTitle: 'Gamificação - Item' }} component={GameDetail} />
            <Stack.Screen name='newActivityCompleteSentence' options={{ headerShown: false }} component={newActivityCompleteSentence} />
            <Stack.Screen name='newActivitySentence' options={{ headerShown: false }} component={newActivitySentence} />
            <Stack.Screen name='responsesentences' options={{ headerShown: false }} component={responseSentences} />  
            <Stack.Screen name='activity' options={{ headerShown: false, }} component={activitypage} />   
            <Stack.Screen name='sentencesUsers' 
            options={{ 
                headerTitle: 'Respostas do Participante', 
                headerStyle: { 
                    backgroundColor: '#582770', 
                    color: '#FFF' 
                }, 
                headerTitleStyle: { 
                    color: '#FFF' 
                },
                headerTintColor: '#FFF',
                }} component={sentencesUsers} />     
            <Stack.Screen name='responseSentenceUser' 
            options={{ 
                headerTitle: 'Resposta', 
                headerStyle: { 
                    backgroundColor: '#582770', 
                    color: '#FFF' 
                }, 
                headerTitleStyle: { 
                    color: '#FFF' 
                },
                headerTintColor: '#FFF',
                }} component={responseSentenceUser} /> 
        </Stack.Navigator>   
    );
}