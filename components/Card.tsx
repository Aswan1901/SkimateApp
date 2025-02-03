// src/components/Card.tsx
import React, { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

type CardProps = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: CardProps) {
    const cardBg = useThemeColor({}, 'card');

    return (
        <View style={[globalStyles.card, { backgroundColor: cardBg }, style]}>
            {children}
        </View>
    );
}
