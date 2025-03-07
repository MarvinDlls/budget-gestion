import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

export default function ProfileScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text>Page Profil</Text>
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