import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { useAuth } from '../context/authContext';
import { LoginProps } from '../routes';

export default function LoginView({ navigation }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        const ok = await login(email, password);
        if (!ok) {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    }

    const goToRegister = () => {
        navigation.navigate('register');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>InfoPaís</Text>
            <Text style={styles.subtitle}>Login</Text>

            <View style={styles.line} />

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none" />

            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry value={password}
                onChangeText={setPassword} />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToRegister}>
                <Text style={styles.link}>¿No tienes cuenta?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
    },
    line: {
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 25,
    },
    input: {
        backgroundColor: "#F2F2F2",
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#3573E5",
        paddingVertical: 14,
        borderRadius: 30,
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#cccccc",
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    link: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#000",
    }
});