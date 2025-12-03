import React from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../view/Home';
import LoginView from '../view/LoginView';
import RegisterView from '../view/RegisterView';
import CountryForms from '../view/CountryForms';
import CountryDetails from '../view/CountryDetails';
import { useAuth } from '../context/authContext';

export type RootStackParamList = {
    home: undefined;
    debug: undefined;
    login: undefined;
    register: undefined;
    countryForm: { mode: 'create' | 'edit'; id?: number };
    countryDetail: { id: number };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'home'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'login'>;
export type RegisterProps = NativeStackScreenProps<RootStackParamList, 'register'>;
export type CountryFormsProps = NativeStackScreenProps<RootStackParamList, 'countryForm'>;
export type CountryDetailsProps = NativeStackScreenProps<RootStackParamList, 'countryDetail'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const { user, loading } = useAuth();
    if (loading) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {user ? (
                    <>
                        <Stack.Screen name="home" component={Home} />
                        <Stack.Screen name="countryForm" component={CountryForms} />
                        <Stack.Screen name="countryDetail" component={CountryDetails} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="login" component={LoginView} />
                        <Stack.Screen name="register" component={RegisterView} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
