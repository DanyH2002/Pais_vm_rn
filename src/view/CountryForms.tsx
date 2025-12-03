import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Dropdown from "../components/DropDown";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCountry } from "../context/countryContext";

export default function CountryForms() {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const isEditing = route.params?.mode === "edit";
    const editingId = route.params?.id || null;

    const {
        createCountry,
        updateCountry,
        getCountry,
        selectedCountry,
        continents,
        languages,
        currencies,
        getContinents,
        getLanguages,
        getCurrencies,
        listAuxData,
    } = useCountry();

    const [name, setName] = useState("");
    const [officialName, setOfficialName] = useState("");
    const [president, setPresident] = useState("");
    const [capital, setCapital] = useState("");
    const [size, setSize] = useState("");
    const [population, setPopulation] = useState("");

    const [continentId, setContinentId] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [currencyId, setCurrencyId] = useState("");

    const [flag, setFlag] = useState<string | null>(null);
    const [flagFile, setFlagFile] = useState<any>(null);

    const [loading, setLoading] = useState(false);
    const [catalogLoading, setCatalogLoading] = useState(true);

    // Carga de datos de catalogos
    useEffect(() => {
        const loadCatalogs = async () => {
            setCatalogLoading(true);
            try {
                await Promise.all([
                    getContinents(),
                    getLanguages(),
                    getCurrencies()
                ]);
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar los catálogos");
            } finally {
                setCatalogLoading(false);
            }
        };

        loadCatalogs();

        if (isEditing && editingId) {
            getCountry(editingId);
        }
    }, [])

    // Cargar datos para editar 
    useEffect(() => {
        if (!selectedCountry || !isEditing) return;

        setName(selectedCountry.name);
        setOfficialName(selectedCountry.official_name);
        setPresident(selectedCountry.president);
        setCapital(selectedCountry.capital);
        setSize(String(selectedCountry.size));
        setPopulation(String(selectedCountry.population));

        setContinentId(String(selectedCountry.continent_id));
        setLanguageId(String(selectedCountry.language_id));
        setCurrencyId(String(selectedCountry.currency_id));

        setFlag("http://127.0.0.1:8000/storage/" + selectedCountry.flag);
    }, [selectedCountry])

    // Seleccionar imagen
    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permiso necesario', 'Necesitas permitir el acceso a la galería');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 2],
                quality: 0.8,
            });

            if (!result.canceled) {
                const asset = result.assets[0];
                setFlag(asset.uri);
                setFlagFile({
                    uri: asset.uri,
                    type: "image/jpeg",
                    name: "flag.jpg",
                });
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo seleccionar la imagen");
        }
    }

    const validateFields = () => {
        const errors = [];

        if (!name.trim()) errors.push("Nombre");
        if (!officialName.trim()) errors.push("Nombre oficial");
        if (!president.trim()) errors.push("Presidente");
        if (!capital.trim()) errors.push("Capital");
        if (!size.trim()) errors.push("Tamaño");
        if (!population.trim()) errors.push("Población");
        if (!continentId) errors.push("Continente");
        if (!languageId) errors.push("Idioma");
        if (!currencyId) errors.push("Moneda");

        if (errors.length > 0) {
            Alert.alert(
                "Campos incompletos",
                `Por favor completa los siguientes campos:\n\n${errors.join('\n')}`
            );
            return false;
        }

        if (isNaN(Number(size)) || Number(size) <= 0) {
            Alert.alert("Error", "Ingresa un tamaño válido");
            return false;
        }

        if (isNaN(Number(population)) || Number(population) <= 0) {
            Alert.alert("Error", "Ingresa una población válida");
            return false;
        }
        return true;
    }

    // Envio de datos
    const handleSubmit = async () => {
        if (!validateFields()) return;

        setLoading(true);
        try {
            const form = new FormData();
            form.append("name", name.trim());
            form.append("official_name", officialName.trim());
            form.append("president", president.trim());
            form.append("capital", capital.trim());
            form.append("size", size);
            form.append("population", population);
            form.append("continent_id", continentId);
            form.append("language_id", languageId);
            form.append("currency_id", currencyId);

            if (flagFile) form.append("flag", flagFile);

            let success = false;

            if (isEditing && editingId) {
                success = await updateCountry(editingId, form);
            } else {
                success = await createCountry(form);
            }

            if (success) {
                Alert.alert(
                    "Éxito",
                    isEditing ? "País actualizado correctamente" : "País creado correctamente",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("home" as never) // Redirige a home
                        }
                    ]
                );
            } else {
                Alert.alert("Error", "No se pudo guardar el país");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error al guardar");
        } finally {
            setLoading(false);
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    if (catalogLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3573E5" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>◀ Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>InfoPaís</Text>
                <View style={styles.spacer} />
            </View>

            <View style={styles.line} />


            <Text style={styles.subTitle}>
                {isEditing ? "Editar país" : "Nuevo país"}
            </Text>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={name}
                onChangeText={setName} />

            <Text style={styles.label}>Nombre Oficial</Text>
            <TextInput
                placeholder="Nombre oficial"
                style={styles.input}
                value={officialName}
                onChangeText={setOfficialName} />

            <Text style={styles.label}>Presidente Actual</Text>
            <TextInput
                placeholder="Presidente"
                style={styles.input}
                value={president}
                onChangeText={setPresident} />

            <Text style={styles.label}>Capital</Text>
            <TextInput
                placeholder="Capital"
                style={styles.input}
                value={capital}
                onChangeText={setCapital} />

            <Text style={styles.label}>Tamaño en km²</Text>
            <TextInput
                placeholder="Tamaño (km²)"
                style={styles.input}
                value={size}
                onChangeText={setSize}
                keyboardType="numeric" />

            <Text style={styles.label}>Población (solo numeros)</Text>
            <TextInput
                placeholder="Población"
                style={styles.input}
                value={population}
                onChangeText={setPopulation}
                keyboardType="numeric" />

            <Dropdown
                label="Continente"
                options={continents}
                value={continentId}
                onSelect={setContinentId}
            />

            <Dropdown
                label="Idioma"
                options={languages}
                value={languageId}
                onSelect={setLanguageId}
            />

            <Dropdown
                label="Moneda"
                options={currencies}
                value={currencyId}
                onSelect={setCurrencyId}
            />

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {flag ? (
                    <Image source={{ uri: flag }} style={styles.flagImage} />
                ) : (
                    <Text style={styles.selectImageText}>Subir bandera</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {isEditing ? "Actualizar país" : "Guardar país"}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
    },
    container: {
        padding: 50,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 10,
    },
    backButton: {
        flex: 1,
    },
    backText: {
        fontSize: 18,
        color: "#3573E5",
        fontWeight: "600"
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        flex: 2,
    },
    spacer: {
        flex: 1,
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
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
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
    buttonDisabled: {
        backgroundColor: '#a0c1f1',
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 17,
    }
});
