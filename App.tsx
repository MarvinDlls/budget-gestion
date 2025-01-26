import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import Colors from './src/Components/Colors';
import Welcome from './src/Pages/Welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LinearGradient
      colors={[Colors.Gradient1, Colors.Gradient2]}
      style={styles.container}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name='Welcome' component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});