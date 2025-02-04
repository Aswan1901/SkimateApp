import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { router } from 'expo-router';

const ResortScreen = () => {
    // Theme-based colors
    const titleContainer = useThemeColor({}, 'containerHeader');
    const text = useThemeColor({}, 'text');
    const whiteText = useThemeColor({}, 'whiteText');

    return (
        <ImageBackground
            source={require('../assets/background/pexels-ryank-20042214.jpg')}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <ScrollView style={styles.container}>
                <View style={styles.topSection}>
                    <Text style={[styles.resortName, { color: text }]}>La Plagne</Text>
                    <Text style={[styles.notes, { color: text }]}>Note : 5/5</Text>
                    <Text style={[styles.weather, { color: text }]}>Météo : Ensoleillé, -5°C</Text>
                </View>

                <View style={styles.description}>
                    <Text style={[styles.descriptionText, { color: text }]}>
                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>

                <Text style={[styles.title, { backgroundColor: titleContainer, color: whiteText }]}>
                    Infrastructure de la station
                </Text>

                <View style={styles.resortInfoContainer}>
                    <View style={styles.section}>
                        <Text style={[styles.sectionHeader, { color: text }]}>Type de Remontée mécanique</Text>
                        <Text style={[styles.pisteText, { color: text }]}>Telesiege 15</Text>
                        <Text style={[styles.pisteText, { color: text }]}>Télécabine 20</Text>
                        <Text style={[styles.pisteText, { color: text }]}>Tire fesse 9</Text>
                    </View>

                    <View style={[styles.verticalLine, { backgroundColor: text }]} />

                    <View style={styles.section}>
                        <Text style={[styles.sectionHeader, { color: text }]}>Piste disponible</Text>
                        <Text style={styles.pisteText}>Piste 1 : ouverte</Text>
                    </View>

                    <View style={[styles.verticalLine, { backgroundColor: text }]} />

                    <View style={styles.section}>
                        <Text style={[styles.sectionHeader, { color: text }]}>Tarifs et Forfaits :</Text>
                        <Text style={[styles.pisteText, { color: text }]}>Forfait journée : 50€</Text>
                        <Text style={[styles.pisteText, { color: text }]}>Forfait semaine : 250€</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => router.push('/review')}>
                        <Text style={[styles.linkText, { color: text }]}>Laisser un avis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/weather')}>
                        <Text style={[styles.linkText, { color: text }]}>Voir la météo de la station</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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
    topSection: {
        marginBottom: 20,
        alignItems: 'center',
    },
    resortName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notes: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    weather: {
        fontSize: 14,
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
        textAlign: 'justify',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    resortInfoContainer: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
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
        marginBottom: 10,
        textAlign: 'center',
    },
    pisteText: {
        fontSize: 12,
        textAlign: 'center',
    },
    verticalLine: {
        width: 1,
        marginHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonOutlined: {
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ResortScreen;
