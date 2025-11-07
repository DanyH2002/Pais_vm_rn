import React from 'react'
import { View, Text, Pressable } from 'react-native'
import type { HomeScreenProps } from '../routes'

export default function Home({ navigation }: HomeScreenProps) {
    return (
        <View>
            <Text> Inicio de Nuestra App</Text>
            <Pressable
                onPress={() =>
                    // console.log("Hola")
                    navigation.navigate('debug')
                }
            >
                <Text> Ir a bug</Text>
            </Pressable>
        </View>
    )
}
