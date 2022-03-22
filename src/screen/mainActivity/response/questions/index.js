import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, ScrollView, ActivityIndicator, Modal } from 'react-native';
import APIActivity from '../../../../services/activityService/activityService';
import VG from '../../../../components/variables/VG';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {NavigationActions, StackActions} from '@react-navigation/native';


export default function responseQuestion({ navigation, route }) {
    const { data } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [listQuestion, setListQuestions] = useState([]);

    useEffect(() => {

        setModalVisible(true);

        APIActivity.Get('/activity/' + data.id + '/response', VG.user_uid)
        .then((questions) => {
            setListQuestions(questions.data);
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
})

function ListResponse(props){
    const [icons, setIcons] = useState(null);
    const [item, setItem] = useState(props.item);

    return(
        <View style={{ flex: 1, }}>
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