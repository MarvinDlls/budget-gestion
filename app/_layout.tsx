import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { supabase } from "../services/supabase";

// Fonction pour vérifier l'authentification
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isAuthGroup = segments[0] === "(auth)";
      
      if (!data.session && !isAuthGroup) {
        // Rediriger vers login si pas de session et pas dans le groupe auth
        router.replace("/(auth)/Login");
      } else if (data.session && isAuthGroup) {
        // Rediriger vers tabs si session active et dans groupe auth
        router.replace("/(tabs)");
      }
    };
    
    checkSession();
  }, [segments]);
}

export default function RootLayout() {
  useProtectedRoute();
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}