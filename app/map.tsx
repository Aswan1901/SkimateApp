import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import localStyle from '../assets/mapboxStyle/style.json';
import apiClient from '../api/apiClient';

const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoibWF0MzdkZXYiLCJhIjoiY20zem05djIyMXRhdjJycjMwMWQ1NnB4aiJ9.oXN2Mbnd5NSippekvvm5vw';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const { width, height } = Dimensions.get('window');

const Map = () => {
    // État pour stocker le style final fusionné
    const [mapStyle, setMapStyle] = useState(null);
    // État pour stocker les données GeoJSON
    const [geojsonData, setGeojsonData] = useState(null);

    // 1. Récupérer le style Mapbox Studio et le fusionner au style local
    useEffect(() => {
        const fetchBaseStyle = async () => {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/styles/v1/mat37dev/cm55pxhyi00h801qy4umn4q0t?access_token=${MAPBOX_ACCESS_TOKEN}`
                );
                const baseStyle = await response.json();

                // Fusion : on ajoute nos sources/couches locales dans le style en ligne
                const mergedStyle = {
                    ...baseStyle,
                    sources: {
                        ...(baseStyle.sources || {}),
                        ...(localStyle.sources || {})
                    },
                    layers: [
                        ...(baseStyle.layers || []),
                        ...(localStyle.layers || [])
                    ]
                };

                setMapStyle(mergedStyle);
            } catch (err) {
                console.error('Erreur lors du chargement du style Mapbox Studio :', err);
            }
        };

        fetchBaseStyle();
    }, []);

    // 2. Récupérer vos données GeoJSON depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const domaine = 'Paradiski';
                const response = await apiClient.post('/get-ski-domain', { domaine });
                setGeojsonData(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des données GeoJSON :', error);
            }
        };

        fetchData();
    }, []);

    // 3. Injecter le GeoJSON dans la source "ski-data" (définie dans style.json)
    useEffect(() => {
        if (!mapStyle || !geojsonData) return;

        // Récupérer la data actuelle (si déjà injectée)
        const currentData = mapStyle.sources?.['ski-data']?.data;
        // Si c’est déjà la même data, on ne refait pas de setState pour éviter la boucle
        if (currentData === geojsonData) return;

        // Sinon, on clone l’objet pour injecter le nouveau geojson
        const updatedStyle = {
            ...mapStyle,
            sources: {
                ...mapStyle.sources,
                'ski-data': {
                    ...mapStyle.sources?.['ski-data'],
                    data: geojsonData,
                },
            },
        };

        setMapStyle(updatedStyle);
    }, [mapStyle, geojsonData]);

    // Si le style n’est pas encore prêt, on affiche un écran de chargement
    if (!mapStyle) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Chargement du style fusionné...</Text>
            </View>
        );
    }

    // 4. On fournit le style final fusionné et injecté à la MapView
    return (
        <View style={styles.container}>
            <Mapbox.MapView
                // Ici on passe le style fusionné au format string
                styleJSON={JSON.stringify(mapStyle)}
                style={styles.map}
                pitchEnabled
                rotateEnabled
                zoomEnabled
            >
                {/* On place la caméra sur la zone souhaitée */}
                <Mapbox.Camera
                    zoomLevel={12}
                    centerCoordinate={[6.768, 45.553]}
                    pitch={45}
                    heading={0}
                    animationDuration={1000}
                />
                {/*
          Pas besoin de déclarer <ShapeSource> / <LineLayer> ici
          car ils existent déjà dans votre style local (style.json).
        */}
            </Mapbox.MapView>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width,
        height,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
