import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../services/supabase";
import * as FileSystem from "expo-file-system";

interface ModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  avatarUrl: string;
  updateAvatar: (newUrl: string) => void;
}

export default function ModalPhoto({ visible, setVisible, avatarUrl, updateAvatar }: ModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Sélectionner une image depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPreview(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  // Télécharger l'image vers Supabase Storage
  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      
      // Vérifier que l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");
      
      // Créer un nom de fichier unique basé sur l'ID utilisateur
      const fileExt = uri.split('.').pop();
      const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Convertir l'URI en base64 pour le téléchargement
      const fileBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Télécharger l'image vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, decode(fileBase64), {
          contentType: `image/${fileExt}`,
          upsert: true
        });
      
      if (uploadError) throw uploadError;
      
      // Obtenir l'URL publique de l'image
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const publicUrl = data.publicUrl;
      
      // Mettre à jour le profil utilisateur avec la nouvelle URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Mettre à jour l'avatar dans l'interface
      updateAvatar(publicUrl);
      
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  };

  // Fonction helper pour décoder le base64
  function decode(str: string): Uint8Array {
    const binString = atob(str);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    return bytes;
  }

  // Réinitialiser l'image
  const resetImage = async () => {
    try {
      setUploading(true);
      
      // Vérifier que l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");
      
      // Mettre à jour le profil avec une URL vide
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Réinitialiser l'avatar dans l'interface
      setPreview(null);
      updateAvatar("");
      
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      alert("Erreur lors de la réinitialisation de l'image");
    } finally {
      setUploading(false);
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
            <Text style={styles.modalTitle}>Sélectionner une image</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Dialog.Content style={styles.contentContainer}>
            <View style={styles.avatarContainer}>
              {uploading ? (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#6a11cb" />
                </View>
              ) : null}
              
              <Image 
                source={{ uri: preview || avatarUrl || undefined }} 
                style={styles.avatar}
                defaultSource={require('../../../assets/logoApp.png')} // Ajoutez une image par défaut dans vos assets
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={pickImage}
                disabled={uploading}
              >
                <Ionicons name="images-outline" size={22} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Galerie</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.resetButton]} 
                onPress={resetImage}
                disabled={uploading}
              >
                <Ionicons name="refresh-outline" size={22} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Réinitialiser</Text>
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
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#a18cd1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.48,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resetButton: {
    backgroundColor: "#6a11cb",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E1E1",
  },
});