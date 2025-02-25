import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../../services/supabase';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Page Paramètres</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
}
