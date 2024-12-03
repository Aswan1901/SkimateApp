import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';

const Statistics = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={require("../assets/background/pexels-ryank-20042214.jpg")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.topContainer}>
                    <View style={styles.chronoContainer}>
                        <Text style={styles.textStyle}>Distance : 00km</Text>
                        <Text style={styles.textStyle}>Temps : 00:00</Text>
                    </View>
                    <View style={styles.iconChrono}>
                        <TouchableOpacity><EntypoIcon style={styles.stopWatchIcon} name="stopwatch"/></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.sessionsContainer}>
                            <View style={styles.sessionTextContainer}>
                                <Text style={styles.sessionText}>Session 1 : 20km en 1:00</Text>
                                <Text style={styles.sessionText}>Session 2 : 20km en 1:00</Text>
                                <Text style={styles.sessionText}>Session 3 : 20km en 1:00</Text>
                            {/*</View>*/}
                        </View>
                            <View style={styles.sessionTextContainer}>
                                <Text style={styles.sessionText}>Session 1 : 20km en 1:00</Text>
                                <Text style={styles.sessionText}>Session 2 : 20km en 1:00</Text>
                                <Text style={styles.sessionText}>Session 3 : 20km en 1:00</Text>
                            </View>
                        </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.row}>
                            <View style={styles.totalStats}>
                                <Text style={styles.statsText}>Nombre de descentes effectuées aujourd’hui: 5 descentes</Text>
                            </View>
                            <View style={styles.totalStats}>
                                <Text style={styles.statsText}>Temps moyen par descente : 20minutes</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.totalStats}>
                                <Text style={styles.totalStatsText}>distance total : 20km</Text>
                            </View>
                            <View style={styles.totalStats}>
                                <Text style={styles.totalStatsText}>distance total : 20km</Text>
                            </View>
                        </View>
                    </View>
                    </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    topContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    chronoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    stopWatchIcon: {
        fontSize: 120,
        color: '#333',
        marginTop: 20,
    },
    sessionsContainer: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        opacity:0.84,
        flexDirection:"row",
        margin:"auto",
        justifyContent:"space-around",
    },
    row: {
        marginBottom: 10,
        flexDirection:'row',
    },
    sessionText: {
        fontSize: 11,
        textAlign: 'center',
        color: '#555',
        marginVertical: 5,
    },
    statsContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        margin: 15,
    },

    totalStatsText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },
    iconsContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    skiIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 5,
        marginRight:11
    },
    icon: {
        fontSize: 30,
        color: '#fff',
    },
    totalStats: {
        flexDirection:"row",
        marginTop: 5,
        width:"50%",
    },
    statsText:{
        fontSize:10,
    },
});

export default Statistics;
