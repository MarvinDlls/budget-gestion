import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Components/Colors';
import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import DismissKeyboard from '../Components/DismissKeyboard';
import Input from '../Components/Input';

const Back = require('../../assets/back.png');


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
        <TouchableOpacity style={styles.logo}>
          <Image source={Back} style={{width: 35, height: 35}} />
        </TouchableOpacity>
        <Text style={styles.title}>Inscription</Text>
        <Input />
      </View>    
      </LinearGradient>
    </DismissKeyboard>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
    marginBottom: 15
  },
  logo: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 55
  }
});