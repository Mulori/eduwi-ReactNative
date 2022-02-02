import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import exploreCommunity from '../../screen/community/explore';
import myCommunity from '../../screen/community/my';
import myProfile from '../../screen/profile';
import my_main from '../community/my_main';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import VG from '../../components/variables/VG';

const Tab = createBottomTabNavigator();

export default function Home() {

    return (    
            <Tab.Navigator            
                initialRouteName="myCommunity"
                screenOptions={{
                    showLabel: false,
                    tabBarStyle: {
                        height: 45,                        
                        backgroundColor: '#294444'
                    },                    
                }}
            >
                <Tab.Screen name="exploreCommunity" component={exploreCommunity}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Icon name='globe' size={35} style={{ color: focused ? '#FFF' : '#000000' }} />
                                
                            </View>                           
                        ),
                        tabBarShowLabel: false,
                        headerShown: false,
                    }}
                />
                <Tab.Screen name="myCommunity" component={my_main} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon name='users' size={35} style={{ color: focused ? '#FFF' : '#000000' }} />
                        ),
                        tabBarShowLabel: false,
                        headerShown: false,
                    }}
                />
                <Tab.Screen name="myProfile" component={myProfile} 
                    options={{
                        tabBarIcon: ({focused}) => ( 
                            <Icon name='user' size={35} style={{ color: focused ? '#FFF' : '#000000' }} />
                        ),
                        tabBarShowLabel: false,
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
})