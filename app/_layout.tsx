import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../src/Components/Colors";
import { StyleSheet, View } from "react-native";

// Fonction pour vérifier l'authentification
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!segments || !router) return; // Vérification pour éviter l'erreur

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isAuthGroup = segments[0] === "(auth)";

      if (!data.session && !isAuthGroup) {
        router.replace("/(auth)/Login");
      } else if (data.session && isAuthGroup) {
        router.replace("/(tabs)");
      }
    };

    checkSession();
  }, [segments, router]);
}

export default function RootLayout() {
  useProtectedRoute();

  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Register" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
