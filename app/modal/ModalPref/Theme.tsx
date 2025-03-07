import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { useTheme } from "../../../src/context/ThemeContext";

interface ModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function ThemeModal({ visible, setVisible }: ModalProps) {
  const { setTheme } = useTheme(); // Récupération de la fonction setTheme
  const themes = [
    { name: 'Par défaut', backgroundColor: '##F5F7FA', textColor: '#333333' },
    { name: 'Sombre', backgroundColor: '#02395e', textColor: '#FFFFFF' },
    { name: 'Océan', backgroundColor: '#E0F2F1', textColor: '#00695C' },
    { name: 'Pastel', backgroundColor: '#F3E5F5', textColor: '#6A1B9A' },
    { name: 'Néon', backgroundColor: '#0A192F', textColor: '#64FFDA' },
  ];

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.dialogContainer}
      >
        <View style={styles.wrapper}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir un thème</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Dialog.Content style={styles.contentContainer}>
            <Text style={styles.description}>
              Personnalisez votre expérience avec un thème qui vous correspond
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.themeScrollContainer}
            >
              {themes.map((theme, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeOption,
                    {
                      backgroundColor: theme.backgroundColor,
                      borderColor: theme.textColor,
                    },
                  ]}
                  onPress={() => {
                    setTheme(theme);  // Changement du thème
                    setVisible(false);
                  }}
                >
                  <Text style={[styles.themeName, { color: theme.textColor }]}>
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "visible", // Empêche le problème de shadow
  },
  dialogContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 16,
  },
  themeScrollContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  themeOption: {
    width: 120,
    height: 160,
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
  }
});