import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import apiClient from '@/api/apiClient';

const WeatherScreen: React.FC = () => {

    const [forecast, setForecast] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchweather = async() =>{
            try {
                const response = await weatherApi.post("localhost:8000/api/weather", {
                    location: "La plagne"
                });

                if(response?.data?.forecasts?.length > 0){
                    setForecast(response.data.forecasts);
                }else{
                    setForecast("Aucune donnée de prévision météo trouvé");
                }
            }catch (error){
                console.error(error);
            }
        };
        fetchWeather();
    }, []);

    return (
        <ImageBackground
            source={require('../assets/background/pexels-ryank-20042214.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.temperature}>3°C</Text>
                <Text style={styles.status}>Peu nuageux</Text>
                <Text style={styles.stationName}>Nom de la station</Text>

                <View style={styles.weatherBox}>
                    <Text style={styles.dayTitle}>Aujourd'hui</Text>
                    <View style={styles.row}>
                        <Text style={styles.info}>12:00 🌤️ 15% | 4 m/s</Text>
                        <Text style={styles.info}>14:00 🌧️ 15% | 4 m/s</Text>
                    </View>
                </View>

                <View style={styles.snowInfo}>
                    <Text>Enneigement :</Text>
                    <Text>- Neige au sommet : 170 cm</Text>
                    <Text>- Neige en bas : 58 cm</Text>
                    <Text>- Nouvelle neige : 6 cm</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    // centered: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
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

    background: {
        flex: 1,
        justifyContent: 'center'
    },
    temperature: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff'
    },
    status: {
        fontSize: 18,
        color: '#fff'
    },
    stationName: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20
    },
    weatherBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        fontSize: 14
    },
    snowInfo: {
        marginTop: 20,
        color: '#fff'
    },

});

export default WeatherScreen;
