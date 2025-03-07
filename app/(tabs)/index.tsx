import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

export default function IndexScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={{ color: theme.textColor }}>Bienvenue sur la Page d'Accueil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
