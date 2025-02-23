import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Register from '../(auth)/Register';
import HomeScreen from '../(tabs)';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Index" component={HomeScreen} />
    </Stack.Navigator>
  );
}