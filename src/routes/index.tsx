import React from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../view/Home';
import Debug from '../view/Debug';

export type RootStackParamList = {
    home: undefined;
    debug: undefined;
};
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;
export type UserScreenProps = NativeStackScreenProps<RootStackParamList, 'debug'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='home'>
                <Stack.Screen name='home' component={Home}></Stack.Screen>
                <Stack.Screen name='debug' component={Debug}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
