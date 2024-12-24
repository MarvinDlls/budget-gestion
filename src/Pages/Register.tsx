import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Components/Colors';
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';

export default function Register() {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }

      
  return (
    <LinearGradient
        colors={[Colors.Gradient1, Colors.Gradient2]}
        style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.text}>Inscription</Text>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto_400Regular',
    color: '#000',
  },
});