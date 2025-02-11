import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/components/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import apiClient from '@/api/apiClient';
import {TextStyles} from "@/constants/TextStyles";

export type ListDomainStationsCardProps = {
    domain: string;
    onSelectStation: (osmId: string) => void;
    selectedStationId: string;
};

export function ListDomainStationsCard({ domain, onSelectStation, selectedStationId }: ListDomainStationsCardProps) {
    const [stations, setStations] = useState<any[]>([]);
    const textColor = useThemeColor({}, 'text');
    const cardBg = useThemeColor({}, 'card');

    useEffect(() => {
        (async () => {
            try {
                // Appel de l'API en GET en passant "domain" en paramètre
                const response = await apiClient.get('/stations', {
                    params: { domain },
                });
                // On suppose que l'API renvoie un tableau d'objets station avec au moins { osmId, name }
                const filteredStations = response.data.filter((station: any) => station.osmId !== selectedStationId);
                setStations(filteredStations);
            } catch (error) {
                console.warn('Erreur lors du chargement des stations du domaine:', error);
            }
        })();
    }, [domain, selectedStationId]);

    return (
        <Card style={[styles.cardContainer, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }, TextStyles.cardTitle]}>
                Fait partie de {domain}
            </Text>
            {stations.map((station) => (
                <TouchableOpacity
                    key={station.osmId}
                    style={styles.stationRow}
                    onPress={() => onSelectStation(station.osmId)}
                >
                    <Text style={[styles.stationName, { color: textColor }]}>
                        {station.name}
                    </Text>
                </TouchableOpacity>
            ))}
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
        marginBottom: 10,
    },
    stationRow: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stationName: {
        fontSize: 16,
    },
});
