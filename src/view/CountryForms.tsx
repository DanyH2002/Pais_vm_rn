import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Dropdown from "../components/DropDown";

export default function CountryForms({ route }: any) {
    const country = route?.params?.country || null;
    const isEditing = !!country;

    const [name, setName] = useState("");
    const [officialName, setOfficialName] = useState("");
    const [president, setPresident] = useState("");
    const [capital, setCapital] = useState("");
    const [size, setSize] = useState("");
    const [population, setPopulation] = useState("");

    const [continent, setContinent] = useState("");
    const [language, setLanguage] = useState("");
    const [currency, setCurrency] = useState("");

    const [flag, setFlag] = useState<string | null>(null);

    useEffect(() => {
        if (country) {
            setName(country.name);
            setOfficialName(country.official_name);
            setPresident(country.president);
            setCapital(country.capital);
            setSize(String(country.size));
            setPopulation(String(country.population));
            setContinent(country.continent?.name || "");
            setLanguage(country.language?.name || "");
            setCurrency(country.currency?.name || "");
            setFlag(country.flag || null);
        }
    }, [country]);


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.canceled) {
            setFlag(result.assets[0].uri);
        }
    };

    const validateFields = () => {
        if (
            !name ||
            !officialName ||
            !president ||
            !capital ||
            !size ||
            !population ||
            !continent ||
            !language ||
            !currency ||
            !flag
        ) {
            Alert.alert("Campos incompletos", "Todos los campos son obligatorios.");
            return false;
        }
        return true;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.title}>InfoPaís</Text>
                <View style={styles.line} />

                <Text style={styles.subTitle}>
                    {isEditing ? country.name : "Nuevo país"}
                </Text>
            </View>

            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={name}
                onChangeText={setName} />

            <TextInput
                placeholder="Nombre oficial"
                style={styles.input}
                value={officialName}
                onChangeText={setOfficialName} />

            <TextInput
                placeholder="Presidente"
                style={styles.input}
                value={president}
                onChangeText={setPresident} />

            <TextInput
                placeholder="Capital"
                style={styles.input}
                value={capital}
                onChangeText={setCapital} />

            <TextInput
                placeholder="Tamaño (km²)"
                style={styles.input}
                value={size}
                onChangeText={setSize}
                keyboardType="numeric" />

            <TextInput
                placeholder="Población"
                style={styles.input}
                value={population}
                onChangeText={setPopulation}
                keyboardType="numeric" />

            <Dropdown
                label="Continente"
                options={["Europa", "Asia", "América", "África", "Oceanía"]}
                onSelect={setContinent} />

            <Dropdown
                label="Idioma"
                options={["Español", "Inglés", "Francés", "Chino", "Japonés", "Portugués", "Turco", "Ruso", "Aleman"]}
                onSelect={setLanguage} />

            <Dropdown
                label="Moneda"
                options={["Euro", "Dólar", "Peso", "Yen", "Libra"]}
                onSelect={setCurrency} />

            <TouchableOpacity
                style={styles.imagePicker}
                onPress={pickImage}>
                {flag ? (
                    <Image source={{ uri: flag }}
                        style={styles.flagImage} />
                ) : (
                    <Text style={styles.selectImageText}>Subir bandera</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (!validateFields()) return;
                }}
            >
                <Text style={styles.buttonText}>
                    {isEditing ? "Actualizar país" : "Guardar país"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 25,
        color: "#444",
    },
    line: {
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 25,
    },
    input: {
        backgroundColor: "#F2F2F2",
        marginBottom: 15,
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 16,
    },
    imagePicker: {
        backgroundColor: "#EEE",
        width: 150,
        height: 150,
        borderRadius: 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
    },
    flagImage: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    selectImageText: {
        color: "#777",
    },
    button: {
        backgroundColor: "#3573E5",
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 40,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 17,
    }
});
