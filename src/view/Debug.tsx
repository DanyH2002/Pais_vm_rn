import React from 'react'
import { View, Text, Pressable } from 'react-native'
import type { DebugScreenProps } from '../routes'

export default function Debug({ route, navigation }: DebugScreenProps) {
    console.log(route.params.bug);
    const { bug } = route.params;
    return (
        <View>
            <Text>Debug de la App</Text>
            <Pressable
                onPress={() =>
                    navigation.popToTop()
                }
            >
                <Text> Resaltar a home</Text>
            </Pressable>
            <Text>{bug}</Text>
        </View>
    )
}
