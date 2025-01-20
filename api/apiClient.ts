import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

let API_URL = 'http://localhost:8000/';
if (Constants.expoConfig?.extra?.apiUrl) {
    API_URL = Constants.expoConfig.extra.apiUrl;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 10000,
});

// Flag pour éviter les boucles infinies
let isRefreshing = false;
let failedQueue: any[] = [];

const refreshToken = async () => {
    let refresh_token :string  | null = null;

    if (Platform.OS === 'web') {
        refresh_token = await AsyncStorage.getItem('refresh_token');
    }else {
        refresh_token = await SecureStore.getItemAsync('refresh_token');
    }

    if (!refresh_token) {
        throw new Error('Refresh token non trouvé.');
    }

    const response = await axios.post(`${API_URL}/api/token/refresh`, { refresh_token });
    return response.data.token;
};

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) prom.resolve(token);
        else prom.reject(error);
    });
    failedQueue = [];
};

// Intercepteur de requêtes : Ajoute le token
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token;
        if (Platform.OS === 'web') {
            token = await AsyncStorage.getItem('token');
        }else {
            token = await SecureStore.getItemAsync('token');
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur de réponses : Gère les erreurs 401
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Si un rafraîchissement est déjà en cours, on met la requête en attente
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                });
            }

            isRefreshing = true;

            try {
                const newToken = await refreshToken();

                if (Platform.OS === 'web') {
                    await AsyncStorage.setItem('token', newToken);
                } else {
                    await SecureStore.setItemAsync('token', newToken);
                }

                processQueue(null, newToken);
                isRefreshing = false;

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;

                console.warn('Session expirée, redirection vers Login...');
                if (Platform.OS === 'web') {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('refresh_token');
                } else {
                    await SecureStore.deleteItemAsync('token');
                    await SecureStore.deleteItemAsync('refresh_token');
                }
                router.replace('/login'); // Redirige vers la page de Login

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
