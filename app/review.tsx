import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import apiClient from "@/api/apiClient";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';


const ReviewScreen = () => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newComment, setNewComment] = useState('');
    const [title, setTitle] = useState('');
    const [starRating, setStarRating] = useState(0);

    function showRating(starRating: number) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <AntDesign
                    style={styles.rating}
                    name={i < starRating ? 'star' : 'staro'}
                    key={i}
                />
            );
        }
        return stars;
    }

    useEffect(() => {
        const fetchComment = async () => {
            const url = '/comment';
            try {
                const response = await apiClient.get(url);
                setComments(response.data);
            } catch (error) {
                console.log(error);
                setError('Impossible de charger les commentaires.');
            } finally {
                setLoading(false);
            }
        };
        fetchComment();
    }, []);

    const handleAddComment = async () => {

        let userToken;

        if(Platform.OS === 'web'){
            userToken = await AsyncStorage.getItem('token');
        }else if(Platform.OS === 'android'){
            userToken = await SecureStore.getItemAsync('token');
        }

        const url = '/comment/add';
        const newCommentData = {
            title: title,
            comment: newComment,
            note: starRating,
            userToken: userToken
        };

        try {
            const response = await apiClient.post(url, newCommentData);
            setComments([response.data, ...comments]);
            setNewComment('');
            setStarRating(0);
        } catch (error) {
            console.log(error);
            setError('Impossible d\'ajouter le commentaire.');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.stationInfo}>
                <Text style={styles.stationName}>La Plagne</Text>
                <Text style={styles.weather}>Météo : Ensoleillé, -5°C</Text>
            </View>
            <ScrollView style={styles.reviewContainer}>
                <Text style={styles.sectionTitle}>Avis :</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#003566" />
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <View style={styles.review} key={comment.id}>
                            <Text style={styles.username}>
                                {comment.user && comment.user.firstname ? comment.user.firstname : 'Anonyme'}
                                {showRating(comment.note)}
                            </Text>
                            <Text>
                                {comment.title}
                            </Text>
                            <Text style={styles.reviewText}>{comment.description}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.errorText}>{error}</Text>
                )}
            </ScrollView>

            <View style={styles.leaveReviewContainer}>
                <Text style={styles.sectionTitle}>Laisser un avis</Text>
                <TextInput
                    style={styles.inputTitle}
                    placeholder="Titre..."
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Message..."
                    multiline
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <View style={styles.ratingContainer}>
                    <TouchableOpacity onPress={() => setStarRating(1)}>
                        <AntDesign
                            style={styles.rating}
                            name={starRating >= 1 ? 'star' : 'staro'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStarRating(2)}>
                        <AntDesign
                            style={styles.rating}
                            name={starRating >= 2 ? 'star' : 'staro'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStarRating(3)}>
                        <AntDesign
                            style={styles.rating}
                            name={starRating >= 3 ? 'star' : 'staro'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStarRating(4)}>
                        <AntDesign
                            style={styles.rating}
                            name={starRating >= 4 ? 'star' : 'staro'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStarRating(5)}>
                        <AntDesign
                            style={styles.rating}
                            name={starRating >= 5 ? 'star' : 'staro'}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
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
    inputTitle: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        height: 20,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    rating:{
        color:'#fcdd53',
        marginLeft:3,
        fontSize:15,
    },
    ratingContainer: {
        marginBottom:5,
        flexDirection: 'row'
    },
});

export default ReviewScreen;
