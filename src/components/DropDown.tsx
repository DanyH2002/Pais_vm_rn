import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";

type DropdownProps = {
    label: string;
    options: string[];
    onSelect?: (value: string) => void;
};

export default function Dropdown({ label, options, onSelect }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const handleSelect = (value: string) => {
        setSelected(value);
        setOpen(false);
        onSelect && onSelect(value);
    };

    const renderOption = (item: string) => (
        <TouchableOpacity
            key={item}
            style={styles.option}
            onPress={() => handleSelect(item)}
        >
            <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
                style={styles.selector}
                onPress={() => setOpen(!open)}
            >
                <Text style={selected ? styles.selected : styles.placeholder}>
                    {selected || "Selecciona una opción"}
                </Text>
            </TouchableOpacity>

            {open && (
                <View style={styles.dropdown}>
                    {options.length < 20 ? (
                        <ScrollView>
                            {options.map(renderOption)}
                        </ScrollView>
                    ) : (
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => renderOption(item)}
                            nestedScrollEnabled
                        />
                    )}
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
    },
    selector: {
        backgroundColor: "#F2F2F2",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 30,
    },
    placeholder: {
        color: "#888",
        fontSize: 15,
    },
    selected: {
        color: "#000",
        fontSize: 15,
        fontWeight: "500",
    },
    dropdown: {
        marginTop: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        maxHeight: 160,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { height: 2, width: 0 },
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 18,
    },
    optionText: {
        fontSize: 15,
    }
});