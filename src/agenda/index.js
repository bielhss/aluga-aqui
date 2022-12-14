import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import styles from "./style";
import serverUrl from '../utils/serverUrl'
import { Calendar } from "react-native-calendars";

export default function Agenda({ navigation }){
    const [reservas, setReservas] = useState([]);
    const [diasReservados, setDiasReservados] = useState({});
    const [locaisReservados, setLocaisReservados] = useState([]);
    const colors = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua']

    useEffect(() => {
        navigation.removeListener('focus', false);
        navigation.addListener('focus', () => {
            loadReservas()
        })
    }, [navigation])

    const loadReservas = async () => {
        try {
            let usuarioId = await AsyncStorage.getItem("usuarioId");
            await fetch(`${serverUrl}/reservas/${usuarioId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                let locaisReservados = [...new Set(response.map(item => item.Post.nome))]
                locaisReservados = locaisReservados.map((nome) => {
                    let item = response.find(item => item.Post.nome == nome)
                    let cor = item.Post.cor
                    let status = item.status
                    return { nome, cor, status };
                })
                setLocaisReservados(locaisReservados)
                let selectedDays = {}
                response.forEach((reserva) => {
                    selectedDays[reserva.data] = {
                        selected: true, selectedColor: reserva.Post.cor
                    }
                })
                setDiasReservados(selectedDays)
                setReservas(response)
            })
            .catch(error => console.error(error))
        } catch(e){
            console.error(e)
        }
    }

    const Agenda = () => {
        return (
            <View>
                <Text style={styles.titulo}>Agenda</Text>
                <Calendar 
                    markedDates={diasReservados}
                    style={styles.calendar}
                />
            </View>
        )
    }

    const renderAgenda = ({item}) => {
        return (
            <Text style={[styles.localNome, {backgroundColor: `${item.cor}`}]}>
                {item.nome} {!item.status && <Text style={{color: '#999', fontStyle: 'italic'}}>(Pendente)</Text>}
            </Text>
        )
    }

    return (
            <FlatList
                ListHeaderComponent={Agenda}
                data={locaisReservados}
                renderItem={renderAgenda}
                keyExtractor={item => item.nome}
                style={styles.container}
        />
    )
}