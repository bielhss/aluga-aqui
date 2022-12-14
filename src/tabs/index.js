import React, { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { BackHandler  } from 'react-native';

import Home from "../home";
import Perfil from '../perfil';
import Agenda from '../agenda';

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}) {

    //Desabilitar opção de voltar
    const backAction = () => {return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {fontSize: 14},
                tabBarActiveTintColor: '#f58634',
                tabBarActiveBackgroundColor: '#fff',
                tabBarInactiveBackgroundColor: '#fff',
            }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="search" color={color} size={30} />
                    )
                }}
                name="Buscar" 
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="calendar" color={color} size={30} />
                    )
                }}
                name="Agenda" 
                component={Agenda}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="person-circle-outline" color={color} size={30} />
                    )
                }}
                name="Perfil" 
                component={Perfil}
            />
        </Tab.Navigator>
    )
}