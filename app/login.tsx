import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
    return (
        <View style={styles.LoginContainer}>
            <ImageBackground
                source={require('../assets/background/pexels-ryank-20042214.jpg')}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Text style={styles.logo}>SkiMate</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#000000"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            placeholderTextColor="#000000"
                            secureTextEntry
                        />
                    </View>

                    <Link href="/dashboard" asChild>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity>
                    </Link>

                    <View style={styles.linksContainer}>
                        <Link href="/register" asChild>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>S'inscrire</Text>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Mot de passe oublié</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    container: {
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
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
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
    linksContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linkText: {
        color: '#000000',
        fontSize: 14,
    },
});
