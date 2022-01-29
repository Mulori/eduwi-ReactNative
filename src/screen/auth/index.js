import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Home from '../home';

import Register from '../register';
import Login from '../login';
import Welcome from '../welcome';

const Stack = createNativeStackNavigator();

export default function Auth() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null); 
      
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(setUser);
      return subscriber;
    }, []);  

    return (
      
        <NavigationContainer>
          {user 
          ? 
          <Home /> 
          : 
          <Stack.Navigator initialRouteName='Welcome'>
              <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
              <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
              <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
          </Stack.Navigator>
          }           
        </NavigationContainer>
      );
}