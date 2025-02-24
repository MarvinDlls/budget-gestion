import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StackNavigator from './src/navigation/StackNavigator'; // Import de StackNavigator
import Colors from './src/Components/Colors';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <LinearGradient
      colors={[Colors.Gradient1, Colors.Gradient2]}
      style={styles.container}
    >
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});