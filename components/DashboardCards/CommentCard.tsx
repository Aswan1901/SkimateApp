// src/components/DashboardCards/CommentsSection.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { Card } from '@/components/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import apiClient, {isUserConnected} from '@/api/apiClient';
import Ionicons from '@expo/vector-icons/Ionicons';

export type Comment = {
    id: string;
    title: string;
    description: string;
    rating: number;
    createdAt: string;
    firstName: string;
    lastName: string;
};

export type CommentsSectionProps = {
    osmId: string;
};

const MAX_CHARS = 255;

export function CommentsSection({ osmId }: CommentsSectionProps) {
    // Liste des commentaires et état de chargement
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState<boolean>(true);
    const [errorComments, setErrorComments] = useState<string | null>(null);

    // États du formulaire
    const [commentTitle, setCommentTitle] = useState('');
    const [commentDescription, setCommentDescription] = useState('');
    const [commentRating, setCommentRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Vérification de la connexion
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const textColor = useThemeColor({}, 'text');
    const cardBg = useThemeColor({}, 'card');
    const router = useRouter();

    // Vérifier la connexion en cherchant un token
    useEffect(() => {
        const checkConnection = async () => {
            const connected = await isUserConnected();
            setIsLoggedIn(connected);
        };
        checkConnection();
    }, []);

    // Récupération des commentaires via POST /comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiClient.post('/comments', { osmId });
                setComments(response.data);
            } catch (error) {
                setErrorComments("Erreur lors du chargement des commentaires.");
            } finally {
                setLoadingComments(false);
            }
        };
        fetchComments();
    }, [osmId]);

    // Fonction pour soumettre un nouveau commentaire via POST /comment/add
    const handleSubmitComment = async () => {
        if (!commentTitle.trim() || !commentDescription.trim()) return;
        setSubmitting(true);
        try {
            // Remplacez cet appel par votre appel réel à l'API
            const response = await apiClient.post('/comment/add', {
                osmId,
                title: commentTitle,
                description: commentDescription,
                note: commentRating,
            });
            // Ajoutez le nouveau commentaire au début de la liste
            setComments(prev => [response.data, ...prev]);
            setCommentTitle('');
            setCommentDescription('');
            setCommentRating(0);
        } catch (error) {
            console.warn("Erreur lors de la soumission du commentaire", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card style={[styles.cardContainer, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>Commentaires</Text>

            {/* Liste horizontale des commentaires */}
            {loadingComments ? (
                <ActivityIndicator size="small" color="#0a7ea4" />
            ) : errorComments ? (
                <Text style={[styles.errorText, { color: textColor }]}>{errorComments}</Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.commentsList}>
                    {comments.map(comment => (
                        <TouchableOpacity key={comment.id} style={styles.commentCard}>
                            <View style={styles.commentHeader}>
                                <Text style={[styles.commentRating, { color: '#FFD700' }]}>
                                    {comment.rating}{' '}
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                </Text>
                                <Text style={[styles.commentTitle, { color: textColor }]} numberOfLines={1}>
                                    {comment.title}
                                </Text>
                            </View>
                            <Text style={[styles.commentDescription, { color: textColor }]} numberOfLines={3}>
                                {comment.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Séparateur */}
            <View style={styles.divider} />

            {/* Formulaire de commentaire ou message de connexion */}
            {isLoggedIn ? (
                <View style={styles.formContainer}>
                    <TextInput
                        style={[styles.input, { color: textColor }]}
                        placeholder="Titre (max 255 caractères)"
                        placeholderTextColor="#aaa"
                        value={commentTitle}
                        onChangeText={setCommentTitle}
                        maxLength={MAX_CHARS}
                    />
                    <Text style={[styles.charCount, { color: textColor }]}>{commentTitle.length}/{MAX_CHARS}</Text>

                    <TextInput
                        style={[styles.input, styles.multiline, { color: textColor }]}
                        placeholder="Description (max 255 caractères)"
                        placeholderTextColor="#aaa"
                        value={commentDescription}
                        onChangeText={setCommentDescription}
                        maxLength={MAX_CHARS}
                        multiline
                    />
                    <Text style={[styles.charCount, { color: textColor }]}>{commentDescription.length}/{MAX_CHARS}</Text>

                    {/* Champ de notation */}
                    <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }).map((_, index) => {
                            const starNumber = index + 1;
                            return (
                                <TouchableOpacity key={index} onPress={() => setCommentRating(starNumber)}>
                                    <Ionicons
                                        name={starNumber <= commentRating ? 'star' : 'star-outline'}
                                        size={24}
                                        color={starNumber <= commentRating ? '#FFD700' : '#ccc'}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
                        {submitting ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Envoyer</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.notLoggedContainer}>
                    <Text style={[styles.notLoggedText, { color: textColor }]}>
                        Vous devez être{' '}
                        <Text style={styles.link} onPress={() => router.push('/login')}>
                            connecté
                        </Text>{' '}
                        pour écrire un commentaire.
                    </Text>
                </View>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 14,
        textAlign: 'center',
    },
    commentsList: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    commentCard: {
        width: 220,
        padding: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#f2f4f7',
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    commentRating: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    commentTitle: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    commentDescription: {
        fontSize: 13,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 15,
    },
    formContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 5,
    },
    multiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    charCount: {
        alignSelf: 'flex-end',
        fontSize: 12,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    notLoggedContainer: {
        padding: 10,
        alignItems: 'center',
    },
    notLoggedText: {
        fontSize: 16,
    },
    link: {
        color: '#0a7ea4',
        textDecorationLine: 'underline',
    },
});

export default CommentsSection;
