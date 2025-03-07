import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void; 
    onConfirm?: () => void;  
}

export default function EtesVousSur({ visible, setVisible, onConfirm }: ModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.dialogContainer}
      >
        <View style={styles.wrapper}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirmation</Text>
          </View>

          <Dialog.Content style={styles.contentContainer}>
            <Text style={styles.description}>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={() => setVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Non</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleConfirm}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
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
      alignItems: "center",
      justifyContent: "center",
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
    buttonContainer: {
      justifyContent: "space-between",
      marginTop: 10,
      flexDirection: 'row-reverse'
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      minWidth: 100,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: "#E0E0E0",
      marginRight: 10,
    },
    confirmButton: {
      backgroundColor: "#FF3B30",
    },
    cancelButtonText: {
      color: "#333",
      fontWeight: "500",
    },
    confirmButtonText: {
      color: "white",
      fontWeight: "500",
    },
  });