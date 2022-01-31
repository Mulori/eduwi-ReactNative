import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function myProfile({ navigation }) {

     // Set an initializing state whilst Firebase connects
     const [initializing, setInitializing] = useState(true);
     const [user, setUser] = useState();
 
     // Handle user state changes
     function onAuthStateChanged(user) {
         setUser(user);
         if (initializing) setInitializing(false);
         console.log(user);
     }
 
     useEffect(() => {
         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
         return subscriber; // unsubscribe on unmount
     }, []);

    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#294444' />
            <Text>Testez</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})