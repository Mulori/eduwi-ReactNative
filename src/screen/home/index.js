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
    
    function onAuthStateChanged(user) {    
         VG.user_uid = user.uid
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged); 
        return subscriber;   
    }, []);

    return (    
        <NavigationContainer independent={true}>
            <Tab.Navigator            
                initialRouteName="myCommunity"
                screenOptions={{
                    showLabel: false,
                    tabBarStyle: {
                        height: 60,
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        left: 16,
                        borderRadius: 16,
                        backgroundColor: '#486d6e'
                    },                    
                }}
            >
                <Tab.Screen name="exploreCommunity" component={exploreCommunity}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{ 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: focused ? '#294444' : '#486d6e',
                                borderRadius: focused ? 35 : 0,
                                padding: focused ? 15 : 0,
                                height: focused ? 80 : 50,
                                top:focused ? -10 : 10,
                                }}>
                                <Icon name='globe' size={25} style={{ color:'#FFF' }} />
                                <Text style={{ color: '#FFF' }}>Explorar</Text>
                            </View>                           
                        ),
                        tabBarLabel: '',
                        headerShown: false,
                    }}
                />
                <Tab.Screen name="myCommunity" component={my_main} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{ 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: focused ? '#294444' : '#486d6e',
                                borderRadius: focused ? 35 : 0,
                                padding: focused ? 15 : 0,
                                height: focused ? 80 : 50,
                                top:focused ? -10 : 10,
                                }}>
                                <Icon name='users' size={25} style={{ color:'#FFF' }} />
                                <Text style={{ color: '#FFF' }}>Comunidades</Text>
                            </View>  
                        ),
                        tabBarLabel: '',
                        headerShown: false,
                    }}
                />
                <Tab.Screen name="myProfile" component={myProfile} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{ 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: focused ? '#294444' : '#486d6e',
                                borderRadius: focused ? 35 : 0,
                                padding: focused ? 15 : 0,
                                height: focused ? 80 : 50,
                                top:focused ? -10 : 10,
                                }}>
                                <Icon name='user' size={25} style={{ color:'#FFF' }} />
                                <Text style={{ color: '#FFF' }}>Meu Perfil</Text>
                            </View>  
                        ),
                        tabBarLabel: '',
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>   
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f8',
    },
})