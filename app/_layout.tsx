import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "../src/context/ThemeContext"; // Ton propre ThemeProvider

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!segments || !router) return;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isAuthGroup = segments[0] === "(auth)";
      const isHomePage = segments[0] === "Home"; 
      
      if (!data.session && !isAuthGroup && !isHomePage) {
        router.replace("/Home");
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
    <ThemeProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/Register" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
