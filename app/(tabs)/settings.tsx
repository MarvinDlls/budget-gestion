import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router"; // Remplacé useNavigation par useRouter
import { supabase } from '../../services/supabase';

export default function SettingsScreen() {
  const router = useRouter(); // Utilisation de useRouter au lieu de useNavigation

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.navigate("/Home"); // Ajustez le chemin selon l'emplacement réel
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Page Paramètres</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
}