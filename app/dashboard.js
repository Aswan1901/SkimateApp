import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Contacter un admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDetails}>
                    <IoniconsIcon style={styles.iconPerson} name="person-circle" />
                    <Text style={styles.profileName}>Prénom Nom</Text>
                    <Text style={styles.profileText}>Niveau de ski: Intermédiaire</Text>
                    <Text style={styles.profileText}>Type de ski préféré : hors-piste</Text>
                    <Text style={styles.profileText}>
                        Difficulté préférée : bleu
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Dashboard</Text>
            {/*<View style={styles.horizontalLine}></View>*/}
           </View>

            <ImageBackground
                source={require("../assets/background/pexels-ryank-20042214.jpg")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.bottomContaitner}>
                    <View style={styles.dashboardIcons}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon name="person-skiing-nordic" style={styles.icon} />
                            <Text style={styles.label}>Pistes Parcourues</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('statistics')}>
                                <IoniconsIcon name="stats-chart" style={styles.icon} />
                                <Text style={styles.label}>Statistiques</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.dashboardIcons}>
                        <View style={styles.iconContainer}>
                            <IoniconsIcon name="cloudy" style={styles.icon} />
                            <Text style={styles.label}>Météo</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <IoniconsIcon name="settings" style={styles.icon} />
                            <Text style={styles.label}>Paramètre</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <IoniconsIcon name="location" style={styles.navIcon} />
                            <Text style={styles.label}>Navigation</Text>
                        </View>
                    </View>
                </View>
        </ImageBackground>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
    profile: {
        backgroundColor: "#add8e6",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    iconPerson:{
        fontSize: 80,
        color:'#ffffff',
    },

    buttonText: {
        fontSize: 12,
        color: "#333",
        fontWeight: "bold",
    },
    profileDetails: {
        alignItems: "center",
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 5,
    },
    profileText: {
        fontSize: 14,
        color: "#fff",
    },
    titleContainer: {

        borderBottomColor:"#0a0647",
        // borderBottomWidth: 3,
        backgroundColor:"#fff",
        height:50,
        borderBottomWidth: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize:20,
        fontWeight:'bold'
    },

    dashboardIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    iconContainer: {
        alignItems: "center",
    },
    icon: {
        backgroundColor: "#0a0647",
        padding: 15,
        borderRadius: 50,
        marginBottom: 5,
        fontSize: 40,
        color: '#fff',
    },
    navIcon: {
        backgroundColor: "#0a0647",
        padding: 15,
        borderRadius: 50,
        marginBottom: 5,
        fontSize: 40,
        color: 'red',
    },
    label: {
        color: "#000",
        fontSize: 12,
        textAlign: "center",
    },
    bottomContaitner:{
        justifyContent:"center"
    }
});

export default Dashboard;
