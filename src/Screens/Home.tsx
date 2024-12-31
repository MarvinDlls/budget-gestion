import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../Components/Colors";
import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

const registerLogo = require('../../assets/registerLogo.png');


function Home() {

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return(
        <LinearGradient
            colors={[Colors.Gradient1, Colors.Gradient2]}
            style={styles.container}
        >
        <View style={styles.container}>

        <View style={styles.button}>
            <TouchableOpacity style={styles.buttonOne}>
                <Text style={styles.textInput}>Se Connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTwo}>
                <Text style={styles.textInput}>S'inscrire</Text>
                <Image source={registerLogo} style={{width: 24, height: 24}} />
            </TouchableOpacity>
        </View>

        </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
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
        justifyContent: 'center'
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