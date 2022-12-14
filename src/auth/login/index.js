import { useEffect, useState } from "react";
import { BackHandler, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./style";
import logo from '../../../assets/logo.png'
import serverUrl from '../../utils/serverUrl'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }){
    const [telefone, setTelefone] = useState(null);
    const [senha, setSenha] = useState(null);
    const [telefoneExiste, setTelefoneExiste] = useState(false);
    const [erro, setErro] = useState("");
    
    //Desabilitar opção de voltar
    const backAction = () => {
        // setTelefone('');
        setTelefoneExiste(false);
        return true;
    };
    useEffect(() => {
        // BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []);    

    useFocusEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        const login = async () => {
            const usuarioId = await AsyncStorage.getItem("usuarioId");
            if(usuarioId){
                navigation.navigate('Home');
            } else {
                navigation.navigate("Login");
            }
        }
        login();
    });

    async function verificarTelefone(){
        if(telefone == null || telefone.length == 0){
            setErro("Insira o número de telefone!");
        } else {
            await fetch(`${serverUrl}/verificar_telefone`,{
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value = {
                        telefone: telefone
                    })                    
            })
            .then(response => response.json())
            .then(async (response) => {
                if(response.message == 'login')
                    setTelefoneExiste(true)
                if(response.message == 'signup')
                    navigation.navigate('SignUp', {
                        telefone: telefone
                    })
            });
        }
    }

    async function verificarLogin(){
        if(senha == null || senha.length == 0){
            setErro("Insira a senha!");
        } else {
            await fetch(`${serverUrl}/login`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value = {
                    telefone: telefone,
                    senha: senha
                })
            })
            .then(response => response.json())
            .then(async (response) => {
                if(response.message == 'ok'){
                    await login(response.id.toString())
                } else {
                    setErro("Senha Inválida!")
                }
            })
            .catch(error => console.error(error));
        }
    }

    const login = async (usuarioId) => {
        try {
            await AsyncStorage.setItem('usuarioId', usuarioId);
            navigation.navigate("Home")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.titulo}>Aluga Aqui</Text>
            <Text style={styles.subtitulo}>Entre ou cadastre-se</Text>
            <TextInput
                placeholder="Número de telefone"
                style={styles.textInput}
                keyboardType='phone-pad'
                editable={!telefoneExiste}
                onChangeText={(value) => {
                    if(value.length > 0){
                        setErro("");
                    } else {
                        setErro("Insira o número de telefone!")
                    }
                    setTelefone(value);
                }}
            />  
            {!!telefoneExiste && 
                <>
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={setSenha}
                    />
                </>
            }
            {!!erro && (
                <Text style={styles.mensagemErro}>{erro}</Text>
            )}                      
            <TouchableOpacity
                style={styles.botaoContinuar}
                onPress={() => {
                        if(!telefoneExiste)
                            verificarTelefone()
                        else
                            verificarLogin()
                    }}
                >
                <Text style={styles.textoBotaoContinuar}>Continuar</Text>    
            </TouchableOpacity>
            {!!telefoneExiste &&
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => setTelefoneExiste(false)}
                >
                    <Text style={styles.textoBotaoVoltar}>Voltar</Text>
                </TouchableOpacity>
            }
            <Text style={{color: "#aaa", marginTop: 10}}>ou</Text>
            <TouchableOpacity
                style={styles.botaoAlternativa}
                >
                <View style={styles.iconeBotao}>
                    <Icon size={20} name="mail"/>
                </View>
                <Text style={styles.textoBotaoAlternativa}>Continuar com email</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botaoAlternativa}
                >
                <View style={styles.iconeBotao}>
                    <Icon size={20} name="logo-facebook"/>
                </View>
                <Text style={styles.textoBotaoAlternativa}>Continuar com Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botaoAlternativa}
                >
                <View style={styles.iconeBotao}>
                    <Icon size={20} name="logo-google"/>
                </View>
                <Text style={styles.textoBotaoAlternativa}>Continuar com Google</Text>
            </TouchableOpacity>
        </View>
    );
}