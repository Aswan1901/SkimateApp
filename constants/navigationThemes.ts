// src/constants/navigationThemes.ts
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { Colors } from './Colors';

export const MyLightTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.light.tint,
        background: Colors.light.background,
        card: Colors.light.card,
        text: Colors.light.text,
        border: Colors.light.separator,
        notification: '#f2f2f2', // un exemple
    },
};

export const MyDarkTheme: Theme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: Colors.dark.tint,
        background: Colors.dark.background,
        card: Colors.dark.card,
        text: Colors.dark.text,
        border: Colors.dark.separator,
        notification: '#333',
    },
};
