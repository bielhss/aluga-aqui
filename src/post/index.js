import { useEffect, useState } from "react";
import { Alert, BackHandler, Dimensions, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from "./style";
import serverUrl from '../utils/serverUrl';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";

const { width, height } = Dimensions.get('screen');

LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo','Segunda','Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';

export default function Post({ navigation, route }){
    const { id } = route.params;
    const [post, setPost] = useState({});
    const [locador, setLocador] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [diasSelecionados, setDiasSelecionados] = useState({});
    const [diasReservar, setDiasReservar] = useState([]);

    //Reabilitar opção de voltar
    const backAction = () => {navigation.goBack(); return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []); 

    useEffect(() => {
        loadPost()
        verificarLocador()
    },[])

    const verificarLocador = async () => {
        try {
            let id = await AsyncStorage.getItem("usuarioId");
            fetch(`${serverUrl}/verificar_locador`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            .then(response => response.json())
            .then(response => {
                setLocador(response.locador)
            })
            .catch(error => console.error(error))
        } catch(e){
            console.error(e)
        }
    }

    const loadPost = async () => {
        await fetch(`${serverUrl}/post/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            let selectedDays = {}
            response.Reservas.forEach(reserva => {
                selectedDays[reserva.data] = {
                    selected: true, selectedColor: 'red', disabled: true
                }
            })
            setDiasSelecionados(selectedDays);
            setPost(response)
        })
        .catch(error => console.error(error))

    }

    const renderFotos = ({item, index}) => {
        return (
            <View style={{width, height: 400}}>
                <Image source={{uri: `${serverUrl}/images/${item.path}`}} resizeMode='cover' style={{width, height: 400}}/>
                <Text style={styles.imageIndex}>{index + 1} / {post.Fotos.length} </Text>
            </View>            
        )        
        
    }

    const handleDayPress = (day) => {
        var selectedDays = JSON.parse(JSON.stringify(diasSelecionados));
        if(selectedDays[day.dateString]){
            if(selectedDays[day.dateString].selectedColor == 'green'){
                selectedDays[day.dateString] = {
                    selected: false
                }
            } else if(selectedDays[day.dateString].selectedColor != 'red') {
                selectedDays[day.dateString] = {
                    selected: true, selectedColor: 'green'
                }
            }
        } else {
            selectedDays[day.dateString] = {
                selected: true, selectedColor: 'green'
            }
        }
        let selectedDaysFormat = []
        Object.keys(selectedDays).forEach(dia => {
            if(selectedDays[dia].selected && selectedDays[dia].selectedColor == 'green'){
                selectedDaysFormat.push(dia)
            }
        })
        setDiasSelecionados(selectedDays)
        setDiasReservar(selectedDaysFormat);
    }

    const handleSubmit = async () => {
        try {
            let usuarioId = await AsyncStorage.getItem("usuarioId");
            await fetch(`${serverUrl}/reservar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    datas: diasReservar,
                    usuarioId,
                    postId: id
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.message == 'ok'){
                    Alert.alert(
                        'Reserva', 
                        'O local foi reservado para você e o proprietário será notificado!',
                        [{
                            text: "OK",
                            onPress: () => {
                                setModalVisible(false);
                                navigation.pop();
                            }
                        }]
                    );
                }
            })
            .catch(error => console.error(error))
        } catch (e) {
            console.error(e)
        }
        
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                 <FlatList
                    data={post.Fotos}
                    renderItem={renderFotos}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.titulo}>{post.nome}</Text>
                    <View style={styles.infoSection}>
                        <Text style={styles.endereco}><Icon name="star" size={18} /> 4.5 -  {post.endereco}</Text>
                        <Text style={styles.info}>{post.dormitorio} Dormitórios</Text>
                        <Text style={styles.info}>{post.banheiro} Banheiros</Text>
                        <Text style={styles.info}>{post.detalhes}</Text>
                        <Text style={styles.info}>Capacidade: {post.capacidade} pessoas</Text>
                    </View>
                    <View style={[styles.infoSection, {marginVertical: 10}]}>
                        <Text style={{fontSize: 18, marginBottom: 15}}>Disponibilidade</Text>
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={diasSelecionados}
                            style={{elevation: 4}}
                            disableAllTouchEventsForDisabledDays={true}
                        />
                    </View>
                    {post.Usuario && 
                        <View style={{marginTop: 30}}>
                            <Text style={styles.tituloLocador}>Locador: { post.Usuario.nome }</Text>
                            <View style={styles.avatarContainer}>
                                <Image style={styles.avatarImage} source={{uri: `${serverUrl}/images/${post.Usuario.foto}`}}/>
                                <View style={styles.avatarInfo}>
                                    <View style={styles.avatarLineInfo}>
                                        <Icon name="logo-whatsapp" size={20}/>
                                        <Text style={styles.info}>{post.Usuario.whatsapp}</Text>
                                    </View>
                                    <View style={styles.avatarLineInfo}>
                                        <Icon name="logo-facebook" size={20}/>
                                        <Text style={styles.info}>{post.Usuario.facebook}</Text>
                                    </View>
                                    <View style={styles.avatarLineInfo}>
                                        <Icon name="star" size={18}/>
                                        <Text style={styles.info}>4.7 - Avaliação do anfitrião</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    
                        <TouchableOpacity
                            style={styles.botaoReservar}
                            onPress={() => {
                                if(diasReservar.length)
                                    setModalVisible(true)
                                else
                                    Alert.alert('Reserva', 'Selecione no mínimo 1 dia para reservar!');
                            }}
                        >
                            <Text style={styles.textoBotao}>RESERVAR</Text>
                        </TouchableOpacity>
                    
                </View>
            </View>
            {modalVisible && 
                <View style={styles.centeredView}>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity 
                            style={styles.centeredView}
                            activeOpacity={1} 
                            onPressOut={() => setModalVisible(false)}
                            >
                            <TouchableOpacity 
                                style={styles.modalView}
                                activeOpacity={1}
                                onPressOut={() => {}}
                                >
                                <Text style={styles.textoModal}>Dias selecionados para reservar:</Text>
                                {diasReservar.map(data => {
                                    return <Text 
                                            style={{fontSize: 18}}
                                            key={data}>
                                                {moment(data).format('DD/MM/YYYY')}
                                            </Text>
                                })}
                                <TouchableOpacity
                                    style={[styles.botaoReservar, {width: '85%', marginTop: 30}]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.textoBotao}>CONFIRMAR</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>
            }
        </ScrollView>
    )
}