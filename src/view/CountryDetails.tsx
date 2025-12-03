import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCountry } from "../context/countryContext";
import { useAuth } from "../context/authContext";
import type { CountryDetailsProps } from "../routes";

export default function CountryDetails() {
    const route = useRoute<CountryDetailsProps["route"]>();
    const navigation = useNavigation<CountryDetailsProps["navigation"]>();
    const { id } = route.params;

    const { selectedCountry, getCountry, deleteCountry } = useCountry();
    const { user } = useAuth();

    useEffect(() => {
        getCountry(id);
    }, [id]);

    if (!selectedCountry) {
        return (
            <View style={styles.center}>
                <Text>Cargando país...</Text>
            </View>
        );
    }

    const country = selectedCountry;

    const canEdit = user && country.user_id === user.id;

    const handleDelete = () => {
        Alert.alert(
            "Eliminar país",
            "¿Estás seguro de eliminar este país?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        const ok = await deleteCountry(country.id);
                        if (ok) navigation.goBack();
                    }
                }
            ]
        )
    }

    const LabelValue = ({ label, value }: { label: string; value?: any }) => (
        <>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value ?? "—"}</Text>
        </>
    )

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>InfoPaís</Text>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>◀ Volver</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <Text style={styles.countryName}>{country.name}</Text>

            <Image
                source={{ uri: "http://127.0.0.1:8000/storage/" + country.flag }}
                style={styles.flag}
            />

            <View style={styles.card}>
                <LabelValue label="Nombre oficial" value={country.official_name} />
                <LabelValue label="Capital" value={country.capital} />
                <LabelValue label="Presidente" value={country.president} />
                <LabelValue label="Población" value={country.population} />
                <LabelValue label="Tamaño" value={`${country.size} km²`} />
                <LabelValue label="Continente" value={country.continent?.name} />
                <LabelValue label="Idioma" value={country.language?.name} />
                <LabelValue label="Moneda" value={country.currency?.name} />
            </View>

            {canEdit && (
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() =>
                            navigation.navigate("countryForm", {
                                mode: "edit",
                                id: country.id
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
        padding: 60,
        backgroundColor: "#ffffffe3",
        paddingBottom: 90,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 10,
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
        height: 150,
        borderRadius: 10,
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
    backButton: {
        position: "absolute",
        left: 20,
        top: 50,
        padding: 8,
    },
    backText: {
        fontSize: 18,
        color: "#3573E5",
        fontWeight: "600",
    }
});