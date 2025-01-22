import React, { useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import CollapsibleHeader from "../components/CollapsibleHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Card } from '@/components/Card';
import {globalStyles} from "@/styles/globalStyles";

export default function DashboardScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[styles.container , { backgroundColor } ]}>
            {/* Header : on lui passe la valeur scrollY */}
            <CollapsibleHeader
                scrollY={scrollY}
                title="Dashboard"
            />

            {/* Le contenu défilable */}
            <Animated.ScrollView
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // false pour pouvoir animer la hauteur
                )}
                scrollEventThrottle={16} // fréquence de mise à jour de l'event scroll
            >
                <View style={[globalStyles.screenContainer]}>
                    <Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card><Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card><Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card><Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card><Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card><Card>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                        <Text style={{ color: textColor }}>Ma première card</Text>
                    </Card>
                    <Card>
                        <Text style={{ color: textColor }}>Ma deuxième card</Text>
                    </Card>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 50,
    },
});
