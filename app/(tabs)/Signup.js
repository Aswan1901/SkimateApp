import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Background Image with reduced opacity */}
            <ImageBackground
                source={require('../../assets/background/pexels-ryank-20042214.jpg')} // Update the path to your image
                style={styles.background}
                imageStyle={styles.backgroundImage} // Adjust opacity
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {/* Logo */}
                    <Text style={styles.logo}>SkiMate</Text>

                    {/* Name Fields */}
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Nom"
                            placeholderTextColor="#FFFFFF"
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Prénom"
                            placeholderTextColor="#FFFFFF"
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#FFFFFF"
                        />
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Téléphone"
                            placeholderTextColor="#FFFFFF"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            placeholderTextColor="#FFFFFF"
                            secureTextEntry
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer le mot de passe"
                            placeholderTextColor="#FFFFFF"
                            secureTextEntry
                        />
                    </View>

                    {/* Ski Level Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Niveau de ski"
                            placeholderTextColor="#FFFFFF"
                        />
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5, // Lower background opacity
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#003566',
        textAlign: 'center',
        marginBottom: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfInput: {
        width: '48%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000000',
        backgroundColor: 'transparent',
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#003566',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

