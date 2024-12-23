import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';

const ReviewScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.stationInfo}>
                <Text style={styles.stationName}>Nom de la station ⭐⭐⭐⭐⭐</Text>
                <Text style={styles.weather}>Météo : Ensoleillé, -5°C</Text>
            </View>

            <ScrollView style={styles.reviewContainer}>
                <Text style={styles.sectionTitle}>Avis :</Text>

                <View style={styles.review}>
                    <Text style={styles.username}>username ⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.reviewText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>

                <View style={styles.review}>
                    <Text style={styles.username}>username ⭐⭐⭐⭐</Text>
                    <Text style={styles.reviewText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.leaveReviewContainer}>
                <Text style={styles.sectionTitle}>Laisser un avis</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Message..."
                    multiline
                />
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f7fa',
        padding: 20,
    },
    stationInfo: {
        marginBottom: 20,
        alignItems: 'center',
    },
    stationName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e3b4e',
    },
    weather: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    reviewContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e3b4e',
        marginBottom: 10,
    },
    review: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    reviewText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    leaveReviewContainer: {
        marginTop: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 15,
        elevation: 2,
    },
    submitButton: {
        backgroundColor: '#2e3b4e',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 10,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReviewScreen;
