import { View, Text, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Components/Colors';
import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import DismissKeyboard from '../Components/DismissKeyboard';


export default function Register() {

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <DismissKeyboard>
    <LinearGradient
        colors={[Colors.Gradient1, Colors.Gradient2]}
        style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
        <View style={styles.input}>
            <TextInput>
                <Text>Nom de Famille</Text>
            </TextInput>
        </View>
    </View>
    </LinearGradient>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
  },
  input: {
    alignItems: 'center',
    marginBottom: 50
  }
});