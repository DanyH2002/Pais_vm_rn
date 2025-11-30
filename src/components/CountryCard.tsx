import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    name: string;
    capital: string;
    population: string;
    flag: string;
};

export default function CountryCard({ name, capital, population, flag }: Props) {
    return (

        <View style={styles.card}>
            <Image
                source={{ uri: flag }}
                style={styles.flag}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.subText}>Capital: {capital}</Text>
                <Text style={styles.subText}>Población: {population}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 14,
        marginBottom: 12,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    flag: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 16,
        backgroundColor: "#f0f0f0",
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
        marginBottom: 6,
    },
    subText: {
        fontSize: 15,
        color: "#666",
        marginBottom: 2,
    }
});