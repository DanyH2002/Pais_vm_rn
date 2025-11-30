import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import type { Country } from "../types/Country";

type Props = {
    country: Country;
};

function LabelValue({ label, value }: { label: string; value?: any }) {
    return (
        <>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value ?? "—"}</Text>
        </>
    );
}

export default function CountryDetails({ country }: Props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.mainTitle}>InfoPaís</Text>
            <View style={styles.line} />

            <Text style={styles.countryName}>{country.name}</Text>

            <Image source={{ uri: country.flag }} style={styles.flag} />

            <View style={styles.card}>
                <LabelValue label="Nombre oficial" value={country.official_name} />

                <LabelValue label="Capital" value={country.capital} />

                <LabelValue label="Presidente" value={country.president} />

                <LabelValue
                    label="Población"
                    value={country.population?.toLocaleString()}
                />

                <LabelValue label="Tamaño" value={`${country.size} km²`} />

                <LabelValue label="Continente" value={country.continent?.name} />

                <LabelValue label="Idioma" value={country.language?.name} />

                <LabelValue label="Moneda" value={country.currency?.name} />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.editButton]}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: "#fff",
        paddingBottom: 90,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 5,
    },
    line: {
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 25,
    },
    countryName: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
        color: "#444",
        fontWeight: "500",
    },
    flag: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 25,
    },
    card: {
        backgroundColor: "#F9F9F9",
        padding: 18,
        borderRadius: 12,
        marginBottom: 30,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 10,
        color: "#333",
    },
    value: {
        fontSize: 16,
        color: "#555",
        marginTop: 2,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 25,
        marginHorizontal: 6,
    },
    editButton: {
        backgroundColor: "#3573E5",
    },
    deleteButton: {
        backgroundColor: "#E53535",
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});