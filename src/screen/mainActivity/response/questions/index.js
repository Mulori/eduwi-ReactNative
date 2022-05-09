import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal, ImageBackground, FlatList } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import MainServices from '../../../../services/mainService/mainService';
import {NavigationActions, StackActions} from '@react-navigation/native';

export default function responseQuestion({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listQuestion, setListQuestions] = useState([]);
    const [dataReward, setDataReward] = useState(null);
    const [ModalMenuVisible, setModalMenuVisible] = useState(false);
    const [Type, setType] = useState(0);

    function Rewarding(number_question, type){
        switch(type){
            case 6: //Espie uma resposta
                switch(listQuestion[number_question - 1].right_answer){
                    case 'one':
                        Alert.alert('Espiando Questão ' + number_question, listQuestion[number_question - 1].answer_one)
                        break;
                    case 'two':
                        Alert.alert('Espiando Questão ' + number_question, listQuestion[number_question - 1].answer_two)
                        break;
                    case 'tree':
                        Alert.alert('Espiando Questão ' + number_question, listQuestion[number_question - 1].answer_tree)
                        break;
                    case 'four':
                        Alert.alert('Espiando Questão ' + number_question, listQuestion[number_question - 1].answer_four)
                        break;
                }

                break;
            case 7: //Dica de resposta

                switch(listQuestion[number_question - 1].right_answer){
                    case 'one':
                        Alert.alert('Dica da Questão ' + number_question, listQuestion[number_question - 1].answer_one.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_one.split(' ')[2]  )
                        break;
                    case 'two':
                        Alert.alert('Dica da Questão ' + number_question, listQuestion[number_question - 1].answer_two.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_two.split(' ')[2]  )
                        break;
                    case 'tree':
                        Alert.alert('Dica da Questão ' + number_question, listQuestion[number_question - 1].answer_tree.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_tree.split(' ')[2]  )
                        break;
                    case 'four':
                        Alert.alert('Dica da Questão ' + number_question, listQuestion[number_question - 1].answer_four.split(' ')[0])// + ' ' + listQuestion[number_question - 1].answer_four.split(' ')[2]  )
                        break;
                }
                
                break;
            case 5: //Gabarite uma atividade

                console.log(listQuestion)

                var sucess = true;
                var index = 0;
                var activity = {};
                var activityArray = [];

                listQuestion.forEach(item => {
                    index++                    
                    activity.activity_id = parseInt(listQuestion[0].activity_id);
                    activity.number_question = index;
                    activity.answer = item.right_answer;
                    activityArray.push({...activity});    
                });   

                console.log(JSON.stringify(activityArray))

                APIActivity.Post('/activity/question/users', VG.user_uid, { activity_id: listQuestion[0].activity_id }) //Faz a postagem do cabeçalho da atividade
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

        APIActivity.Get('/activity/' + data.id + '/response', VG.user_uid)
        .then((questions) => {
            setListQuestions(questions.data);
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
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />   
            <View>
                <View>
                    <Modal
                        visible={ModalMenuVisible}
                        style={{ margin: 50 }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18 }}>Selecione uma questão</Text>
                            <FlatList
                                data={listQuestion}
                                style={{  width: '100%', margin: 15 }}
                                renderItem={({ item }) => {return(
                                    <TouchableOpacity 
                                    key={item} 
                                    style={{ backgroundColor: '#878286', padding: 15, margin: 5}}
                                    onPress={() => {
                                        console.log(item);
                                        setModalMenuVisible(false);
                                        Rewarding(item.number_question, Type)
                                    }}
                                    >
                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.number_question} - {item.question}</Text>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 20, marginTop: 0}}>Recompensas Disponíveis</Text>
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
            <RenderActivity data={listQuestion} user={VG.user_uid} navi={navigation}/>    
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
        backgroundColor: '#FFF'
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

    return(
        <View style={{ flex: 1, marginTop: 15}}>            
            <View style={{width: '90%'}}>
                <Text style={style.number_question}>Questão: {item.number_question}</Text>
            </View>                
            <View style={{width: '90%', marginTop: 15, marginBottom: 15}}>
                <Text style={style.question}>{item.question}</Text>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        setIcons('one');
                        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                        .update({
                            response: 'one',
                        })
                        .then()
                        .catch((erro) => {
                            console.log(erro)
                            Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                        }) 

                    }} style={style.button_one}>
                        {icons == 'one' ?
                        <Icon name='checkmark-circle' size={20} style={{color: '#FFF', marginRight: 10}}/> 
                        : null}                            
                        <Text style={style.text_response}>
                            {item.answer_one}
                        </Text>      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIcons('two');
                        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                        .update({
                            response: 'two',
                        })
                        .then()
                        .catch(() => {
                            Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                        }) 
                    }} style={style.button_two}>
                        {icons == 'two' ?
                        <Icon name='checkmark-circle' size={20} style={{color: '#FFF', marginRight: 10}}/> 
                        : null}    
                        <Text style={style.text_response}>
                            {item.answer_two}
                        </Text>                    
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIcons('tree');
                        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                        .update({
                            response: 'tree',
                        })
                        .then()
                        .catch(() => {
                            Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                        }) 
                    }}style={style.button_tree}>
                        {icons == 'tree' ?
                        <Icon name='checkmark-circle' size={20} style={{color: '#FFF', marginRight: 10}}/> 
                        : null}    
                        <Text style={style.text_response}>
                            {item.answer_tree}
                        </Text>                     
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIcons('four');
                        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
                        .update({
                            response: 'four',
                        })
                        .then()
                        .catch(() => {
                            Alert.alert('Erro', 'Ocorreu um erro ao responder essa questão. Tente novamente!');
                        }) 
                    }} style={style.button_four}>
                        {icons == 'four' ?
                        <Icon name='checkmark-circle' size={20} style={{color: '#FFF', marginRight: 10}}/> 
                        : null}    
                        <Text style={style.text_response}>
                            {item.answer_four}
                        </Text>                    
                    </TouchableOpacity>
                </View>
            </ScrollView>  
        </View>                     
    )
}

class RenderActivity extends React.Component {    

    _renderSlides = ({item}) => {   

        firestore().collection('user_activity_' + item.activity_id + '_response_' + VG.user_uid).doc(item.number_question.toString())
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
          renderItem={this._renderSlides}
          onDone={done}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }