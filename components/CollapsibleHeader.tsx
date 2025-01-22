// src/components/CollapsibleHeader.tsx
import React from "react";
import {
    Animated,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle, Platform
} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";


type CollapsibleHeaderProps = {
    /** Valeur animée (scrollY) pour animer la hauteur */
    scrollY: Animated.Value;
    /** Hauteur max du header */
    maxHeight?: number;
    /** Hauteur min du header */
    minHeight?: number;
    /** Taille de police max */
    maxFontSize?: number;
    /** Taille de police min */
    minFontSize?: number;
    minPaddingTop?: number;
    maxPaddingTop?: number;
    /** Texte du header */
    title?: string;
    /** Style additionnel pour le container */
    containerStyle?: StyleProp<ViewStyle>;
    /** Style additionnel pour le texte */
    textStyle?: StyleProp<TextStyle>;
};

export default function CollapsibleHeader({
                                              scrollY,
                                              maxHeight = 100,
                                              minHeight = 50,
                                              maxFontSize = 24,
                                              minFontSize = 18,
                                              title = "Mon Titre",
                                              containerStyle = (useThemeColor({}, 'background') as StyleProp<ViewStyle>),
                                              textStyle = (useThemeColor({}, 'text') as StyleProp<TextStyle>),
                                          }: CollapsibleHeaderProps) {
    // Interpolation de la hauteur
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [maxHeight, minHeight],
        extrapolate: "clamp",
    });

    // Interpolation de la taille de police
    const titleFontSize = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [maxFontSize, minFontSize],
        extrapolate: "clamp",
    });

    if(Platform.OS === "web" ){
        containerStyle= { backgroundColor: "#f2f4f7" };
        textStyle =  { color: "#11181C" };
    }
    return (
        <Animated.View style={[styles.header, containerStyle, {height: headerHeight}, ]}>
            <Animated.Text style={[styles.title, textStyle, {fontSize: titleFontSize}]}>
                {title}
            </Animated.Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        // si besoin, ajout d'élévation ou shadow
    },
    title: {
        fontWeight: "bold",
        marginLeft: 25,
    },
});
