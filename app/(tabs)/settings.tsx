import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from '../../services/supabase';
import { Ionicons } from '@expo/vector-icons';
import useModal from "../../src/Components/UseModal";
import ThemeModal from "../modal/ModalPref/Theme";
import ModalGestion from '../modal/ModalGestion/ModalGestion';

export default function SettingsScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const modalGestion = useModal();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.navigate("/Home");
  };

  type IconName = "person-circle-outline" | "options-outline" | "wallet-outline" | "shield-checkmark-outline";

  const settingsSections: { title: string; icon: IconName; onPress: () => void }[] = [
    {
      title: "Compte",
      icon: "person-circle-outline",
      onPress: () => router.navigate("/settings/account")
    },
    {
      title: "Préférences de l'application",
      icon: "options-outline",
      onPress: () => setVisible(true) // Ouvre la modal du thème
    },
    {
      title: "Gestion du budget",
      icon: "wallet-outline",
      onPress: modalGestion.open
    },
    {
      title: "Confidentialité et Sécurité",
      icon: "shield-checkmark-outline",
      onPress: () => router.navigate("/settings/privacy")
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {settingsSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={section.onPress}
          >
            <View style={styles.settingContent}>
              <View style={styles.iconContainer}>
                <Ionicons name={section.icon} size={24} color="#5D5FEF" />
              </View>
              <Text style={styles.settingTitle}>{section.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal pour le thème (visible seulement quand on appuie sur "Préférences de l'application") */}
      <ModalGestion visible={modalGestion.isOpen} setVisible={modalGestion.close} />
      <ThemeModal visible={visible} setVisible={setVisible} />

      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');
const contentHeight = height * 0.6; // 60% de la hauteur de l'écran

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'space-between'
  },
  header: {
    padding: 20,
    paddingBottom: 10
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  settingTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500'
  },
  footerContainer: {
    marginBottom: 30,
    alignItems: 'center'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500'
  }
});
