import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import apiClient from '@/api/apiClient';
import { WiDaySunnyOvercast, WiStrongWind, WiDaySunny, WiDayCloudy, WiCloud, WiRain, WiSnow, WiFog } from "weather-icons-react";

const WeatherScreen: React.FC = () => {

    const [forecast, setForecast] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [today, setToday] = useState<Date | null>(null);
    const currentDay = new Date().toISOString().split('T')[0]
    const currentHours = new Date().getHours()
    const isMorning = currentHours <=  12;


    const getWeatherIcon = (weather: string) => {
        switch (weather.toLowerCase()) {
            case 'ensoleillé':
                return <WiDaySunny size={50} color="#003566" />;
            case 'nuageux':
                return <WiCloud size={50} color="#003566" />;
            case 'partly cloudy':
                return <WiDayCloudy size={50} color="#003566" />;
            case 'pluvieux':
                return <WiRain size={50} color="#003566" />;
            case 'neigeux':
                return <WiSnow size={50} color="#003566" />;
            case 'brouillard':
                return <WiFog size={50} color="#003566" />;
            default:
                return <WiCloud size={50} color="#003566" />;
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            const url = '/weather';
            try {
                const response = await apiClient.post(url, {
                    location: "La Plagne"
                });
                if (response.data && response.data.forecasts && response.data.forecasts.length > 0) {
                    const forecastData = response.data.forecasts
                    const todayForecast = forecastData.find(forecast => forecast.day === currentDay)
                    setToday(todayForecast)
                    setForecast(forecastData);
                } else {
                    setError('Aucune donnée de prévision disponible.');
                }
            } catch (err: any) {
                setError('Impossible de charger les prévisions météo.');
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    return (
        <ImageBackground
            source={require("../assets/background/pexels-ryank-20042214.jpg")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <View>
                        <Text style={styles.title}>Aujourd'hui</Text>
                    </View>
                    {today ? (
                        <View style={styles.weatherContainer}>
                            {isMorning ? (
                                <View>
                                    <Text style={styles.temperature}>{today.morning.temperature_2m}°C</Text>
                                    <View style={styles.iconContainer}>
                                        {getWeatherIcon(today.morning.weather_code[1])}
                                        <Text style={styles.weatherDescription}>{today.morning.weather_code[0]}</Text>
                                    </View>
                                </View>
                            ) : (
                                <View >
                                    <Text style={styles.temperature}>{today.afternoon.temperature_2m}°C</Text>
                                    <View style={styles.iconContainer}>
                                        {getWeatherIcon(today.afternoon.weather_code[1])}
                                        <Text style={styles.weatherDescription}>{today.afternoon.weather_code[0]}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        <ActivityIndicator size="small" color="#003566" />
                    )}
                </View>

                <View style={styles.cardsContainer}>
                    {today ? (
                        <>
                            <View style={styles.weatherCard}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>Matin</Text>
                                </View>
                                <Text style={styles.cardTextTemp}> {today.morning.temperature_2m}°C</Text>
                                <Text style={styles.cardText}>Vent: {today.morning.wind_speed_10m} km/h</Text>
                            </View>
                            <View style={styles.weatherCard}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>Après-midi</Text>
                                </View>
                                <Text style={styles.cardTextTemp}>{today.afternoon.temperature_2m}°C</Text>
                                <Text style={styles.cardText}>Vent: {today.afternoon.wind_speed_10m} km/h</Text>
                            </View>
                        </>
                    ) : (
                        <ActivityIndicator size="small" color="#003566" />
                    )}
                </View>
                <View style={styles.forecastCard}>
                    <Text style={styles.title}>Condition de neige d'aujourd'hui</Text>
                    {today ? (
                        isMorning ? (
                            <View style={styles.snowInfo}>
                                <View>
                                    <Text style={styles.cardTextSnow}> {today.morning.snowfall}m</Text>
                                    <Text>Chute</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTextSnow}>{today.afternoon.snow_depth}m</Text>
                                    <Text style={styles.snowfallInfoText}>Profondeur</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.snowInfo}>
                                <View>
                                    <Text style={styles.cardTextSnow}> {today.afternoon.snowfall}m</Text>
                                    <Text style={styles.snowfallInfoText}>Chute</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTextSnow}>{today.afternoon.snow_depth}m</Text>
                                    <Text>Profondeur</Text>
                                </View>
                            </View>
                        )
                    ) : loading ? (
                        <ActivityIndicator size="small" color="#003566" />
                    ) : (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                </View>
                <View style={styles.forecastCard}>
                    {forecast ? (
                        forecast.map((dayForecast, index) => {
                            const date = new Date(dayForecast.day);
                            return (
                                <View style={styles.weekDayInfo} key={index}>
                                    <View style={styles.weekDay}>
                                        <Text style={styles.dayText}>{date.toLocaleDateString('fr-FR', { weekday: 'long' })} :</Text>
                                        <Text>{dayForecast.morning?.temperature_2m}°C</Text>
                                    </View>
                                    <View style={styles.windSpeed}>
                                        <WiStrongWind style={styles.weatherIcon} size={25} color="#003566" />
                                        <Text>{dayForecast.morning?.wind_speed_10m} km/h</Text>
                                    </View>
                                    <View style={styles.snowfall}>
                                        <WiSnow style={styles.weatherIcon} size={25} color="#003566" />
                                        <Text>{dayForecast.morning?.snowfall} m</Text>
                                    </View>
                                </View>
                            );
                        })
                    ) : loading ? (
                        <ActivityIndicator size="small" color="#003566" />
                    ) : (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    containerTop: {
        alignItems: "center",
        marginVertical: 20,
    },

    temperature: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    weatherText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 5,
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherCard: {
        backgroundColor: '#ffffff',
        flex: 1,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        opacity:0.8
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },
    cardText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    forecastCard: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 5,
        opacity:0.8,
        marginTop:10,
    },
    weekDayInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    weekDay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dayText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    windSpeed: {
        flexDirection: "row",
        alignItems: 'center',
    },
    snowfall: {
        flexDirection: "row",
        alignItems: 'center',
    },
    weatherIcon: {
        marginHorizontal: 10,
    },

    weatherContainer: {
        width: '90%',
        alignItems: 'center',
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    weatherDescription: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
    cardTextTemp:{
        fontSize: 40,
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#D32F2F',
        textAlign: 'center',
        marginTop: 10,
    },
    cardTextSnow:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    snowInfo:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    snowfallInfoText:{
        textAlign: 'center',
    }

});



export default WeatherScreen;
