import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import React, {useState} from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import {useRouter} from "expo-router";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';
import apiClient from "@/api/apiClient";
import {useThemeColor} from "@/hooks/useThemeColor";
import { router } from 'expo-router';


const  SettingScreen: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phoneNumber, setphoneNumber] = useState<string>('');
    const [isPressed, setIsPressed] = useState<string | null>(null);
    // const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const text = useThemeColor({}, 'text');
    const whiteText = useThemeColor({}, 'whiteText');
    const router = useRouter();
    const handlePress=(button: string)=>{
        setIsPressed(button);
    }

    const handleUpdate = async ()=>{
        try {
            const userToken = Platform.OS === 'web' ?
                await AsyncStorage.getItem('token') :
                await SecureStore.getItemAsync('token');

            if(!userToken){
                setError('utilisateur non trouvé')
                return;
            }

            const response = await apiClient.put(`utilisateur/edit/${userToken}`, {
                email: email,
                name:name,
                lastname: lastname,
                phoneNumber: phoneNumber,
            })

        }catch (error){
            if (error.response && error.response.data){
                setError(error.response.data || 'Une erreur est survenue.');
            }else {
                setError('Impossible d\'enregistré les données.')
            }
        }
    }

    const handleLogout = async () => {
        try {

            let token;
            let refreshToken;

            if (Platform.OS === 'web'){
                refreshToken = await AsyncStorage.getItem("refresh_token");
                token = await AsyncStorage.getItem("token");
            }else {
                refreshToken = await SecureStore.getItemAsync("refresh_token");
                token = await SecureStore.getItemAsync("token");
            }

            if (refreshToken != null && token != null) {
                if (Platform.OS === 'web'){
                    await AsyncStorage.removeItem("refresh_token");
                    await AsyncStorage.removeItem("token");
                }else{
                    await SecureStore.deleteItemAsync("refresh_token");
                    await SecureStore.deleteItemAsync("token");
                }
                router.push('/login');
            }
        }catch (error){
            console.error(error);
        }
    }
    return(
        <View style={styles.mainContainer}>
            <ImageBackground
                source={require('../assets/background/pexels-ryank-20042214.jpg')}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Text style={[styles.skiLevelText, {color:text}]}>
                        Niveau de ski: Intermédiaire
                    </Text>
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                placeholderTextColor="#000000"
                                value={email}
                            />
                            <TouchableOpacity><AntDesign style={styles.editBtn} name="edit"/></TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Prenom"
                                // onChangeText={setPrenom}
                                placeholderTextColor="#000000"
                                value={name}
                            />
                            <TouchableOpacity><AntDesign style={styles.editBtn} name="edit"/></TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                // onChangeText={setNom}
                                placeholderTextColor="#000000"
                                // value={nom}
                            />
                            <TouchableOpacity><AntDesign style={styles.editBtn} name="edit"/></TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Telephone"
                                // onChangeText={setTelephone}
                                placeholderTextColor="#000000"
                                // value={telephone}
                                keyboardType="phone-pad"
                            />
                            <TouchableOpacity><AntDesign style={styles.editBtn} name="edit"/></TouchableOpacity>
                        </View>

                        <View>
                            <Text style={[styles.text,{color: text}]}>Type de ski</Text>
                            <View style={styles.containerPreference}>
                                <TouchableOpacity
                                    style={[styles.button, isPressed === 'piste' ? styles.buttonPressed : null ]} onPress={()=>handlePress("piste")}>
                                    <Text style={[styles.buttonText, isPressed === "piste" ? styles.buttonPressedText : null]} onPress={()=>handlePress("piste")}>Piste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button2, isPressed === 'hors-piste' ? styles.buttonPressed : null ]} onPress={()=>handlePress("hors-piste")}>
                                    <Text style={[styles.buttonText, isPressed === "hors-piste" ? styles.buttonPressedText : null]} onPress={()=>handlePress("hors-piste")}>Hors-piste</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button3, isPressed === 'freestyle' ? styles.buttonPressed : null ]} onPress={()=>handlePress("freestyle")}>
                                    <Text style={[styles.buttonText, isPressed === "freestyle" ? styles.buttonPressedText : null]} onPress={()=>handlePress("freestyle")}>Freestyle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.text,{color: text}]}>Niveau de difficulté</Text>
                            <View style={styles.containerPreference}>
                                <TouchableOpacity
                                    style={[styles.button, isPressed === 'Vert' ? styles.buttonPressed : null ]} onPress={()=>handlePress("Vert")}>
                                    <Text style={[styles.buttonText, isPressed === "Vert" ? styles.buttonPressedText : null]} onPress={()=>handlePress("Vert")}>Vert</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button2, isPressed === 'Bleu' ? styles.buttonPressed : null ]} onPress={()=>handlePress("Bleu")}>
                                    <Text style={[styles.buttonText, isPressed === "Bleu" ? styles.buttonPressedText : null]} onPress={()=>handlePress("Bleu")}>Bleu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button2, isPressed === 'Rouge' ? styles.buttonPressed : null ]} onPress={()=>handlePress("Rouge")}>
                                    <Text style={[styles.buttonText, isPressed === "Rouge" ? styles.buttonPressedText : null]} onPress={()=>handlePress("Rouge")}>Rouge</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button3, isPressed === 'Noir' ? styles.buttonPressed : null ]} onPress={()=>handlePress("Noir")}>
                                    <Text style={[styles.buttonText, isPressed === "Noir" ? styles.buttonPressedText : null]} onPress={()=>handlePress("Noir")}>Noir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                       <View style={styles.btnsContainer}>
                           {/*<SelectDropdown>*/}
                           {/*    */}
                           {/*</SelectDropdown>*/}

                           <TouchableOpacity style={styles.adminBtn}>
                               <Text style={{ color: text }} onPress={()=> router.push('/chat')}>Contacter un admin</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.logoutBtn}>
                               <Text style={[styles.logoutBtnText,{color:whiteText}]} onPress={handleLogout}> Déconnexion</Text>
                           </TouchableOpacity>
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
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50,

    },
    skiLevelText: {
        marginBottom:30,
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputContainer: {
        marginBottom: 20,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    input: {
       width:280
    },
    editBtn:{
        marginTop:10,
        fontSize:16
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        width:80,
    },
    button2: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft:10,
        alignItems: 'center',
        marginTop: 20,
        width:90,
    },
    button3: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        width:80,
    },
    buttonText: {
        color: '#0A3A5D',
        fontSize: 16,
    },
    buttonPressed:{
        backgroundColor:'#0A3A5D',
        color:'#fff'
    },
    buttonPressedText:{
        color:'#fff'
    },
    containerPreference:{
        flexDirection:'row',
        justifyContent:'center',
    },
    adminBtn:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 20,
        width:200,
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 25,
    },
    logoutBtn:{
        backgroundColor: 'red',
        paddingVertical: 10,
        marginTop: 20,
        width:200,
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        color:'#fff',
    },
    btnsContainer:{
        alignItems:'center',
    },
    logoutBtnText:{
        color:'#fff',
    },
    iconLogout:{
        paddingLeft:5,
        fontSize:12
    },
    text:{
        marginTop:20,
        fontWeight:'bold',
        textTransform:"uppercase",
        color:"#0A3A5D"
    },
})
export default SettingScreen