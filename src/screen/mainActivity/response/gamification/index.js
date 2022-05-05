import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal, ImageBackground, FlatList } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import MainServices from '../../../../services/mainService/mainService';
import * as Animatable from 'react-native-animatable';
import {NavigationActions, StackActions} from '@react-navigation/native';


export default function GamificationQuestion() {
    
    return(
        <View style={styles.container_main}>
            <Text style={{ fontSize: 50 }}>teste teste teste</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container_main:{
        flex: 1,
        backgroundColor: '#FFF',
    }
})