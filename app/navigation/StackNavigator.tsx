import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../(auth)/Login';
import Home from '../Screens/Home';
import HomeScreen from '../(tabs)';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
