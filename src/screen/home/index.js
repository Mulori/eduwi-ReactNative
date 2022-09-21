import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VG from '../../components/variables/VG';

import MainActivity from '../mainActivity';
import NewActivity from '../mainActivity/newActivity';
import NewActivityQuestionMain from '../mainActivity/newActivityQuestionMain';
import NewActivityQuestions from '../mainActivity/newActivityQuestionMain/newActivityQuestions';
import SearchActivity from '../mainActivity/searchActivity';
import MyActivity from '../mainActivity/myActivity';
import MainSearchActivity from '../mainActivity/searchActivity/mainSearchActivity';
import PassActivity from '../mainActivity/passActivity';
import ResponseQuestion from '../mainActivity/response/questions';
import PageSucess from '../../screen/mainActivity/response/sucess';
import UsersActivity from '../../screen/mainActivity/usersActivity';
import QuestionsActivity from '../mainActivity/myActivity/questionsActivity';
import SentencesActivity from '../mainActivity/myActivity/sentencesActivity';
import QuestionsUsers from '../../screen/mainActivity/response/questionsUsers';
import MyProfile from '../profile';
import Main from '../main';
import Game from '../game';
import GameDetail from '../game/gameDetail';
import NewActivityCompleteSentence from '../mainActivity/newActivityCompleteSentence';
import NewActivitySentence from '../mainActivity/newActivityCompleteSentence/newActivitySentence';
import NewActivityQuestionsTrueOrFalse from '../mainActivity/newActivityTrueOrFalse/';
import ResponseSentences from '../mainActivity/response/sentences';
import SentencesUsers from '../mainActivity/response/sentencesUsers';
import ResponseSentenceUser from '../mainActivity/response/responseSentenceUser';
import ResponseQuestionUser from '../mainActivity/response/responseQuestionUser';
import Activitypage from '../mainActivity/activity';
import Teste from '../teste/';
import ViewerImage from '../viewerImage';
import NewActivityName from '../mainActivity/newActivity/newActivityName';
import NewActivityImage from '../mainActivity/newActivity/newActivityImage';
import NewActivityOptions from '../mainActivity/newActivity/newActivityOptions';
import Sucess from '../sucess';
import Notification from '../../screen/notification';
import Details from '../../screen/notification/details';
import Eduvida from '../eduvida';
import eduvidaDetail from '../eduvida/eduvidaDetail';
import NewEduvida from '../eduvida/newEduvida';
import Evaluation from '../evaluation';
import Ranking from '../ranking';
import ResponseTrueFalse from '../../screen/mainActivity/response/truefalse';

const Stack = createNativeStackNavigator();

export default function Home() {

    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name='Main' options={{ headerShown: false }} component={Main} />
            <Stack.Screen name='MainActivity' options={{ headerShown: false }} component={MainActivity} />
            <Stack.Screen name='NewActivity' options={{ headerShown: false }} component={NewActivity} />
            <Stack.Screen name='NewActivityQuestionMain' options={{ headerShown: false }} component={NewActivityQuestionMain} />
            <Stack.Screen name='NewActivityQuestions' options={{ headerShown: false }} component={NewActivityQuestions} />
            <Stack.Screen name='NewActivityQuestionsTrueOrFalse' options={{ headerShown: false }} component={NewActivityQuestionsTrueOrFalse} />
            <Stack.Screen name='SearchActivity' options={{ headerShown: false }} component={SearchActivity} />
            <Stack.Screen name='MyActivity' options={{ headerShown: false, }} component={MyActivity} />
            <Stack.Screen name='MainSearchActivity' options={{ headerShown: false }} component={MainSearchActivity} />
            <Stack.Screen name='PassActivity' options={{ headerShown: false }} component={PassActivity} />
            <Stack.Screen name='ResponseQuestion' options={{ headerShown: false }} component={ResponseQuestion} />
            <Stack.Screen name='EduvidaDetail' options={{ headerShown: false }} component={eduvidaDetail} />
            <Stack.Screen name='Ranking' options={{ headerShown: false }} component={Ranking} />
            <Stack.Screen name='Evaluation' options={{
                headerTitle: 'Avalie-nos',
                headerStyle: { backgroundColor: '#FFF', color: '#FFF' },
                headerTitleStyle: { color: '#000' }, headerTintColor: '#000',
            }} component={Evaluation} />
            <Stack.Screen name='NewEduvida' options={{
                headerTitle: 'Compartilhar Dúvida',
                headerStyle: { backgroundColor: '#9400D3', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={NewEduvida} />
            <Stack.Screen name='Eduvida' options={{
                headerTitle: 'Eduvidas',
                headerStyle: { backgroundColor: '#9400D3', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={Eduvida} />
            <Stack.Screen name='Notification' options={{
                headerTitle: 'Notificações',
                headerStyle: { backgroundColor: '#4169E1', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={Notification} />
            <Stack.Screen name='Details' options={{
                headerTitle: '',
                headerStyle: { backgroundColor: '#4169E1', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={Details} />
            <Stack.Screen name='UsersActivity' options={{ headerShown: false }} component={UsersActivity} />
            <Stack.Screen name='QuestionsActivity' options={{ headerShown: false }} component={QuestionsActivity} />
            <Stack.Screen name='SentencesActivity' options={{ headerShown: false }} component={SentencesActivity} />
            <Stack.Screen name='QuestionsUsers' options={{ headerShown: false }} component={QuestionsUsers} />
            <Stack.Screen name='MyProfile' options={{ headerTitle: 'Meu Perfil' }} component={MyProfile} />
            <Stack.Screen name='Game' options={{
                headerTitle: 'Loja',
                headerStyle: { backgroundColor: '#3CB371', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={Game} />
            <Stack.Screen name='GameDetail' options={{
                headerTitle: 'Item',
                headerStyle: { backgroundColor: '#3CB371', color: '#FFF' },
                headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
            }} component={GameDetail} />
            <Stack.Screen name='NewActivityCompleteSentence' options={{ headerShown: false }} component={NewActivityCompleteSentence} />
            <Stack.Screen name='NewActivitySentence' options={{ headerShown: false }} component={NewActivitySentence} />
            <Stack.Screen name='Responsesentences' options={{ headerShown: false }} component={ResponseSentences} />
            <Stack.Screen name='ResponseTrueFalse' options={{ headerShown: false }} component={ResponseTrueFalse} />
            <Stack.Screen name='Activity' options={{ headerShown: false, }} component={Activitypage} />
            <Stack.Screen name='NewActivityName' options={{ headerShown: false, }} component={NewActivityName} />
            <Stack.Screen name='NewActivityImage' options={{ headerShown: false, }} component={NewActivityImage} />
            <Stack.Screen name='NewActivityOptions' options={{ headerShown: false, }} component={NewActivityOptions} />
            <Stack.Screen name='Sucess' options={{ headerShown: false, }} component={Sucess} />
            <Stack.Screen name='Testee' options={{ headerShown: false, }} component={Teste} />
            <Stack.Screen name='ViewerImage' component={ViewerImage} options={{ headerTitle: 'Imagem', headerStyle: { backgroundColor: '#000', color: '#000' }, headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF' }} />
            <Stack.Screen name='SentencesUsers'
                options={{
                    headerTitle: 'Respostas do Participante',
                    headerStyle: { backgroundColor: '#582770', color: '#FFF' },
                    headerTitleStyle: { color: '#FFF' }, headerTintColor: '#FFF',
                }} component={SentencesUsers} />
            <Stack.Screen name='ResponseSentenceUser'
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
                }} component={ResponseSentenceUser} />
            <Stack.Screen name='ResponseQuestionUser'
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
                }} component={ResponseQuestionUser} />


        </Stack.Navigator>
    );
}