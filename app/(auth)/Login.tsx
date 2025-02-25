import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import DismissKeyboard from "../../src/Components/DismissKeyboard";
import { LinearGradient } from "expo-linear-gradient";
import LoginForm from "../../src/Components/LoginForm";
import Colors from '../../src/Components/Colors';
import { Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";

const Back = require('../../assets/back.png');

type LoginProps = {
  navigation: NavigationProp<any>;
};

export default function Login({ navigation }: LoginProps) {
  
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
          <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate('Home')}>
            <Image source={Back} style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
          <Text style={styles.title}>Connexion</Text>
          <LoginForm />
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
