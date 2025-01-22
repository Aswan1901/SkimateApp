import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedBoxProps = {
    title?: string;
    style?: any;
};

export function ThemedBox({ title = "Hello", style }: ThemedBoxProps) {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            <Text style={{ color: textColor }}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
