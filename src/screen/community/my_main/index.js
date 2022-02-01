import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import listGroup from '../../group/list';
import myCommunity from '../my';

const stack = createNativeStackNavigator();

export default function my_main() {
    return(
        <NavigationContainer independent={true}>
            <stack.Navigator initialRouteName="myCommunity">
                <stack.Screen name="listCommunity" options={{ headerShown: false }} component={myCommunity}/>
                <stack.Screen name="listGroup" options={{ headerShown: false }} component={listGroup}/>                
            </stack.Navigator>            
        </NavigationContainer>
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