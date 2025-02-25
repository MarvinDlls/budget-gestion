import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../src/Components/Colors";
import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NavigationProp } from '@react-navigation/native';

const registerLogo = require('../../assets/registerLogo.png');
const loginLogo = require('../../assets/loginLogo.png');
const logoApp = require('../../assets/logoApp.png');

type HomeProps = {
    navigation: NavigationProp<any>;
};

function Home({ navigation }: HomeProps) {

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return(
        <LinearGradient
            colors={[Colors.Gradient1, Colors.Gradient2]}
            style={styles.main}
        >
        <View style={styles.content}>
            <Text style={styles.title}>Bienvenue sur</Text>
            <Image source={logoApp} style={styles.logo}/>
            <View style={styles.main}>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.buttonOne} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textInput}>Se Connecter</Text>
                        <Image source={loginLogo} style={{width: 24, height: 24}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.textInput}>S'inscrire</Text>
                        <Image source={registerLogo} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    content: {
        alignItems: 'center',
    },
    title:{
        top: 150,
        fontSize: 25,
        fontFamily: 'Roboto_700Bold',
        // transform: [{rotate: "-25deg"}]
    },
    logo: {
        width: 200,
        height: 200,
        top: 250,
        borderWidth: 4,
        borderRadius: 100,
    },
    button: {
        flexDirection: 'row',
        bottom: 55,
        width: '80%',
        justifyContent: 'space-between',
    },
    buttonOne: {
        height: 50,
        borderColor: '#d9d9D9',
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        width: '45%',
        marginBottom: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row-reverse'
    },
    buttonTwo: {
        height: 50,
        borderColor: '#d9d9D9',
        borderWidth: 1,
        borderRadius: 25,
        width: '45%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        flexDirection: 'row-reverse'
    },
    textInput: {
        fontSize: 15,
        fontFamily: 'Roboto_700Bold',
    }
})

export default Home;