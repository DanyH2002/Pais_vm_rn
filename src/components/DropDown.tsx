import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type Option = {
    id: number | string;
    name: string;
};

type DropdownProps = {
    label: string;
    options: Option[];
    value?: string | number;
    onSelect?: (id: string) => void;
};

export default function Dropdown({ label, options, value, onSelect }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);

    useEffect(() => {
        if (value) {
            const found = options.find(o => String(o.id) === String(value));
            if (found) setSelected(found);
        }
    }, [value, options])

    const handleSelect = (item: Option) => {
        setSelected(item);
        setOpen(false);
        onSelect && onSelect(String(item.id));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
                style={styles.selector}
                onPress={() => setOpen(!open)}
            >
                <Text style={selected ? styles.selected : styles.placeholder}>
                    {selected ? selected.name : "Selecciona una opción"}
                </Text>
            </TouchableOpacity>

            {open && (
                <View style={styles.dropdown}>
                    <ScrollView>
                        {options.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.option}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.optionText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
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