import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Home from '../home';

import Register from '../register';
import Login from '../login';
import Welcome from '../welcome';

const Stack = createNativeStackNavigator();

function RouteAuth() {
  return(
    <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
    </Stack.Navigator>
  );
}

export default function Auth() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);
    
    if (initializing) return null;

    return (      
        <NavigationContainer>
          {user ? <Home /> : <RouteAuth /> }           
        </NavigationContainer>
    );
}