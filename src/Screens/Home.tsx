import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../Components/Colors";


function Home() {
    return(
        <LinearGradient
            colors={[Colors.Gradient1, Colors.Gradient2]}
            style={styles.container}
        >
        <View style={styles.container}>

        <View style={styles.button}>
            <TouchableOpacity style={styles.buttonOne}>
                <Text>Se Connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTwo}>
                <Text>S'inscrire</Text>
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
        bottom: 50,
    },
    buttonOne: {
        height: 50,
        borderColor: '#d9d9D9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    buttonTwo: {
        height: 50,
        borderColor: '#d9d9D9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: 'white'
    }
})

export default Home;