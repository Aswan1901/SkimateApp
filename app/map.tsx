import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import apiClient from '../api/apiClient'; // Chemin vers votre instance Axios

export enum MapStyle {
    Satellite = "https://tiles.openskimap.org/styles/satellite.json",
    Terrain = "https://tiles.openskimap.org/styles/terrain.json",
}

Mapbox.setAccessToken('pk.eyJ1IjoibWF0MzdkZXYiLCJhIjoiY20zem05djIyMXRhdjJycjMwMWQ1NnB4aiJ9.oXN2Mbnd5NSippekvvm5vw');

const { width, height } = Dimensions.get('window');

const MyMapScreen = () => {
    const [featuresData, setFeaturesData] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const mapRef = useRef<Mapbox.MapView>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const domaine = 'Paradiski';
                const response = await apiClient.post('/api/get-ski-domain', { domaine });
                setFeaturesData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const onMapPress = (e) => {
        const { features } = e;
        if (features && features.length > 0) {
            const clickedFeature = features[0];
            setSelectedFeature(clickedFeature);
        } else {
            setSelectedFeature(null);
        }
    };

    return (
        <View style={styles.container}>
            <Mapbox.MapView
                ref={mapRef}
                style={styles.map}
                styleURL={MapStyle.Terrain} // ou MapStyle.Satellite
                onPress={onMapPress}
                pitchEnabled={true}
                rotateEnabled={true}
                zoomEnabled={true}
            >
                <Mapbox.Camera
                    zoomLevel={12}
                    centerCoordinate={[6.768, 45.553]} // Coordonnées à adapter
                    pitch={45}
                    heading={0}
                    animationDuration={1000}
                />

                {featuresData && (
                    <Mapbox.ShapeSource
                        id="ski-data"
                        shape={featuresData}
                    >
                        <Mapbox.LineLayer
                            id="pistes-layer"
                            sourceID="ski-data"
                            filter={['==', ['get', 'category'], 'piste']}
                            style={{}}
                        />

                        <Mapbox.SymbolLayer
                            id="remontees-layer"
                            sourceID="ski-data"
                            filter={['==', ['get', 'category'], 'lift']}
                            style={{}}
                        />

                        <Mapbox.SymbolLayer
                            id="structures-layer"
                            sourceID="ski-data"
                            filter={['in', ['get', 'category'], 'restaurant', 'wc', 'picnic', 'viewpoint', 'information']}
                            style={{}}
                        />

                        <Mapbox.SymbolLayer
                            id="stations-layer"
                            sourceID="ski-data"
                            filter={['==', ['get', 'type'], 'station']}
                            style={{}}
                        />
                    </Mapbox.ShapeSource>
                )}
            </Mapbox.MapView>

            {selectedFeature && (
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Informations</Text>
                    <Text>Nom: {selectedFeature.properties?.tags?.name || selectedFeature.properties?.name}</Text>
                    <Text>Catégorie: {selectedFeature.properties?.category || selectedFeature.properties?.type}</Text>
                    {selectedFeature.properties?.category === 'piste' && (
                        <Text>Difficulté: {selectedFeature.properties?.tags?.['piste:difficulty']}</Text>
                    )}
                    <Text>Source: {selectedFeature.properties?.source}</Text>
                    <Text>Validé: {selectedFeature.properties?.validated ? 'Oui' : 'Non'}</Text>
                </View>
            )}
        </View>
    );
};

export default MyMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width,
        height,
    },
    infoBox: {
        position: 'absolute',
        bottom: 30,
        left: 10,
        right: 10,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
