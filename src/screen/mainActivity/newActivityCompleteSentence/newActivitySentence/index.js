import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, ScrollView, Alert, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import VG from '../../../../components/variables/VG';
import MainService from '../../../../services/mainService/mainService';
import LottieFinishBlue from '../../../../components/lotties/finishBlue';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModuleStorage from '../../../../services/storage';

export default function newActivitySentence({ navigation, route }) {    
    const { itens, title, pass, type, objImage } = route.params;
    const [activity, setActivity] = useState({})
    const [end, setEnd] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    var slide = [];

    useEffect(() => {
        switch(type){
            case 1:
                setActivity({ main_color: '#008000'})
                break;  
            case 2:
                setActivity({ main_color: '#D2691E'})
                break;  
        }
    }, [])

    function FinishEnd(){
        var data_image = {}
        setLoadingSend(true);
        firestore()
        .collection('user_activity_build_' + VG.user_uid)
        .get()
        .then(async querySnapshot => {

            if(querySnapshot.size < itens){
                Alert.alert('Atenção', 'Para concluir a criação da atividade, antes conclua as questões.');
                setLoadingSend(false);
                return;
            }

            if (objImage.assets[0].fileName) {
                await ModuleStorage.SendFileStorage('activity/image/' + objImage.assets[0].fileName, objImage.assets[0].uri)
                    .then(async () => {
                        await ModuleStorage.GetFileStorage('activity/image/' + objImage.assets[0].fileName)
                            .then((value) => {

                                data_image = {
                                    image_reference: 'activity/image/' + objImage.assets[0].fileName,
                                    image_url: value,
                                    image_type: objImage.assets[0].type,
                                    image_size_wh: objImage.assets[0].width + '|' + objImage.assets[0].height,
                                }

                            })
                            .catch((error) => {
                                setLoadingSend(false);
                                console.log(error)
                                return;
                            })
                    })
                    .catch((imageUrlError) => {
                        setLoadingSend(false);
                        console.log(imageUrlError)
                        return;
                    })
            }

            let data_header = {
                title: title,
                password: !pass ? "" : pass,
                type_activity: 'questions',
                image_reference: !data_image ? '' : data_image.image_reference,
                image_url: !data_image ? '' : data_image.image_url,
                image_type: !data_image ? '' : data_image.image_type,
                image_size_wh: !data_image ? '' : data_image.image_size_wh
            }

            MainService.Post('/activity', VG.user_uid, data_header)
            .then((response) => {
                querySnapshot.forEach(documentSnapshot => {
                    const obj_f = documentSnapshot.data()

                    let data_answer = {
                        activity_id: parseInt(response.data.id),
                        number_sentence: parseInt(obj_f.number_sentence), 
                        complete_sentence: obj_f.complete_sentence,
                        marked_sentence: obj_f.marked_sentence,
                        hidden_words: obj_f.hidden_words,
                        words_help: obj_f.words_help == '' ? '0' : obj_f.words_help
                    }

                    MainService.Post('/activity/sentences', VG.user_uid, data_answer)
                    .then((response) => {
        
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoadingSend(false);
                        Alert.alert('Erro', 'Ocorreu um problema ao criar uma frase da atividade', [{text: 'Ok',style: 'destructive', }]);
                    })                     
                });               
                setEnd(true);
            })
            .catch((error) => {
                console.log(error);
                setLoadingSend(false);
                Alert.alert('Erro', 'Ocorreu um problema ao criar a atividade', [{text: 'Ok',style: 'destructive', }]);
            })            
        })
        .catch(() => {
            Alert.alert('Erro', 'Ocorreu um erro ao concluir a atividade. Tente novamente!')
            setLoadingSend(false);
        });

        setLoadingSend(false);
    }
    
        
    for(let i = 0; i < itens; i++){   
        const [showModal, setShowModal] = useState(true);
        const [palavra, setPalavra] = useState('');
        const [palavra_escolhida, setPalavra_escolhida] = useState('');
        const [palavra_separada, setPalavra_separada] = useState(null);
        const [palavra_espaco, setPalavra_espaco] = useState(null);
        const [palavra_pronta, setPalavraPronta] = useState(null); //Esta hook vai ser usada para salvar no banco
        const [isLoading, setIsLoading] = useState(false);
        const [help, setHelp] = useState('');
        
        useEffect(async () => {
            await excluirSalvos()
        }, [])

        const storesLetter = async (value) => {
            try {
              await AsyncStorage.setItem('@storesLetter_' + i, value)
            } catch (e) {
              
            }
        }   
        
        const readLetter = async () => {
            try {
                const value = await AsyncStorage.getItem('@storesLetter_' + i)
                if(value !== null) {
                    setPalavra_escolhida(value.toString())
                    return value;
                }
            } catch(e) {
                console.log(e)
            }
        }
        
        const Finish = async () => {
            var marked = [];
            var sPalavras = '';
            var aPalavras = await readLetter();
            marked = aPalavras.split(';');

            if(palavra == ''){
                Alert.alert('Atenção', 'Informe a frase desejada.')
                return;
            }

            if(marked.length == 0){
                Alert.alert('Atenção', 'Selecione ao menos uma palavra para ocultar.')
                return;
            }

            sPalavras = palavra;
            marked.forEach((item) => {
                sPalavras = sPalavras.replace(item, '??')
            })

            let obj = {
                number_sentence: i + 1,
                complete_sentence: palavra,
                marked_sentence: sPalavras,
                hidden_words: aPalavras,
                words_help: help.trim()
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

        const GeraPalavra = async () => {
            await excluirSalvos()
            setPalavra_separada(palavra.split('??'));
            setPalavra_espaco(palavra.split(' '));
        }    
        
        const oculta_palavra = async (palav) => {
            setIsLoading(true);
            try {
                const value = await AsyncStorage.getItem('@storesLetter_' + i)
                if(value !== null) {

                    if(value.split(';').length / 2 >= palavra_espaco.length / 2){
                        Alert.alert('Atenção', 'A quantidade de palavras ocultas não pode ser metade ou maior que a quantidade total de palavras na frase.')
                        return;
                    }

                    console.log(value.split(';').length / 2)
                    console.log(value.split(';').length / 2)
                    console.log('--------------------------')

                    storesLetter(value + ";" + palav)
                }else{
                    storesLetter(palav)
                }
                setPalavraPronta(palavra.replace(palav, '??'))
                await readLetter()
            } catch(e) {
                
            }
    
            setIsLoading(false);
            //GeraPalavra();

        }

        const verSalvo = async () => {
            try {
                const value = await AsyncStorage.getItem('@storesLetter_' + i)
                if(value !== null) {
                    Alert.alert('Teste', value.toString())
                }
            } catch(e) {
                console.log(e)
            }
        }

        const excluirSalvos = async () => {
            try {
                const value = await AsyncStorage.removeItem('@storesLetter_' + i)
                setPalavra_escolhida(null);
            } catch(e) {
                console.log(e)
            }
        }
        
        slide.push(
            <View key = {i + 1} style={{  backgroundColor: '#FFF', padding: 5, margin: 10, borderRadius: 15}}>        
               {
                   !showModal ?                    
                   <View style={{padding: 12, flexDirection: 'row'}}>
                       <Text style={{fontWeight: 'bold',}}>Frase {i + 1}:  Concluida </Text>
                       <View style={{alignItems: 'flex-end'}}>
                            <FontAwesome5 name='check-double' size={20} style={{color: '#008000'}}/>
                       </View>                       
                   </View>
                   :
                <View style={{ width: '100%', padding: 10}}>
                    <View style={{ flexDirection: 'row', width: '100%'}}>
                        <View style={{ width: '85%'}}>
                            <Text style={{ fontWeight: 'bold'}}>Frase: {i + 1}</Text>
                        </View>
                        {
                            !isLoading ? null :
                            <View style={{ width: '15%'}}>
                                <ActivityIndicator size="large" color="green" />  
                            </View>
                        }
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '100%'}}>
                        <View style={{ width: '85%'}}>
                            <TextInput label='Digite a frase' style={style.inputs} placeholder='Digite a frase' onChangeText={(value) => setPalavra(value)}/> 
                        </View>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={style.buttonPencil} onPress={GeraPalavra}>
                                <Icon name='pencil' style={{ color: '#FFF' }} size={30}/>
                            </TouchableOpacity>
                        </View>                                                                          
                    </View>                    
                    {/* Lista abaixo serve para exibir as palavras que podem ser ocultas */ }
                    <FlatList 
                        data={palavra_espaco} 
                        style={{ margin: '5%'}}
                        keyExtractor={item => item.id} 
                        numColumns={4} 
                        renderItem={({ item }) => {
                            return (
                                <Animatable.View animation='rubberBand' duration={2000} key={item.id}>
                                    {        
                                        /* Se for a primeira inserção não verifica os itens*/
                                        !palavra_escolhida ? 
                                        <TouchableOpacity onPress={() => oculta_palavra(item)} style={{ backgroundColor: 'green', padding: 10, margin: 5, borderRadius: 10 }} >
                                            <Text style={{ color: '#FFF'}}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity> 
                                        : /* Como aqui já conterá itens então precisa verificar */         
                                        ((palavra_escolhida.split(';').indexOf(item) > -1) || (item == '??'))? null :
                                        <TouchableOpacity onPress={() => oculta_palavra(item)} style={{ backgroundColor: 'green', padding: 10, margin: 5, borderRadius: 10 }} >
                                            <Text style={{ color: '#FFF'}}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity> 
                                    }                        
                                </Animatable.View>                    
                            );
                        }} 
                    />  
                    <View>
                        <TextInput label='Palavras de ajuda (opcional)' style={style.inputs} placeholder='Digite as palavras' onChangeText={(value) => setHelp(value)}/>  
                    </View>                 
                    <TouchableOpacity onPress={Finish} style={{ 
                        backgroundColor: activity.main_color, 
                        borderRadius: 15, 
                        padding: 15, 
                        alignItems: 'center',
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10,
                    }}>
                        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Concluir está Frase</Text>
                    </TouchableOpacity> 

                    {/* O botão abaixo é para teste, precisa ser tirado quando terminar */}
                </View>  
            }
            </View>
        )
    }
    
    return(
        <View style={style.container}>
            <StatusBar barStyle='light-content' backgroundColor='#D2691E' /> 
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
                        {
                            loadingSend 
                            ? <ActivityIndicator size="large" color="white" />
                            : <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>Concluir a Atividade</Text>
                        }  
                    </TouchableOpacity>
                </View>                
                
            </ScrollView>   

            {!end ? null :
            <View style={{flex: 1, position: 'absolute', backgroundColor: '#394FBC', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <StatusBar barStyle='light-content' backgroundColor='#394FBC' /> 
                <Animatable.Text animation='fadeInUpBig' duration={1000} style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
                    Atividade criada!
                </Animatable.Text>
                <View>                    
                    <LottieFinishBlue />
                </View>
            </View>                
            }    
        </View>        
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2691E',
    }, 
    inputs:{
        backgroundColor: '#FFF',
        borderRadius: 15,
        margin: 3,
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
    buttonPencil: {
        backgroundColor: '#D2691E',
        padding: 10,
        marginTop: '40%',
        borderRadius: 15
    },  
})