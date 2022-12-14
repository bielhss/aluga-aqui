import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./style";
import serverUrl from '../utils/serverUrl'
import moment from "moment/moment";

export default function Perfil({ navigation }){

    const [foto, setFoto] = useState(null)
    const [nome, setNome] = useState(null)
    const [nomeDisplay, setNomeDisplay] = useState(null)
    const [telefone, setTelefone] = useState(null)
    const [telefoneDisplay, setTelefoneDisplay] = useState(null)
    const [locador, setLocador] = useState(null)
    const [facebook, setFacebook] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [infoVisible, setInfoVisible] = useState(null)
    const [dataNascimento, setDataNascimento] = useState(new Date())
    const [editar, setEditar] = useState(false)
    const [locacoesNovas, setLocacoesNovas] = useState(null);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDataNascimento(currentDate);
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

    useEffect(() => {
        loadUsuario()
    }, [])

    useEffect(() => {
        navigation.removeListener('focus', false);
        navigation.addListener('focus', () => {
            loadLocacoesNovas()
        })
    }, [navigation])

    const loadUsuario = async () => {
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
                setFoto(`${serverUrl}/images/${response.foto}`)
                if(response.nome != "null")
                    setNome(response.nome)
                setNomeDisplay(response.nome)
                setTelefone(response.telefone)
                setTelefoneDisplay(response.telefone)
                let date = new Date(response.dataNascimento)
                date.setDate(date.getDate() + 1)
                setDataNascimento(date)
                if(response.facebook != "null")
                    setFacebook(response.facebook)                
                if(response.whatsapp != "null")
                    setWhatsapp(response.whatsapp)
            })
            .catch(error => console.error(error))
        } catch(e) {
            console.error(e);
        }
    }

    const loadLocacoesNovas = async () => {
        try {
            let id = await AsyncStorage.getItem("usuarioId");
            fetch(`${serverUrl}/reservas/count/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => setLocacoesNovas(response))
            .catch(error => console.error(error))
        } catch(e) {
            console.error(e);
        }
    }

    const handleLogout = async () => {
        try{
            await AsyncStorage.removeItem("usuarioId");
            navigation.popToTop();
        } catch(e) {
            console.error(e);
        }
    }

    const alertLocador = () => {
        Alert.alert(
            'Locador',
            locador ? 'Deseja realmente deixar de ser um Locador?' : 'Deseja realmente se tornar um Locador?',
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "OK",
                    onPress: tornarLocador
                }
            ]    
        )
    }

    const tornarLocador = async () => {
        try {
            let id = await AsyncStorage.getItem("usuarioId");
            await fetch(`${serverUrl}/tornar_locador`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, locador})
            })
            .then(response => response.json())
            .then(response => {
                if(response.message == 'ok')
                    loadUsuario()
            })
            .catch(error => console.error(error))
        } catch(e){
            console.error(e);
        }
    }

    const alterarUsuario = async () => {
        try {
            let id = await AsyncStorage.getItem("usuarioId");
            await fetch(`${serverUrl}/alterar_usuario`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, nome, telefone, dataNascimento, facebook, whatsapp})
            })
            .then(response => response.json())
            .then(response => {
                if(response.message == 'ok')
                    loadUsuario()
            })
            .catch(error => console.error(error))
        } catch(e){
            console.error(e);
        }
    }

    const inputStyle = editar ? styles.inputEnabled : styles.inputDisabled
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil</Text>
            <View style={styles.avatarContainer}>
                <Image source={{uri: foto}} style={styles.avatarImage} />
                <View style={styles.avatarInfo}>
                    <Text style={styles.avatarNome}>{ nomeDisplay }</Text>
                    <Text>{ telefoneDisplay }</Text>
                </View>
            </View>
            <Text style={styles.slogan}>Ganhe dinheiro extra alugando seu espaço</Text>
            <TouchableOpacity
                style={styles.botaoLocador}
                onPress={alertLocador}
            >
                <Text style={styles.textoBotaoLocador}>{locador ? 'Deixar de ser Locador' : 'Seja um Locador'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.botaoInformacao, infoVisible && {backgroundColor: "#ddd"}]}
                onPress={() => setInfoVisible(!infoVisible)}
            >
                <Icon style={styles.iconBotaoInformacao} name="person-circle-outline" size={28} color="#444"/>
                <Text style={styles.textoBotaoInformacao}>Informações Pessoais</Text>
            </TouchableOpacity>
            {!!infoVisible && 
                <View style={styles.infoContainer}>
                    <TextInput 
                        style={[styles.textInput, inputStyle]}
                        placeholder="Nome"
                        editable={editar}
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput 
                        style={[styles.textInput, inputStyle]}
                        placeholder="Telefone"
                        editable={editar}
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                    <TextInput 
                        style={[styles.textInput, inputStyle]}
                        placeholder="Data de Nascimento"
                        editable={editar}
                        onPressOut={() => showDatepicker()}
                        value={moment(dataNascimento).format('DD/MM/YYYY')}
                    />
                    {!!locador && 
                        <>
                            <TextInput 
                                style={[styles.textInput, inputStyle]}
                                placeholder="Facebook"
                                editable={editar}
                                value={facebook}
                                onChangeText={setFacebook}
                            />
                            <TextInput 
                                style={[styles.textInput, inputStyle]}
                                placeholder="WhatsApp"
                                editable={editar}
                                value={whatsapp}
                                onChangeText={setWhatsapp}
                            />
                        </>
                    }                    
                    {!editar &&
                        <TouchableOpacity
                            style={[styles.botaoForm, styles.botaoEditar]}
                            onPress={() => setEditar(true)}
                        >
                            <Text style={styles.textoBotaoForm}>Editar</Text>
                        </TouchableOpacity>
                    }
                    {!!editar &&
                    <View style={styles.grupoBotao}>
                        <TouchableOpacity
                            style={[styles.botaoForm, styles.botaoCancelar]}
                            onPress={() => setEditar(false)}
                        >
                            <Text style={styles.textoBotaoForm}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.botaoForm, styles.botaoSalvar]}
                            onPress={() => {alterarUsuario(); setEditar(false)}}
                        >
                            <Text style={styles.textoBotaoForm}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
            }
            <TouchableOpacity
                style={styles.botaoInformacao}
            >
                <Icon style={styles.iconBotaoInformacao} name="help-circle-outline" size={28} color="#444"/>
                <Text style={styles.textoBotaoInformacao}>Informações do App</Text>
            </TouchableOpacity>
            {!!locador && 
                <TouchableOpacity
                    style={styles.botaoInformacao}
                    onPress={() => navigation.navigate("Locacoes")}
                >
                    <Icon style={styles.iconBotaoInformacao} name="list" size={28} color="#444"/>
                    <Text style={styles.textoBotaoInformacao}>Minhas Locações</Text>
                    {!!locacoesNovas && 
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{ locacoesNovas }</Text>
                        </View>
                    }
                </TouchableOpacity>
            }
            <TouchableOpacity
                style={styles.botaoInformacao}
                onPress={handleLogout}
            >
                <Icon style={styles.iconBotaoInformacao} name="power" size={28} color="#444"/>
                <Text style={styles.textoBotaoInformacao}>Logout</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}