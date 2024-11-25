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

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/background/pexels-ryank-20042214.jpg')}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Text style={styles.logo}>SkiMate</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            placeholderTextColor="#FFFFFF"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>se connecter</Text>
                    </TouchableOpacity>

                    <View style={styles.linksContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.linkText}>S'inscrire</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.linkText}>Mot de passe oublié</Text>
                        </TouchableOpacity>
                    </View>
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
        opacity: 0.5,
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
