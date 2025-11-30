import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function RegisterView() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>InfoPaís</Text>
            <Text style={styles.subtitle}>Login</Text>

            <View style={styles.line} />

            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={name}
                onChangeText={setName} />

            <TextInput
                placeholder="Apellido"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName} />

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none" />

            <TextInput
                placeholder="Teléfono"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric" />

            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword} />

            <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.link}>¿Ya tienes una cuenta?</Text>
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