import { useEffect, useState } from "react";
import { Alert, BackHandler, Dimensions, FlatList, Image, ScrollView, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import styles from "./style";
import serverUrl from '../utils/serverUrl'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('screen');

export default function Publicar({ navigation }){
    const [nome, setNome] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [dormitorio, setDormitorio] = useState(null);
    const [banheiro, setBanheiro] = useState(null);
    const [capacidade, setCapacidade] = useState(null);
    const [detalhes, setDetalhes] = useState(null);
    const [diaria, setDiaria] = useState(null);    
    const [fotos, setFotos] = useState([])

    //Reabilitar opção de voltar
    const backAction = () => {navigation.goBack(); return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []); 

    const handleChoosePhoto = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        }).then(result => {
            if(!result.canceled){
                setFotos(result.assets);
            }
        }).catch(error => console.log(error));
    };

    const createFormData = (images, body = {}) => {
        const data = new FormData();
        images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}`,
                type: "image/jpeg",
                uri: image.uri
            });
        })
        
        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
    
        return data;
    }
    
    const handleSubmit = async () => {
        if(fotos.length){
            let usuarioId = await AsyncStorage.getItem("usuarioId");
            const colors = ['black','silver','gray','maroon','red','purple','fuchsia','green','lime','olive','navy','blue','cornflowerblue','teal','aqua','darkgreen','darkorange','firebrick']
            let cor = colors[Math.floor(Math.random() * colors.length)]
            await fetch(`${serverUrl}/post`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                },
                body: createFormData(fotos, {
                    nome: nome, 
                    endereco: endereco,
                    dormitorio: dormitorio,
                    banheiro: banheiro,
                    capacidade: capacidade,
                    detalhes: detalhes,
                    diaria: diaria,
                    cor: cor,
                    usuarioId: usuarioId
                })
            })
            .catch(error => console.error(error))
            .then(response => response.json())
            .then(response => {
                if(response.message == 'ok'){
                    Alert.alert('Anúncio publicado!')
                    setTimeout(() => {navigation.pop()}, 3000)
                } else {
                    Alert.alert('Erro ao publicar!')
                }
            });
        } else {
            Alert.alert("Escolha no mínimo uma foto!");
        }
    }


    const renderFotos = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={handleChoosePhoto} style={{width: width*0.8, height: 300}}>
                <Image source={{uri: item.uri}} resizeMode='contain' style={{width: 'auto', height: '100%'}}/>
            </TouchableOpacity>            
        )        
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Publicar</Text>
            </View>            
            <View style={[styles.container, {borderWidth: 1, borderRadius: 5, marginTop: 10}]}>
                {!fotos.length && 
                    <TouchableOpacity
                        style={styles.botaoFotos}
                        onPress={handleChoosePhoto}
                    >
                        <Text style={styles.textoBotaoFotos}>Escolher Fotos</Text>
                    </TouchableOpacity>
                }
                {!!fotos.length &&                        
                    <FlatList
                        data={fotos}
                        renderItem={renderFotos}
                        keyExtractor={item => item.uri}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{height: 300}}
                    />
                }                 
            </View>
            <View style={[styles.container, {marginTop: 10}]}>   
                <TextInput
                    style={styles.textInput}
                    placeholder="Nome da Locação"
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Endereço"
                    onChangeText={setEndereco}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Capacidade de Pessoas"
                    onChangeText={setCapacidade}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Dormitórios"
                    onChangeText={setDormitorio}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Banheiros"
                    onChangeText={setBanheiro}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Detalhes"
                    onChangeText={setDetalhes}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Valor da Diária"
                    onChangeText={setDiaria}
                    keyboardType='numeric'
                />
                <TouchableOpacity
                    style={styles.botaoContinuar}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textoBotao}>Publicar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}