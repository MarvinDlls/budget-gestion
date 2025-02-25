import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../src/Components/Colors';
import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import DismissKeyboard from '../../src/Components/DismissKeyboard';
import { NavigationProp } from '@react-navigation/native';
import RegisterForm from '../../src/Components/RegisterForm';

const Back = require('../../assets/back.png');

type RegisterProps = {
  navigation: NavigationProp<any>;
};


export default function Register({navigation}: RegisterProps) {

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
        <TouchableOpacity style={styles.logo} onPress={() => navigation.goBack()}>
          <Image source={Back} style={{width: 35, height: 35}} />
        </TouchableOpacity>
        <Text style={styles.title}>Inscription</Text>
        <RegisterForm />
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
    top: 5
  },
  logo: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1
  }
});