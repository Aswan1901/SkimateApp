import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import apiClient from '@/api/apiClient';
import { WiStrongWind } from "weather-icons-react";
import { WiSnow } from "weather-icons-react";

const WeatherScreen: React.FC = () => {

    const [forecast, setForecast] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    return (

        <ImageBackground
            source={require("../assets/background/pexels-ryank-20042214.jpg")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.temperature}>3°C</Text>
                    <Text style={styles.stationName}>La plagne</Text>
                    <Text>Météo: Partiellement nuageux, nuageux</Text>
                    <Text>Vitesse du vent: 9.2 km/h</Text>
               </View>
                <View style={styles.card}>
                    <Text style={styles.dayText}>Ajourd'hui</Text>
                    <View style={styles.weatherInfoCard}>
                        <View style={styles.weatherInfo}>
                            <Text style={styles.title}>Matin:</Text>
                            <Text style={styles.textInfo}>Température: -4.4°C</Text>
                            <Text style={styles.textInfo}>Vitesse du vent: 9.2 km/h</Text>
                        </View>
                        <View style={styles.weatherInfo}>
                            <Text style={styles.title}>Après-midi:</Text>
                            <Text style={styles.textInfo}>Température: -4.1°C</Text>
                            <Text style={styles.textInfo}>Vitesse du vent: 8.2 km/h</Text>
                        </View>
                    </View>
                    {/*<Text>Neige: 0 cm</Text>*/}
                    {/*<Text>Profondeur de neige: 1 cm</Text>*/}
                    {/*<Text>Météo: Partiellement nuageux, nuageux</Text>*/}
                    {/*<Text>Neige: 0 cm</Text>*/}
                    {/*<Text>Profondeur de neige: 1 cm</Text>*/}
                    {/*<Text>Météo: Partiellement nuageux, nuageux</Text>*/}
                </View>
                <View style={styles.weekCard}>
                    <View style={styles.weekDayInfo}>
                        <Text style={styles.weekDay}>Lundi :</Text>
                        <Text>0°C</Text>
                        <WiStrongWind style={styles.weatherIcon} size={25} color='#003566'/><Text> 10.5 km/h</Text>
                        <WiSnow style={styles.weatherIcon}  size={25} color='#003566'/><Text> 0 cm</Text>
                    </View>
                    <View style={styles.weekDayInfo}>
                        <Text style={styles.weekDay}>Mardi :</Text>
                        <Text>0°C</Text>
                        <WiStrongWind style={styles.weatherIcon} size={25} color='#003566'/><Text> 10.5 km/h</Text>
                        <WiSnow style={styles.weatherIcon}  size={25} color='#003566'/><Text> 0 cm</Text>
                    </View>
                </View>
                <View style={styles.snowCard}>
                    <Text>chute de neige :1.5</Text>
                    <Text>profondeur de neige :1.26cm</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    containerTop:{
        alignItems: "center",
        marginTop:20,
        marginBottom:30

    },
    locationText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // elevation: 2,
        alignItems: "center",
        opacity:0.8
    },
    weekCard: {
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // elevation: 2,
        opacity:0.8
    },
    snowCard: {
        marginTop:20,
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // elevation: 2,
        opacity:0.8,
        alignItems:'center',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign:'center',
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
        marginBottom: 5,
        fontWeight: 'bold',
    },
    weatherInfoCard:{
        flexDirection: 'row',
    },

    textInfo: {
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
    },

    weatherIcon: {
        marginLeft: 10,
    },
    weekDay:{
        marginRight:20,
    },
    weekDayInfo:{
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },


});

export default WeatherScreen;
