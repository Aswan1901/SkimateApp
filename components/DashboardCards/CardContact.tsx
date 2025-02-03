import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@/components/Card';
import { useThemeColor } from '@/hooks/useThemeColor';

type CardContactProps = {
    website?: string | null;
    emergencyPhone?: string | null;
};

export function CardContact({ website, emergencyPhone }: CardContactProps) {
    const textColor = useThemeColor({}, 'text');

    // Ouvre un site web
    const openWebsite = async (url: string) => {
        if (!url.startsWith('http')) {
            url = 'https://' + url; // Pour s'assurer du bon format
        }
        await Linking.openURL(url);
    };

    // Ouvre le dialer
    const openPhone = async (number: string) => {
        await Linking.openURL(`tel:${number}`);
    };

    // Couleurs
    const websiteColor = '#007bff'; // bleu moderne
    const phoneColor = '#f44336';   // rouge

    return (
        <Card style={styles.cardContainer}>

            {/* Website (si existe) */}
            {website && (
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => openWebsite(website)}
                >
                    {/* Petit titre de l’élément */}
                    <Text style={[styles.itemLabel, { color: textColor }]}>Site web</Text>

                    {/* Ligne principale : texte + icône à droite */}
                    <View style={styles.mainContentRow}>
                        <Text style={[styles.itemValue, { color: websiteColor }]} numberOfLines={1}>
                            {website}
                        </Text>
                        <Ionicons name="earth" size={20} color={websiteColor}/>
                    </View>
                </TouchableOpacity>
            )}

            {/* Téléphone (si existe) */}
            {emergencyPhone && (
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => openPhone(emergencyPhone)}
                >
                    <Text style={[styles.itemLabel, { color: textColor }]}>Téléphone</Text>

                    <View style={styles.mainContentRow}>
                        <Text style={[styles.itemValue, { color: phoneColor }]} numberOfLines={1}>
                            {emergencyPhone}
                        </Text>
                        <Ionicons name="call" size={20} color={phoneColor}/>
                    </View>
                </TouchableOpacity>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemContainer: {
        width: '100%',
        marginBottom: 15,
    },
    itemLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    mainContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemValue: {
        flex: 1,
        fontSize: 14,
        marginRight: 8,
    },
});
