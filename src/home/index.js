import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./style";
import serverUrl from '../utils/serverUrl'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('screen');

export default function Home({ navigation }){
    const [posts, setPosts] = useState([]);
    const [nome, setNome] = useState('');
    const [locador, setLocador] = useState(null);
    
    useEffect(() => {
        loadPosts()
    }, [nome])

    useEffect(() => {
        navigation.removeListener('focus', false);
        navigation.addListener('focus', () => {
            loadPosts()
            verificaLocador()
        })
    }, [navigation])

    const verificaLocador = async () => {
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
        } catch(e) {
            console.error(e);
        }
    }
    
    const loadPosts = async () => {
        fetch(`${serverUrl}/posts/${nome}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => setPosts(response))
        .catch(error => console.error(error))
    }
    
    const BotaoAdd = () => {
        return (
                <TouchableOpacity
                    style={styles.botaoAdd}
                    onPress={() => navigation.navigate("Publicar")}
                >
                    <Icon size={30} name="add" color="#fff"/>
                </TouchableOpacity>
        )
    }

    const renderPosts = ({item}) => {
        const imagePath = `${serverUrl}/images/${item.Fotos[0].path}`;
        return (
            <TouchableOpacity style={styles.card}
                onPress={() => navigation.navigate('Post', {id: item.id})}
            >
                <Image 
                    source={{uri: imagePath}} 
                    style={{width: width*0.9, height: 300, borderRadius: 10}}
                    />    
                <Text style={styles.cardTitulo}>
                    {item.nome}
                </Text>        
                <Text style={styles.cardDescricao}>
                    5km de distância
                </Text>
                <Text style={styles.cardDescricao}>
                    R${item.diaria},00/dia
                </Text>    
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.header}>
                        <View style={styles.headerSearch}>
                            <TextInput 
                                placeholder="Buscar"
                                style={styles.inputSearch}
                                onChangeText={setNome}
                            />
                            <Icon name="search" style={styles.iconSearch}/>
                        </View>
                    </View>}
                data={posts}
                renderItem={renderPosts}
                keyExtractor={post => post.id}
                showsVerticalScrollIndicator={false}
            />
            {locador && <BotaoAdd />}            
        </View>
    )
}