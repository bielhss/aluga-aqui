import { Alert, BackHandler, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react"
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import styles from "./style";
import logo from '../../../assets/logo.png';
import serverUrl from '../../utils/serverUrl'
import moment from "moment/moment";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function SignUp({ route, navigation }){
    const { telefone } = route.params;
    const [nome, setNome] = useState(null);
    const [senha, setSenha] = useState(null);
    const [locador, setLocador] = useState(false);
    const [whatsapp, setWhatsapp] = useState(null);
    const [facebook, setFacebook] = useState(null);
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [showData, setShowData] = useState(false);
    const [imagem, setImagem] = useState(null);

    //Reabilitar opção de voltar
    const backAction = () => {navigation.goBack(); return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []);    

    const onChange = (event, selectedDate) => {
        if(event.type == 'set'){
            const currentDate = selectedDate;
            setDataNascimento(currentDate);
            setShowData(true)
        }
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: dataNascimento,
            onChange,
            mode: currentMode,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleChoosePhoto = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).then(result => {
            if(!result.canceled){
                setImagem(result.assets[0]);
            }
        }).catch(error => console.error(error));
    };

    const createFormData = (image, body = {}) => {
        const data = new FormData();
        data.append('image', {
            name: "image",
            type: "image/jpeg",
            uri: image.uri
        });
        
        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        return data;
    }
    
    const handleSubmit = async () => {
        if(nome && senha && showData){
            if((moment(new Date()).diff(dataNascimento, 'years')) >= 18){
                if(imagem){
                    await fetch(`${serverUrl}/signup`, {
                        method: 'POST',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: createFormData(imagem, {
                            nome,
                            telefone,
                            senha,
                            dataNascimento: dataNascimento.toISOString(),
                            locador,
                            whatsapp,
                            facebook
                        })
                    })
                    .catch(error => console.error(error))
                    .then(response => response.json())
                    .then(async (response) => {
                        if(response.id){
                            await login(response.id.toString());     
                        }
                    })
                } else {
                    Alert.alert("Alerta", "Escolha uma foto!");
                }
            } else {
                Alert.alert("Alerta", "Você deve ter 18 anos ou mais para se cadastrar!")
            }
        } else {
            Alert.alert("Alerta","Preencha todos os campos!");
        }
    }

    const login = async (id) => {
        try {
            await AsyncStorage.setItem("usuarioId", id);
            navigation.navigate("Home")
        } catch (e) {
            console.error(e);
        }
    }



    return (
        <ScrollView style={{marginTop: 80}}>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.titulo}>Aluga Aqui</Text>
                <View style={styles.form}>
                    <TouchableOpacity onPress={handleChoosePhoto}>
                        <Image source={imagem != null ? {uri: imagem.uri} : require('../../../assets/fotoUsuario.png')} style={styles.fotoUsuario}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={telefone}                
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nome"
                        onChangeText={setNome}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Data de Nascimento"
                        onPressOut={() => showDatepicker()}
                        value={showData ? moment(dataNascimento).format('DD/MM/YYYY') : ''}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Senha"
                        secureTextEntry={true}
                        onChangeText={setSenha}
                    />
                    <Checkbox.Item 
                        label="Ser Locador" color="#f58634" position="leading"
                        status={locador ? 'checked': 'unchecked'}
                        onPress={() => {
                            setLocador(!locador)
                        }}
                    />
                    {locador && (
                    <View style={{width: '100%'}}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="WhatsApp"
                            onChangeText={setWhatsapp}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Facebook"
                            onChangeText={setFacebook}
                        />
                    </View>
                    )}
                    <TouchableOpacity
                        style={styles.botaoContinuar}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.textoBotaoContinuar}>Continuar</Text>
                    </TouchableOpacity>
                </View>            
            </View>
        </ScrollView>
    )
}