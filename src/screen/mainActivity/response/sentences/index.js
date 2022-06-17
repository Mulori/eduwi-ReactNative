import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal, ImageBackground, FlatList, TextInput } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import MainServices from '../../../../services/mainService/mainService';
import {NavigationActions, StackActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function responseSentences({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listSentences, setListSentences] = useState([]);
    const [dataReward, setDataReward] = useState(null);
    const [ModalMenuVisible, setModalMenuVisible] = useState(false);
    const [Type, setType] = useState(0);

    function Rewarding(number_question, type){
        switch(type){
            case 6: //Espie uma resposta
                switch(listSentences[number_question - 1].right_answer){
                    case 'one':
                        Alert.alert('Espiando Questão ' + number_question, listSentences[number_question - 1].answer_one)
                        break;
                    case 'two':
                        Alert.alert('Espiando Questão ' + number_question, listSentences[number_question - 1].answer_two)
                        break;
                    case 'tree':
                        Alert.alert('Espiando Questão ' + number_question, listSentences[number_question - 1].answer_tree)
                        break;
                    case 'four':
                        Alert.alert('Espiando Questão ' + number_question, listSentences[number_question - 1].answer_four)
                        break;
                }

                break;
            case 7: //Dica de resposta

                switch(listSentences[number_question - 1].right_answer){
                    case 'one':
                        Alert.alert('Dica da Questão ' + number_question, listSentences[number_question - 1].answer_one.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_one.split(' ')[2]  )
                        break;
                    case 'two':
                        Alert.alert('Dica da Questão ' + number_question, listSentences[number_question - 1].answer_two.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_two.split(' ')[2]  )
                        break;
                    case 'tree':
                        Alert.alert('Dica da Questão ' + number_question, listSentences[number_question - 1].answer_tree.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_tree.split(' ')[2]  )
                        break;
                    case 'four':
                        Alert.alert('Dica da Questão ' + number_question, listSentences[number_question - 1].answer_four.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_four.split(' ')[2]  )
                        break;
                }
                
                break;
            case 5: //Gabarite uma atividade

                console.log(listSentences)

                var sucess = true;
                var index = 0;
                var activity = {};
                var activityArray = [];

                listSentences.forEach(item => {
                    index++                    
                    activity.activity_id = parseInt(listSentences[0].activity_id);
                    activity.number_question = index;
                    activity.answer = item.right_answer;
                    activityArray.push({...activity});    
                });   

                console.log(JSON.stringify(activityArray))

                APIActivity.Post('/activity/question/users', VG.user_uid, { activity_id: listSentences[0].activity_id }) //Faz a postagem do cabeçalho da atividade
                .then(() => {    
                    APIActivity.Post('/activity/question/users/response', VG.user_uid, activityArray)
                    .then()
                    .catch((erro) => {
                        sucess = false;
                        console.log(erro)
                        Alert.alert('Erro', 'Ocorreu um problema ao responder as questões da atividade', [{text: 'Ok',style: 'destructive', }]);
                    })  

                    if (sucess) {
                        navigation.dispatch(StackActions.replace('pageSucess', { text: 'Atividade Enviada!'}));
                    }                
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert('Erro', 'Ocorreu um problema ao enviar a resposta da atividade', [{text: 'Ok',style: 'destructive', }]);
                }) 

                break;
        }
    }

    function Reward(item){
        if(item[0].type.toString() == '6'){ //Espie uma resposta
            setType(6);
            setModalMenuVisible(true); 
        }

        if(item[0].type.toString() == '7'){ //Dica de resposta
            setType(7);
            setModalMenuVisible(true); 
        }

        if(item[0].type.toString() == '5'){ //Gabarite uma atividade
            Rewarding(item.number_question, 5)
        }
    }

    function UseReward(item){
        Alert.alert(item.name, "Deseja utilizar está recompensa?",  
            [{  text: "Sim",
                onPress: () => {
                    MainServices.Post("/reward/" + item.id_amount + "/use", VG.user_uid, null)
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


    function GetReward(){
        MainServices.Get("/reward/users", VG.user_uid)
        .then((response) => {
            setDataReward(response.data);    
        })
        .catch((error) => {
            console.log(error);
        })         
    }

    useEffect(() => {

        setModalVisible(true);

        APIActivity.Get('/activity/' + data.id + '/sentences', VG.user_uid)
        .then((sentences) => {
            setListSentences(sentences.data);
            GetReward();
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
            <View style={{  backgroundColor: 'transparent' }}>                
                <View>
                    <Modal
                        visible={ModalMenuVisible}
                        style={{ margin: 50 }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18 }}>Selecione uma questão</Text>
                            <FlatList
                                data={listSentences}
                                style={{  width: '100%', margin: 15 }}
                                renderItem={({ item }) => {return(
                                    <TouchableOpacity 
                                    key={item} 
                                    style={{ backgroundColor: '#878286', padding: 15, margin: 5}}
                                    onPress={() => {
                                        console.log(item);
                                        setModalMenuVisible(false);
                                        Rewarding(item.number_sentence, Type)
                                    }}
                                    >
                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.number_sentence}</Text>
                                    </TouchableOpacity>
                                )}}
                            />
                        </View>                        
                    </Modal>
                </View>
                {
                !dataReward ? null :
                    dataReward.length == 0 ? null :
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 20, marginTop: 0, color: '#000' }}>Recompensas Disponíveis</Text>
                        <FlatList 
                            data={dataReward} 
                            horizontal
                            style={{ marginLeft: 20, marginTop: 0}}
                            keyExtractor={item => item.id} 
                            renderItem={({ item }) => {
                                const image = { uri: item.picture };

                                return (                             
                                    <TouchableOpacity 
                                    key={item.id} 
                                    style={{backgroundColor: '#FFF', borderRadius: 15, padding: 10, margin: 5, }}
                                    onPress={() => UseReward(item)}
                                    >
                                        <View style={style.containerImage}>      
                                            <ImageBackground  
                                                source={image} 
                                                style={{width: 40, height: 40, borderRadius: 50}}  
                                            />                        
                                        </View>  
                                        <Text style={{fontWeight: 'bold', fontSize: 10, color: '#000'}}>{item.name}</Text>
                                        <View style={style.containerValue}>                      
                                            <Text style={{color: '#000', marginLeft: 5, fontSize: 10,}}>Quantidade: {item.amount}</Text>  
                                        </View>                                 
                                    </TouchableOpacity>      
                                );
                            }}
                        />   
                    </View>
                }
            </View>
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
        marginLeft: '5%',
        fontSize: 18,
    },
    question: {
        fontWeight: 'bold',
        marginLeft: '5%',
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
        alignItems: 'center',
    },
    containerValue: {
        alignItems: 'center',
    }, 
})

function ListResponse(props){
    const [icons, setIcons] = useState(null);
    const [item, setItem] = useState(props.item);
    const [itemPalavra, setItemPalavra] = useState('');
    console.log(item)

    return(
        <View style={{ flex: 1, marginTop: 15, backgroundColor: 'transparent'}}>            
            <View style={{width: '90%'}}>
                <Text style={style.number_question}>Frase: {item.number_sentence}</Text>
            </View>                
            <View style={{width: '90%', marginTop: 15, marginBottom: 15}}>
                <Text style={style.question}>{item.question}</Text>
            </View>
            <ScrollView>
            
                {
                    !item.marked_sentence ? null :
                    item.marked_sentence.split('??').map((frase, index) =>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'center',  }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#e7e4d5', margin: 5, padding: 15, borderRadius: 15 }}>{frase}</Text>                  
                            {
                                index + 1 == item.marked_sentence.split('??').length ? null :
                                <TextInput style={{ 
                                    backgroundColor: '#e7e4d5', 
                                    width: '25%', 
                                    borderRadius: 15, 
                                    padding: 12, 
                                    fontSize: 18, 
                                    fontWeight: 'bold',
                                    fontWeight: 'bold', 
                                    textAlign: 'center'
                                }} 
                                    onChangeText={(value) => setItemPalavra(value)}
                                />
                            }        
                        </View>  
                    )
                }              
                            
            <FlatList 
            data={item.words_help.split(' ')} 
            style={{ margin: '5%'}}
            keyExtractor={item => item.id} 
            numColumns={5} 
            renderItem={({ item }) => {
                return (
                    <Animatable.View animation='rubberBand' duration={2000} key={item.id}>
                            <TouchableOpacity style={{ backgroundColor: '#5e17eb', padding: 10, margin: 5, borderRadius: 10 }} >
                                <Text style={{ color: '#FFF'}}>
                                    {item}
                                </Text>
                            </TouchableOpacity>           
                    </Animatable.View>                    
                );
            }} />        
            </ScrollView>  
        </View>                     
    )
}

class RenderActivity extends React.Component {    

    _renderSlides = ({item}) => {   

        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_sentence.toString())
        .set({
            response: 'null',
        })
        .then()
        .catch((erro) => {
            console.log(erro)
            Alert.alert('Erro', 'Ocorreu um erro ao montar as questões. Tente novamente!');
        }) 
        
        return(
           <ListResponse item={item} />                  
        )
    };

    _renderNextButton = () => {
      return (
        <View style={style.buttonCircle}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Próxima</Text> 
            <Icon
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
            <Icon
                name="md-checkmark"
                color="rgba(255, 255, 255, .9)"
                size={24}
            />
        </View>
      );
    };

    render() {
      const { data, user, navi } = this.props;
      function done(){
        firestore().collection('user_activity_' + data[0].activity_id + '_response_' + VG.user_uid).get()
        .then(querySnapshot => {
            var bloqueia_post = false;
            var sucess = true;
            var index = 0;
            var activity = {};
            var activityArray = [];

            querySnapshot.forEach(documentSnapshot => {
                const valid = documentSnapshot.data()
                if(valid.response == 'null'){
                    Alert.alert('Atenção', 'Responda todas as questões.');
                    bloqueia_post = true;
                    return;
                }

                index++
                
                activity.activity_id = parseInt(data[0].activity_id);
                activity.number_question = index;
                activity.answer = valid.response;
                activityArray.push({...activity});             

            });   

            console.log(bloqueia_post)
            if(bloqueia_post){
                return;
            }

            console.log(JSON.stringify(activityArray))

            APIActivity.Post('/activity/question/users', VG.user_uid, { activity_id: data[0].activity_id }) //Faz a postagem do cabeçalho da atividade
            .then(() => {    
                APIActivity.Post('/activity/question/users/response', VG.user_uid, activityArray)
                .then()
                .catch((erro) => {
                    sucess = false;
                    console.log(erro)
                    Alert.alert('Erro', 'Ocorreu um problema ao responder as questões da atividade', [{text: 'Ok',style: 'destructive', }]);
                })  

                if (sucess) {
                    navi.dispatch(StackActions.replace('pageSucess', { text: 'Atividade Enviada!'}));
                }                
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Erro', 'Ocorreu um problema ao enviar a resposta da atividade', [{text: 'Ok',style: 'destructive', }]);
            })                  
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao realizara leitura das respostas temporarias.');
        });  
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