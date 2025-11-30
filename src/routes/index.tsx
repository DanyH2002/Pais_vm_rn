import React from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../view/Home';
import Debug from '../view/Debug';
import LoginView from '../view/LoginView';
import RegisterView from '../view/RegisterView';
import CountryForms from '../view/CountryForms';
import CountryDetails from '../view/CountryDetails';

export type RootStackParamList = {
    home: undefined;
    debug: undefined;
    login: undefined;
    register: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;
export type DebugScreenProps = NativeStackScreenProps<RootStackParamList, 'debug'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'register'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen name='login' component={LoginView}></Stack.Screen>
                <Stack.Screen name='register' component={RegisterView}></Stack.Screen>
                <Stack.Screen name='home' component={Home}></Stack.Screen>
                <Stack.Screen name='debug' component={Debug}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
