import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Dimensions } from 'react-native';
import apiClient from '@/api/apiClient';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {TextStyles} from "@/constants/TextStyles";
import {useThemeColor} from "@/hooks/useThemeColor";

const { width } = Dimensions.get('window');

const WeatherScreen: React.FC = () => {

    const [forecast, setForecast] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [today, setToday] = useState<Date | null>(null);
    const currentDay = new Date().toISOString().split('T')[0]
    const currentHours = new Date().getHours()
    const isMorning = currentHours <=  12;

    const errorTextColor = useThemeColor({}, 'errorText');

    const getWeatherIcon = (weather: string) => {
        switch (weather.toLowerCase()) {
            case 'ensoleillé':
                return <Feather name="sun" size={20} color="#fcf4a4" />;
            case 'nuageux':
                return <FontAwesome5 name="cloud" size={20} color="#003566" />;
            case 'pluvieux':
                return <Ionicons name="rainy" size={20} color="#003566" />;
            case 'neigeux':
                return <Ionicons name="snow" size={20} color="#003566" />;
            case 'brouillard':
                return <MaterialCommunityIcons name="weather-fog" size={20} color="#003566" />;
            default:
                return '';
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
                console.log(err)
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
                                        {getWeatherIcon(today.morning.weather_code?.[1] || '')}
                                        <Text style={styles.weatherDescription}>{today.morning.weather_code?.[0]  || 'Donnée non disponibles'}</Text>
                                    </View>
                                </View>
                            ) : (
                                <View >
                                    <Text style={styles.temperature}>{today.afternoon.temperature_2m}°C</Text>
                                    <View style={styles.iconContainer}>
                                        {getWeatherIcon(today.afternoon.weather_code?.[1]  || '')}
                                        <Text style={styles.weatherDescription}>{today.afternoon.weather_code?.[0]  || 'Donnée non disponibles'}</Text>
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
                <View style={styles.snowForecastCard}>
                    <Text style={styles.title}>Condition de neige d'aujourd'hui</Text>
                    {today ? (
                        isMorning ? (
                            <View style={styles.snowInfo}>
                                <View>
                                    <Text style={styles.cardTextSnow}> {today.morning.snowfall || 0}cm</Text>
                                    <Text style={styles.snowfallInfoText}>Chute</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTextSnow}>{today.afternoon.snow_depth*100 || 0}cm</Text>
                                    <Text style={styles.snowfallInfoText || 0}>Profondeur</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.snowInfo}>
                                <View>
                                    <Text style={styles.cardTextSnow}> {today.afternoon.snowfall || 0}cm</Text>
                                    <Text style={styles.snowfallInfoText}>Chute</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTextSnow}>{today.afternoon.snow_depth*100 || 0}cm</Text>
                                    <Text style={styles.snowfallInfoText}>Profondeur</Text>
                                </View>
                            </View>
                        )
                    ) : loading ? (
                        <ActivityIndicator size="small" color="#003566" />
                    ) : (
                        <Text style={[{ color: errorTextColor }, TextStyles.errorText]}>{error}</Text>
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
                                        <MaterialCommunityIcons style={styles.weatherIcon} name="weather-windy" size={20} color="#003566" />
                                        <Text>{dayForecast.morning?.wind_speed_10m} km/h</Text>
                                    </View>
                                    <View style={styles.snowfall}>
                                        <Ionicons style={styles.weatherIcon} name="snow" size={20} color="#003566" />
                                        <Text>{dayForecast.morning?.snowfall || 0} cm</Text>
                                    </View>
                                </View>
                            );
                        })
                    ) : loading ? (
                        <ActivityIndicator size="small" color="#003566" />
                    ) : (
                        <Text style={[{ color: errorTextColor }, TextStyles.errorText]}>{error}</Text>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: width < 400 ? 8 : 12,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    containerTop: {
        alignItems: "center",
        marginVertical: width < 400 ? 10 : 20,
    },
    temperature: {
        fontSize: width < 400 ? 50 : 60,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: width < 400 ? 18 : 20,
        textAlign: 'center',
        color:'#0A3A5D'
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    weatherCard: {
        backgroundColor: '#fff',
        flex: 1,
        marginHorizontal: 5,
        padding: width < 400 ? 8 : 15,
        borderRadius: 10,
        elevation: 5,
        opacity: 0.8,
        marginTop:10
    },
    cardTextTemp: {
        fontSize: width < 400 ? 30 : 40,
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    forecastCard: {
        padding: 13,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        opacity: 0.8,
        marginTop: 10,
    },
    snowForecastCard: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        opacity: 0.8,
        marginTop: 10,
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
        fontSize: width < 400 ? 14 : 16,
    },
    windSpeed: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    snowfall: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    snowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    snowDepth: {
        marginTop: 5,
    },
    snowFallText: {
        fontSize: 14,
    },
    weatherDescription: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    weatherIcon: {
        marginRight: 3,
        color:'#75C9C8',
},
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTextSnow:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    snowfallInfoText:{
        textAlign: 'center',
    }

});

export default WeatherScreen;
