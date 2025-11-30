import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import CountryCard from "../components/CountryCard";

export default function Home() {
    const countries = [
        { id: 1, name: "España", capital: "Madrid", population: "47M" },
        { id: 2, name: "México", capital: "CDMX", population: "126M" },
        { id: 3, name: "Japón", capital: "Tokio", population: "125M" },
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>InfoPaís</Text>
            <ScrollView style={styles.list}>
                {countries.map((c) =>
                (
                    <TouchableOpacity
                        key={c.id}
                        onPress={() => (console.log('Detalles del pais: ', c))}
                    >
                        <CountryCard
                            name={c.name}
                            capital={c.capital}
                            population={c.population}
                            flag={"https://flagcdn.com/w320/es.png"} 
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => console.log('Formulario para crear un pais')} >
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
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
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
});