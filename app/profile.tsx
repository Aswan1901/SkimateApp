import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Card } from '@/components/Card';
import { Ionicons } from '@expo/vector-icons';
import {useThemeColor} from "@/hooks/useThemeColor";
import {router} from 'expo-router';

const UserProfileScreen = () => {

    const titleContainer = useThemeColor({}, 'containerHeader');
    const text = useThemeColor({}, 'text');
    const whiteText = useThemeColor({}, 'whiteText');


    return (
        <ImageBackground
            source={require('../assets/background/pexels-ryank-20042214.jpg')}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Avatar.Image
                    // source={{uri: 'https://randomuser.me/api/portraits/men/10.jpg'}}
                    size={100}
                    style={styles.avatar}
                />
                <Text style={[styles.name, {color:whiteText}]}>John Doe</Text>
                <Text style={[styles.email, {color:whiteText}]}>johndoe@example.com</Text>


                <Text style={[styles.skiLevelText, {color:whiteText}]}>Niveau de ski: Intermédiaire</Text>

                <ScrollView style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <Text style={[styles.cardTitle, {color: text}]}>Informations personnelles</Text>
                        <Text style={[styles.cardText, {color: text}]}>Nom: John</Text>
                        <Text style={[styles.cardText, {color: text}]}>Prénom: Doe</Text>
                        <Text style={[styles.cardText, {color: text}]}>Email: johndoe@example.com</Text>
                        <Text style={[styles.cardText, {color: text}]}>Téléphone: +1 234 567 890</Text>
                    </Card>

                    <Card style={styles.card}>
                        <Text style={[styles.cardTitle, {color: text}]}>Préférences de ski</Text>
                        <Text style={[styles.cardText, {color: text}]}>Type de ski: Piste</Text>
                        <Text style={[styles.cardText, {color: text}]}>Niveau de difficulté: Bleu</Text>
                    </Card>
                </ScrollView>

                <TouchableOpacity style={styles.settingsBtn} onPress={()=>router.push('/settings')}>
                    <Ionicons name="settings-sharp" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    avatar: {
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        marginTop: 5,
    },
    phone: {
        fontSize: 16,
        marginTop: 5,
    },
    skiLevelText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    cardContainer: {
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        marginBottom: 15,
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    settingsBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#0A3A5D',
        padding: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});

export default UserProfileScreen;
