import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import apiClient from '@/api/apiClient';

const Weather: React.FC = () => {
    const [forecast, setForecast] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const url = '/weather'; // Endpoint relatif
            console.log(`Tentative de requête POST à l'URL: ${apiClient.defaults.baseURL}${url}`);

            try {
                const response = await apiClient.post(url, {
                    location: "La Plagne"
                });

                // Assurez-vous que response.data.forecasts existe et contient des données
                if (response.data && response.data.forecasts && response.data.forecasts.length > 0) {
                    setForecast(response.data.forecasts[0]); // Données du jour 1
                } else {
                    setError('Aucune donnée de prévision disponible.');
                }
            } catch (err: any) {
                console.error('Erreur complète :', err);
                console.error(
                    `Erreur réseau: ${err.message}\nURL utilisée: ${apiClient.defaults.baseURL}${url}`
                );
                setError('Impossible de charger les prévisions météo.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#003566" />
                <Text>Chargement des prévisions...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Prévisions Météo - {forecast?.day}</Text>
            <View style={styles.forecastContainer}>
                <Text style={styles.text}>Température Matin : {forecast?.morning?.temperature_2m}°C</Text>
                <Text style={styles.text}>Température Après-midi : {forecast?.afternoon?.temperature_2m}°C</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F8F9FA',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003566',
        textAlign: 'center',
        marginBottom: 20,
    },
    forecastContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Weather;
