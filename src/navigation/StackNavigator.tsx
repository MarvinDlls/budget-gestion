import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../(tabs)';
import Login from '../(auth)/Login';
import Register from '../(auth)/Register';
import { supabase } from '../../services/supabase'; // Import de Supabase
import Home from '../Screens/Home';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigation.navigate('HomeScreen'); // Redirige vers l'écran Home si l'utilisateur est connecté
      } else {
        navigation.navigate('Login'); // Redirige vers l'écran Login si l'utilisateur n'est pas connecté
      }
    };
    checkSession();
  }, [navigation]);

  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
      >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}  
      />
      <Stack.Screen 
        name="Home" 
        component={Home}  
      />
      <Stack.Screen 
        name="Login" 
        component={Login}      
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
      />
    </Stack.Navigator>
  );
}