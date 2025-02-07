import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Card } from '@/components/Card';
import { Ionicons } from '@expo/vector-icons';
import {useThemeColor} from "@/hooks/useThemeColor";
import {router} from 'expo-router';
import apiClient from "@/api/apiClient";


const UserProfileScreen = () => {
    const [userData, setUserData] = useState({user:{}});
    const [error, setError] = useState<String | null>(null);
    const [loading, setLoading] = useState(false);

    const titleContainer = useThemeColor({}, 'containerHeader');
    const text = useThemeColor({}, 'text');
    const whiteText = useThemeColor({}, 'whiteText');

    useEffect(() => {
        const fetchUserInfo = async ()=>{
            try {
                const response = await apiClient.get('/profile');
                setUserData(response.data.user);
                console.log(response.data.user.skiPreference.name);
            }catch(error){
                console.log(error);
                setError('Impossible de charger les données');
            }finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);


    return (
        <ImageBackground
            source={require('../assets/background/pexels-ryank-20042214.jpg')}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Avatar.Image
                    // source={{uri: ''}}
                    size={100}
                    style={styles.avatar}
                />
                {loading ? (
                    <ActivityIndicator size="small" color="#003566" />
                ) : userData? (
                    <>
                        <Text style={[styles.name, {color: whiteText}]}>
                            {userData.firstname} {userData.lastname}
                        </Text>
                        <Text style={[styles.email, {color: whiteText}]}>
                            {userData.email}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.errorText}>{error}</Text>
                )}
                <Text style={[styles.skiLevelText, {color:whiteText}]}>Niveau de ski: Intermédiaire</Text>

                <ScrollView style={styles.cardContainer}>
                    <Card style={styles.card}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#003566" />
                        ) : userData? (
                            <>
                                <Text style={[styles.cardTitle, {color: text}]}>Informations personnelles</Text>
                                <Text style={[styles.cardText, {color: text}]}>Nom: {userData.lastname}</Text>
                                <Text style={[styles.cardText, {color: text}]}>Prenom: {userData.firstname}</Text>
                                <Text style={[styles.cardText, {color: text}]}>Email: {userData.email}</Text>
                                <Text style={[styles.cardText, {color: text}]}>Téléphone: {userData.phoneNumber}</Text>
                            </>
                        ) : (
                            <Text style={styles.errorText}>{error}</Text>
                        )}
                    </Card>


                    <Card style={styles.card}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#003566" />
                        ): userData ? (
                            <>
                                <Text style={[styles.cardTitle, {color: text}]}>Préférences de ski</Text>
                                <Text style={[styles.cardText, {color: text}]}>Type de ski: {userData.skiPreference.name}</Text>
                                <Text style={[styles.cardText, {color: text}]}>Niveau de difficulté: {userData.skiLevel.name}</Text>
                            </>

                        ):(
                            <Text style={styles.errorText}>{error}</Text>
                        )}
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
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default UserProfileScreen;
