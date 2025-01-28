import { View, Text, StyleSheet } from "react-native";
import Layout from "../Components/layout";

export default function Welcome () {
    return(
        <View style={styles.container}>
            <Text>Yo la team</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%'
    }
})