// src/components/CollapsibleHeader.tsx
import React from "react";
import {
    Animated,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle, Platform, TouchableOpacity
} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";


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
    /** Affiche la flèche de retour si vrai */
    showBackButton?: boolean;
    /** Fonction appelée lors du clic sur la flèche retour */
    onBackPress?: () => void;
};

export default function CollapsibleHeader({
                                              scrollY,
                                              maxHeight = 100,
                                              minHeight = 50,
                                              maxFontSize = 24,
                                              minFontSize = 18,
                                              title = "Mon Titre",
                                              showBackButton = false,
                                              onBackPress,
                                          }: CollapsibleHeaderProps) {
    let textStyle = (useThemeColor({}, 'text'))
    let containerStyle = (useThemeColor({}, 'background'));
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
        containerStyle= "#f2f4f7";
        textStyle =  "#11181C";
    }
    return (
        <Animated.View style={[styles.header, {backgroundColor: containerStyle}, {height: headerHeight} ]}>
            {showBackButton && (
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} textStyle />
                </TouchableOpacity>
            )}
            <Animated.Text style={[styles.title, {color: textStyle}, {fontSize: titleFontSize}]}>
                {title}
            </Animated.Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        marginLeft: 25,
    },
    backButton: {
        marginLeft: 10,
        marginRight: 10,
    },
});
