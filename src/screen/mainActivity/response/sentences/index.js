import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal, ImageBackground, FlatList, TextInput } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainServices from '../../../../services/mainService/mainService';
import {NavigationActions, StackActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function responseSentences({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listSentences, setListSentences] = useState([]);
    const [dataReward, setDataReward] = useState(null);
    const [ModalMenuVisible, setModalMenuVisible] = useState(false);
    const [Type, setType] = useState(0);

    async function ClearStorageResponse(){
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys();
            const keys_delete = [];
            keys.forEach((item, index) => {      
                var keyStorageName = item;          
                item = item.replace('@', '');

                var array_item = item.split(';');

                if(array_item[0] == 'response'){
                    keys_delete.push(keyStorageName);
                }                
            })

            try {
                await AsyncStorage.multiRemove(keys_delete)
            } catch(e) {
                console.log(e);
            }
            
        } catch(e) {
            
        }
    }

    useEffect(() => {
        setModalVisible(true);

        ClearStorageResponse();

        APIActivity.Get('/activity/' + data.id + '/sentences', VG.user_uid)
        .then((sentences) => {
            setListSentences(sentences.data);
            //GetReward();
            setModalVisible(false);
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao baixar as questões. Tente novamente', 'Ok');
            setModalVisible(false);
        })
        
    }, [])   

    return(
        <View style={style.container}>
            <ImageBackground  
                    source={require('../../../../assets/image/wallpaperSentence.png')} 
                    style={{width: '100%', height: '100%', position: 'absolute'}}  
            />
            <StatusBar barStyle='light-content' backgroundColor='#5271ff' />               
            <RenderActivity data={listSentences} user={VG.user_uid} navi={navigation}/>    
            <Modal visible={modalVisible}>
                <View style={[style.containerLoad, style.horizontal]}>
                    <ActivityIndicator size="large" color="green" />                                                    
                </View>     
            </Modal>
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerLoad: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    button_one: {
        width: '90%',
        padding: 10,
        backgroundColor: 'red',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_two: {
        width: '90%',
        padding: 10,
        backgroundColor: 'blue',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_tree: {
        width: '90%',
        padding: 10,
        backgroundColor: 'green',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    button_four: {
        width: '90%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 5,
        borderRadius: 12,
        flexDirection: 'row'
    },
    text_response: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    number_question: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18,
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '3%',
        fontSize: 15,
    },
    buttonCircle: {
        width: 110,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    containerImage: {
        borderRadius: 20,
        width: '15%',
        alignItems: 'flex-start',
    },
    containerValue: {
        alignItems: 'center',
    }, 
})

function ListResponse(props){
    const [icons, setIcons] = useState(null);
    const [item, setItem] = useState(props.item);
    const [itemPalavra, setItemPalavra] = useState('');
    const [helpVisible, setHelpVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataReward, setDataReward] = useState(null);
    let sentenca = Array(item.marked_sentence.split(' ').length -1);

    function Rewarding(type){
        switch(type){
            case 7: //Dica de resposta
            setHelpVisible(true);
                break;
        }
    }

    function Reward(item){
        // if(item[0].type.toString() == '6'){ //Espie uma resposta
        //     setType(6);
        //     setIsVisible(true); 
        // }

        if(item[0].type.toString() == '7'){ //Dica de resposta
            //setType(7);
            setIsVisible(false); 
            Rewarding(7);
        }

        // if(item[0].type.toString() == '5'){ //Gabarite uma atividade
        //     Rewarding(item.number_question, 5)
        // }
    }

    function UseReward(item_){
        console.log(item_)
        if(item_.type == 7){
            if(item.words_help == "0"){
                Alert.alert('Atenção', 'Não existe dicas para está frase.');
                return;
            }
        }

        Alert.alert(item_.name, "Deseja utilizar está recompensa?",  
            [{  text: "Sim",
                onPress: () => {
                    MainServices.Post("/reward/" + item_.id_amount + "/use", VG.user_uid, null)
                    .then((response) => {
                        GetReward();
                        Reward(response.data);  
                    })
                    .catch((error) => {
                        Alert.alert('Atenção', error)   
                    })  
                },
            },  
                {
                text: "Não",
                },
            ]
        );
    } 

    const HandleSaveText = async (text, number, index) => {
        try{
            sentenca[index] = text;
            const text_json = {
                sentence: text
            }
            await AsyncStorage.setItem('@response;' + item.activity_id + ';' + number + ';' + index, JSON.stringify(text_json));
        }catch(error){
            console.log(error);
        }   
    }

    const HandleEditingField = (text) => {
        console.log(text)
    }

    function GetReward(){
        setIsLoading(true);
        MainServices.Get("/reward/users", VG.user_uid)
        .then((response) => {
            console.log(response.data);
            setDataReward(response.data);    
        })
        .catch((error) => {
            console.log(error);
        })         
        setIsLoading(false)
    }

    function ModalReward(){
        return(
            <View style={{ position: 'absolute', flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ backgroundColor: '#FFF', height: '60%', width: '80%', borderRadius: 15}}>
                    <View style={{ top: 5}}>
                        {
                            isLoading ? 
                            <View style={[style.containerLoad, style.horizontal]}>
                                <ActivityIndicator size="large" color="green" />                                                    
                            </View> 
                            :
                            <View>
                                <View style={{ alignItems: 'center', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Recompensas</Text>
                                </View>                                
                                <FlatList 
                                    data={dataReward} 
                                    horizontal
                                    keyExtractor={item => item.id} 
                                    renderItem={({ item }) => {
                                        const image = { uri: item.picture };
                                        return (                             
                                            <TouchableOpacity 
                                            key={item.id} 
                                            style={{ borderRadius: 15, marginLeft: 5}}
                                            onPress={() => UseReward(item)}
                                            >
                                                <View style={{ flexDirection: 'row', width: '100%'}}>
                                                    <View style={style.containerImage}>      
                                                        <ImageBackground  
                                                            source={image} 
                                                            style={{width: 40, height: 40, borderRadius: 50}}  
                                                        />                        
                                                    </View> 
                                                    <View style={{ width: '85%', alignItems: 'flex-start' }}>
                                                        <Text style={{fontWeight: 'bold', fontSize: 13, color: '#000'}}>{item.name}</Text>
                                                        <View style={style.containerValue}>                      
                                                            <Text style={{color: '#000', fontSize: 12,}}>Quantidade: {item.amount}</Text>  
                                                        </View>  
                                                    </View>
                                                </View>                                                                       
                                            </TouchableOpacity>      
                                        );
                                    }}
                                /> 
                            </View>                              
                        }    
                    </View>
                    <TouchableOpacity 
                    onPress={() => setIsVisible(false)}
                    style={{ backgroundColor: '#5e17eb', padding: 10, width: '100%', 
                    borderBottomLeftRadius: 15, borderBottomEndRadius: 15, bottom: -1, position: 'absolute', alignItems: 'center'
                    }}>
                        <Text style={{ color: '#FFF',}}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent'}}>  
            <View style={{width: '100%', flexDirection: 'row', backgroundColor: '#5271ff', padding: 10}}>
                <View style={{ width: '90%', marginLeft: 5}}>
                    <Text style={style.number_question}>Frase: {item.number_sentence}</Text>
                </View>
                <TouchableOpacity style={{ width: '10%'}} onPress={() => { 
                    setIsVisible(true);
                    GetReward();
                }}>
                    <Icon name='game-controller' size={25} style={{ color: '#FFF' }}/>
                </TouchableOpacity>   
            </View>                
            <View style={{width: '90%', marginTop: 15, marginBottom: 15}}>
                <Text style={style.question}>{item.question}</Text>
            </View>
            <ScrollView>
                <View  style={{ flexWrap: 'wrap', flexDirection: 'row', flex: 1, alignContent: 'center',  }}>
                {
                    !item.marked_sentence ? null :
                    item.marked_sentence.split(' ').map((frase, index) =>
                        <View>                                   
                            {      
                                frase == '??'?                          
                                <TextInput 
                                autoCapitalize='none'
                                style={{ 
                                    backgroundColor: '#e7e4d5',
                                    borderRadius: 15,
                                    padding: 5, 
                                    margin: 5,
                                    fontSize: 18, 
                                    fontWeight: 'bold', 
                                    textAlign: 'center',
                                }} 
                                    value={sentenca[index]}
                                    onChangeText={async(value) => HandleSaveText(value.toString().trim(), item.number_sentence, index)}
                                />
                                :
                                <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: 'transparent', color: '#FFF', margin: 5, padding: 5, borderRadius: 15,  }}>{frase}</Text>        
                            }        
                        </View>  
                    )
                } 
                </View>  
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', flex: 1, alignContent: 'center', marginTop: 30 }} >
                    {
                        !helpVisible ? null : 
                        item.words_help.split(' ').map((help, index) => 
                            <Animatable.View animation='rubberBand' duration={2000} key={index}>
                                <TouchableOpacity                                 
                                    style={{ backgroundColor: '#5e17eb', padding: 10, margin: 5, borderRadius: 10 }} >
                                    <Text style={{ color: '#FFF'}}>
                                        {help}
                                    </Text>
                                </TouchableOpacity>           
                            </Animatable.View>                    
                        )
                    }
                </View> 
            </ScrollView>  
            {
                isVisible ? <ModalReward /> : null
            }  
        </View>                     
    )
}

class RenderActivity extends React.Component {    

    
    _renderSlides = ({item}) => {          
        return(
           <ListResponse item={item} />                  
        )
    };
    _renderNextButton = () => {
      return (
        <View style={style.buttonCircle}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Próxima</Text> 
            <Ionicons
                name="arrow-forward-sharp"
                color="rgba(255, 255, 255, .9)"
                size={24}
            />
        </View>
      );
    };
    _renderDoneButton = () => {
      return (
        <View style={style.buttonCircle}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Finalizar</Text> 
            <Ionicons
                name="md-checkmark"
                color="rgba(255, 255, 255, .9)"
                size={24}
            />
        </View>
      );
    };

    render() {
    const { data, user, navi } = this.props;

    async function done(){

        let keys = [];        
        let keys_done = [];
        try {
            keys = await AsyncStorage.getAllKeys();
            const keys_insert = [];
            var warning = false;

            keys.forEach((item, index) => {      
                var keyStorageName = item;          
                item = item.replace('@', '');

                var array_item = item.split(';');

                if(array_item[0] + ';' + data[0].activity_id == 'response;' + data[0].activity_id){
                    keys_insert.push(keyStorageName);
                }                
            })

            keys_insert.sort();

            console.log(data.length)

            for(var i = 0; i < data.length; i++){
                let sub_keys = [];
                keys_insert.forEach((item_sentence, index) => {
                    if(item_sentence.split(';')[2] == i + 1){
                        
                        sub_keys.push(item_sentence)
                    } 
                })

                sub_keys.sort();

                if(data[i].hidden_words.split(';').length !== sub_keys.length){
                    warning = true;
                }

                let values;
                let text_informed = '';
                try {
                    values = await AsyncStorage.multiGet(sub_keys)
                    values.forEach((item) => {
                        if(text_informed.length > 0){
                            text_informed = text_informed + ';' + JSON.parse(item[1]).sentence;
                        }else{
                            text_informed = JSON.parse(item[1]).sentence;
                        }
                    })
                } catch(e) {
                    console.log(e);
                    return;
                }

                console.log(text_informed)

                let obj_sentence = {
                    activity_id: parseInt(data[0].activity_id),
                    number_sentence: i + 1,
                    sentences_informed: text_informed
                }

                keys_done.push(obj_sentence);
            }

            if(warning){
                return;
            }else{
                SendResponse(keys_done)
            }
            
        } catch(e) {
            console.log(e);
            return;
        }
    }

    async function SendResponse(value){
        var sucess = true;
        console.log(value);
        APIActivity.Post('/activity/question/users', VG.user_uid, { activity_id: data[0].activity_id }) //Faz a postagem do cabeçalho da atividade
        .then(() => {    
            APIActivity.Post('/activity/sentences/users/response', VG.user_uid, value)
            .then()
            .catch((erro) => {
                sucess = false;
                console.log(erro)
                Alert.alert('Erro', 'Ocorreu um problema ao responder as frases da atividade', [{text: 'Ok',style: 'destructive', }]);
            })  

            if (sucess) {
                //navi.dispatch(StackActions.replace('pageSucess', { text: 'Atividade Enviada!'}));
                //navigation.navigate('Sucess', { title: 'Resposta Enviada', avaliable: true, activity_id: data[0].activity_id })

                navi.reset({
                    index: 1,
                    routes: [
                      { name: 'Main'},
                      { name: 'Sucess', params: { title: 'Resposta Enviada', avaliable: true, activity_id: data[0].activity_id }, },
                    ],
                  })
            }                
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um problema ao enviar a resposta da atividade', [{text: 'Ok',style: 'destructive', }]);
        })  
    }

      return (
        <AppIntroSlider
          data={data}
          style={{backgroundColor: 'transparent' }}
          renderItem={this._renderSlides}
          onDone={done}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }