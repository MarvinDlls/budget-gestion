import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";

interface ModalProps {
  visible: boolean;
  setVisible: () => void;  // Fonction pour fermer la modal
}

export default function ModalAccount({ visible, setVisible }: ModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={setVisible} // Correction : on appelle directement `setVisible`
        style={styles.dialogContainer}
      >
        <View style={styles.wrapper}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Gestion du compte</Text>
            <TouchableOpacity onPress={setVisible} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Dialog.Content style={styles.contentContainer}>
            <Text style={styles.description}>
              Personnalisez votre expérience avec un thème qui vous correspond.
            </Text>
          </Dialog.Content>
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "visible",
  },
  dialogContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "300",
  },
  contentContainer: {
    paddingVertical: 20,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    fontSize: 16,
  },
});