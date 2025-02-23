import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Simuler une connexion et rediriger vers la bottom bar
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Page de Connexion</Text>
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}