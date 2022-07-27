
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import Video from 'react-native-video';

export default function testee({ navigation }) {

    const Card = (props) => {
        return (
            <View style={{ width: '100%', backgroundColor: 'black', marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../assets/image/avatarMissing.png')} style={{ width: 40, height: 40, left: 10, borderRadius: 50 }} />
                        <View style={{ width: '100%', height: '100%' }}>
                            <Text style={{ left: 20, fontWeight: 'bold', color: '#FFF', fontSize: 18, }}>{props.data.name}</Text>
                            <Text style={{ left: 20, color: '#FFF', fontSize: 12, }}>{props.data.title}</Text>
                        </View>
                    </View>
                    <Video
                        style={{ width: '100%', height: '40%',}}
                        controls={true}
                        paused={false}
                        source={{ uri: props.data.uri }}
                    />
            </View>
        )
    }

    let data_media = [
        {
            name: 'Murilo Garcia',
            title: 'Musica - Pipoco, Ana Castela Feat. Melody',
            uri: 'https://firebasestorage.googleapis.com/v0/b/eduwi-64db3.appspot.com/o/reel%2Fana%20castela.mp4?alt=media&token=0b13b98a-52e7-46e7-b014-134c2febbf56'
        },
        {
            name: 'Mirela de Mello',
            title: 'Musica - Pipoco, Ana Castela Feat. Melody',
            uri: 'https://firebasestorage.googleapis.com/v0/b/eduwi-64db3.appspot.com/o/reel%2Fana%20castela.mp4?alt=media&token=0b13b98a-52e7-46e7-b014-134c2febbf56'
        },
        {
            name: 'João da Silva',
            title: 'Musica - Pipoco, Ana Castela Feat. Melody',
            uri: 'https://firebasestorage.googleapis.com/v0/b/eduwi-64db3.appspot.com/o/reel%2Fana%20castela.mp4?alt=media&token=0b13b98a-52e7-46e7-b014-134c2febbf56'
        },
        {
            name: 'Paulo Plinio',
            title: 'Musica - Pipoco, Ana Castela Feat. Melody',
            uri: 'https://firebasestorage.googleapis.com/v0/b/eduwi-64db3.appspot.com/o/reel%2Fana%20castela.mp4?alt=media&token=0b13b98a-52e7-46e7-b014-134c2febbf56'
        }
    ]

    return (
        <View style={styles.container}>
            <Card data={data_media[0]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})