import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import CountryCard from "../components/CountryCard";
import { useCountry } from "../context/countryContext";
import { useAuth } from "../context/authContext";
import type { HomeProps } from "../routes";
import { Platform } from "react-native";

export default function Home({ navigation }: HomeProps) {
    const { logout } = useAuth();
    const { countries, loading, error, listCountries } = useCountry();

    useEffect(() => {
        listCountries();
    }, [])

    const handleLogout = async () => {
        await logout();
    }

    const API_URL = Platform.OS === "android"
        ? "http://10.0.2.2:8000"
        : "http://localhost:8000";

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>InfoPaís</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />

            {loading && <ActivityIndicator size="large" color="#3573E5" style={{ marginTop: 20 }} />}
            {error && <Text style={styles.error}>{error}</Text>}
            {!loading && countries.length === 0 && (
                <Text style={styles.noData}>Aún no hay países registrados</Text>
            )}

            <ScrollView style={styles.list}>
                {countries.map((c) =>
                (
                    <TouchableOpacity
                        key={c.id}
                        onPress={() => (navigation.navigate("countryDetail", { id: c.id }))}
                    >
                        <CountryCard
                            name={c.name}
                            capital={c.capital}
                            population={c.population}
                            // flag={`http://127.0.0.1:8000/storage/${c.flag}`}
                            flag={`${API_URL}/storage/${c.flag}`}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("countryForm", { mode: "create" })} >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    line: {
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    logoutText: {
        fontSize: 16,
        color: "red",
        fontWeight: "600",
    },
    list: {
        flex: 1,
        marginBottom: 80,
    },
    fab: {
        position: "absolute",
        bottom: 25,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#3573E5",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    fabText: {
        color: "#fff",
        fontSize: 33,
        fontWeight: "800",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
    noData: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#666",
    }
});