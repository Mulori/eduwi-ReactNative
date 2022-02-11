import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../../components/variables/VG';

export default function newActivityQuestions({ navigation, route }) {    
    const { itens } = route.params;
    var slide = [];
    const _questions = [];

    function FinishEnd(){
        
        firestore()
        .collection('user_activity_build_' + VG.user_uid)
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot.size)
            if(querySnapshot.size < itens){
                Alert.alert('Atenção', 'Para concluir a criação da atividade, antes conclua as questões.');
                return;
            }

            querySnapshot.forEach(documentSnapshot => {
                console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            });
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao concluir a atividade. Tente novamente!')
        });

    }
    
        
    for(let i = 0; i < itens; i++){   
        const [showModal, setShowModal] = useState(true);
        const [Doubt, setDoubt] = useState(null);
        const [ResponseOne, setResponseOne] = useState(null);
        const [ResponseTwo, setResponseTwo] = useState(null);
        const [ResponseTree, setResponseTree] = useState(null);
        const [ResponseFour, setResponseFour] = useState(null);
        const [checked, setChecked] = React.useState('first');  
        
        function Finish(value, Doubt, ResponseOne, ResponseTwo, ResponseTree, ResponseFour, checked){
            
            if(!Doubt || !ResponseOne || !ResponseTwo || !ResponseTree || !ResponseFour || !checked || !value){
                Alert.alert('Atenção', 'Preencha todos os campos!');
                return;
            }

            let obj = {
                number_question: value.toString(),
                question: Doubt,
                responseOne: ResponseOne,
                responseTwo: ResponseTwo,
                responseTree: ResponseTree,
                responseFour: ResponseFour,
                question_correcty: checked
             }
    
            firestore().collection('user_activity_build_' + VG.user_uid).add(obj)
            .then(() => {
                setShowModal(false);
            })
            .catch((erro) => {
                console.log(erro)
                Alert.alert('Erro', 'Ocorreu um erro ao concluir a questão. Tente novamente!');
                return;
            })        
        }
          
        
        slide.push(
            <View key = {i + 1} style={{  backgroundColor: '#FFF', padding: 5, margin: 10, borderRadius: 15}}>        
               {
                   !showModal ? 
                   
                   <View style={{padding: 12, flexDirection: 'row'}}>
                       <Text style={{fontWeight: 'bold',}}>Questão {i + 1}:  Concluida </Text>
                       <View style={{alignItems: 'flex-end'}}>
                            <Icon name='check-double' size={20} style={{color: '#008000'}}/>
                       </View>                       
                   </View>

                   :
                <View style={{ width: '100%', padding: 10}}>
                   <Text>Questão: {i + 1}</Text>
                   <Text style={{marginTop: 5, fontWeight: 'bold'}}>Pergunta:</Text>   
                   <View style={{backgroundColor: 'black', borderRadius: 15, margin: 5}}>
                       <TextInput style={style.inputs} multiline placeholder='Digite a questão desejada' onChangeText={(value) => setDoubt(value)}/> 
                   </View> 
                   <Text style={{marginTop: 5, fontWeight: 'bold'}}>Respostas:</Text>  
                   <View>
                       <View style={{backgroundColor: 'red', borderRadius: 15, margin: 5, flexDirection: 'row'}}>
                           <TextInput style={style.inputsResponse} multiline placeholder='Insira uma resposta' onChangeText={(value) => setResponseOne(value)}/>
                           <RadioButton
                               value="one"
                               status={ checked === 'first' ? 'checked' : 'unchecked' }
                               onPress={() => setChecked('first')}
                               style={style.radioQuestion}
                           />
                       </View>
                       <View style={{backgroundColor: 'blue', borderRadius: 15, margin: 5, flexDirection: 'row'}}>
                           <TextInput style={style.inputsResponse} multiline placeholder='Insira uma resposta' onChangeText={(value) => setResponseTwo(value)}/>
                           <RadioButton
                               value="two"
                               status={ checked === 'two' ? 'checked' : 'unchecked' }
                               onPress={() => setChecked('two')}
                               style={style.radioQuestion}
                           />
                       </View>
                       <View style={{backgroundColor: 'green', borderRadius: 15, margin: 5, flexDirection: 'row'}}>
                           <TextInput style={style.inputsResponse} multiline placeholder='Insira uma resposta' onChangeText={(value) => setResponseTree(value)}/>
                           <RadioButton
                               value="tree"
                               status={ checked === 'tree' ? 'checked' : 'unchecked' }
                               onPress={() => setChecked('tree')}
                               style={style.radioQuestion}
                           />
                       </View>
                       <View style={{backgroundColor: 'orange', borderRadius: 15, margin: 5, flexDirection: 'row'}}>
                           <TextInput style={style.inputsResponse} multiline placeholder='Insira uma resposta' onChangeText={(value) => setResponseFour(value)}/>
                           <RadioButton
                               value="four"
                               status={ checked === 'four' ? 'checked' : 'unchecked' }
                               onPress={() => setChecked('four')}
                               style={style.radioQuestion}
                           />
                       </View>
                   </View>
                   <TouchableOpacity onPress={() => Finish(i + 1, Doubt, ResponseOne, ResponseTwo, ResponseTree, ResponseFour, checked)} style={{ 
                        backgroundColor: '#008000', 
                        borderRadius: 15, 
                        padding: 15, 
                        alignItems: 'center',
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10,
                    }}>
                        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Concluir a Questão</Text>
                    </TouchableOpacity> 
                </View>  
            }
            </View>
        )
    }
    
    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#008000' /> 
            <ScrollView>
                { slide }
                <View>
                    <TouchableOpacity 
                    onPress={FinishEnd}
                    style={{
                        backgroundColor: '#32CD32', 
                        padding: 15, 
                        marginTop: 20, 
                        marginLeft: 10, 
                        marginRight: 10, 
                        borderRadius: 15,
                        marginBottom: 15,
                        alignItems: 'center',
                    }}>
                        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>Concluir a Atividade</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>       
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008000',
    }, 
    inputs:{
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
        margin: 5,
    },
    inputsResponse:{
        backgroundColor: '#FFF',
        color: '#000',
        padding: 10,
        borderRadius: 15,
        margin: 5,
        width: '85%'
    },
    radioQuestion: {
        color: '#FFF'
    },
})