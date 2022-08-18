import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, Alert, StatusBar, ImageEditor, ScrollView } from 'react-native';
import styles from './styles';

export default function Details({ navigation, route }) {
    const { data } = route.params;
    const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    var date = new Date(data.notification_date);

    const formatDate = (date) => {
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        return formatted_date;
    }

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor='#4169E1' barStyle='light-content' />
            <View style={styles.header}>
                <Image source={data.user_image ? { uri : data.user_image } : require('../../../assets/image/avatarMissing.png')} style={styles.image_user} />
                <View style={{ height: 50 }}>
                    <Text style={styles.name}>{data.user_name + ' ' + data.user_last_name}</Text>
                    <Text style={styles.date}>{formatDate(date)}</Text>
                </View>
            </View>
            <View style={styles.container_body}>
                <Image source={{ uri: data.image_url }} resizeMode='contain' style={styles.image_body} />
                <Text style={styles.text}>{data.notification_text}</Text>
            </View>
            
            
        </View>
    )
}