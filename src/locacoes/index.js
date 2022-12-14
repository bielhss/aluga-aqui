import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./style";
import serverUrl from '../utils/serverUrl'
import moment from "moment/moment";
import Icon from "react-native-vector-icons/Ionicons";

export default function Locacoes({ navigation }){
    const [locacoes, setLocacoes] = useState([]);

    //Reabilitar opção de voltar
    const backAction = () => {navigation.goBack(); return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []); 

    useEffect(() => {
        loadLocacoes();
    }, [])

    const loadLocacoes = async () => {
        try {
            let usuarioId = await AsyncStorage.getItem("usuarioId");
            await fetch(`${serverUrl}/locacoes/${usuarioId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                setLocacoes(response)
            })
            .catch(error => console.error(error))
        } catch(e){
            console.error(e)
        }
    }

    const confirmaReserva = async (id) => {
        await fetch(`${serverUrl}/reserva/confirm`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(response => response.json())
        .then(async (response) => {
            await loadLocacoes()
        })
        .catch(error => console.error(error))
    }

    const deleteReserva = async (id) => {
        await fetch(`${serverUrl}/reserva/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(response => response.json())
        .then(async (response) => {
            await loadLocacoes()
        })
        .catch(error => console.error(error))
    }

    const Header = () => {
        return (
            <View>
                <Text style={styles.titulo}>Minhas Locações</Text>
            </View>
        )
    }

    const renderLocacoes = ({item}) => {
        const imagePath = `${serverUrl}/images/${item.Fotos[0].path}`;
        return (
            <View style={styles.locacaoContainer}>
                <View style={styles.locacaoHeader}>
                    <Image source={{uri: imagePath}} style={styles.locacaoFoto}/>
                    <View style={styles.locacaoInfoContainer}>
                        <Text style={styles.locacaoTitulo}>{item.nome}</Text>
                        <Text>{item.endereco}</Text>
                        <Text>R${item.diaria}/dia</Text>
                    </View>
                </View>
                {!!item.Reservas.length && 
                    <View>
                        <Text style={styles.locacaoLocadores}>Locadores</Text>
                        <View style={styles.locacaoBody}>
                            {item.Reservas.sort((a,b) => {return new Date(a.data) - new Date(b.data)}).map(reserva => {
                                const imagePath = `${serverUrl}/images/${reserva.usuarioId.foto}`;
                                return (
                                    <View key={reserva.id} style={styles.locacaoBodyItem}>
                                        <Image source={{uri: imagePath}} style={styles.locacaoBodyItemFoto}/>
                                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                            <View style={styles.locacaoBodyItemInfo}>
                                                <Text style={styles.locacaoBodyItemTexto}>{reserva.usuarioId.nome}</Text>
                                                <Text style={styles.locacaoBodyItemTexto}>{reserva.usuarioId.telefone}</Text>
                                                <Text style={styles.locacaoBodyItemTexto}>{moment(reserva.data).format('DD/MM/YYYY')}</Text>
                                            </View>
                                            <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
                                                {!reserva.status && 
                                                    <TouchableOpacity style={{alignItems: 'center'}}
                                                        onPress={() => {
                                                            Alert.alert(
                                                                'Reserva', 
                                                                `Certeza que deseja confirmar a reserva de ${reserva.usuarioId.nome} - ${moment(reserva.data).format('DD/MM/YYYY')}?`,
                                                                [
                                                                    {
                                                                        text: "Recusar",
                                                                        onPress: () => deleteReserva(reserva.id)
                                                                    },
                                                                    {
                                                                        text: "Confirmar",
                                                                        onPress: () => confirmaReserva(reserva.id)
                                                                    }
                                                                ]    
                                                            )
                                                        }}
                                                    >
                                                        <Icon name="checkmark-circle" size={20} color='green'/>
                                                        <Text style={{fontWeight: '600'}}>Confirmar</Text>
                                                    </TouchableOpacity>
                                                }
                                                {!!reserva.status &&
                                                    <TouchableOpacity style={{alignItems: 'center'}}
                                                        onPress={() => {
                                                            Alert.alert(
                                                                'Reserva', 
                                                                `Certeza que deseja excluir a reserva de ${reserva.usuarioId.nome} - ${moment(reserva.data).format('DD/MM/YYYY')}?`,
                                                                [
                                                                    {
                                                                        text: "Cancelar",
                                                                    },
                                                                    {
                                                                        text: "OK",
                                                                        onPress: () => deleteReserva(reserva.id)
                                                                    }
                                                                ]    
                                                            )
                                                        }}
                                                    >
                                                        <Icon name="trash" size={20} color='red'/>
                                                        <Text style={{fontWeight: '600'}}>Excluir</Text>                                                        
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                }
            </View>
        )
    }

    return (
        <FlatList 
            ListHeaderComponent={Header}
            data={locacoes}
            renderItem={renderLocacoes}
            style={styles.container}
        />
    )
}