import React from 'react'
import { View, Text, Pressable } from 'react-native'
import type { HomeScreenProps } from '../routes'

export default function Home({ navigation }: HomeScreenProps) {
    const enviar = () => {
        navigation.navigate('debug', { bug: "Hola mundo" })
    }
    return (
        <View>
            <Text> Inicio de Nuestra App</Text>
            <Pressable
                onPress={() => enviar()}
            >
                <Text> Ir a bug</Text>
            </Pressable>
            {/* <Pressable
                onPress={() =>
                    navigation.push('home')
                }
            >
                <Text> Ir a home</Text>
            </Pressable>
            <Pressable
                onPress={() =>
                    navigation.push('debug')
                }
            >
                <Text> Ir a debug</Text>
            </Pressable> */}
        </View >
    )
}
