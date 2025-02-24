import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../services/supabase"; // Import de Supabase
import ProfileScreen from "../../app/(tabs)/profile";
import SettingsScreen from "../../app/(tabs)/settings";
import Login from "../../app/(auth)/Login";
import Register from "../../app/(auth)/Register";
import HomeScreen from "../../app/(tabs)";
import Home from "../Screens/Home";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigation.navigate("HomeScreen"); // Redirige vers l'écran Home si l'utilisateur est connecté
      } else {
        navigation.navigate("Home"); // Redirige vers l'écran Login si l'utilisateur n'est pas connecté
      }
    };
    checkSession();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
