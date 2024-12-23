import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import {Link} from "expo-router";

const ResortScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/background/pexels-ryank-20042214.jpg')}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Text style={styles.resortName}>La Plagne</Text>
                    <Text style={styles.notes}>Note : 5/5</Text>
                    <Text style={styles.weather}>Météo : Ensoleillé, -5°C</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
                <Text style={styles.title}>Infrastructure de la station</Text>
                <View style={styles.resortInfoContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Type de Remontée mécanique</Text>
                        <View style={styles.pisteInfo}>
                            <Text style={styles.pisteText}>Telesiege 15</Text>
                        </View>
                        <View style={styles.pisteInfo}>
                            <Text style={styles.pisteText}>Télécabine 20</Text>
                        </View>
                        <View style={styles.pisteInfo}>
                            <Text style={styles.pisteText}>Tire fesse 9</Text>
                        </View>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Piste disponible</Text>
                        <Text style={styles.pisteText}>piste 1 : ouvertes</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Tarifs et Forfaits :</Text>
                        <Text style={styles.pisteText}>Forfait journée : 50€</Text>
                        <Text style={styles.pisteText}>Forfait semaine : 250€</Text>
                    </View>
                </View>
                <Link href='/review' style={styles.reviewLink}>Laisser un avis</Link>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    // Top Section
    topSection: {
        marginBottom: 20,
        alignItems: 'center',
    },
    resortName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e3b4e',
        marginBottom: 10,
    },
    notes: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    weather: {
        fontSize: 14,
        color: '#333',
    },
    description: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify',
    },
    // Title
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#2e3b4e',
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    // Resort Info
    resortInfoContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 4,
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    pisteInfo: {
        alignItems: 'center',
        marginBottom: 10,
    },
    pisteText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    verticalLine: {
        width: 1,
        backgroundColor: '#333',
        marginHorizontal: 10,
    },
    reviewLink:{
        marginTop:15,
        fontSize:17
    }
});

export default ResortScreen;
