import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import useModal from "../../src/Components/UseModal";
import ModalPhoto from "../modal/ModalPhoto/ModalPhoto";
import { supabase } from "../../services/supabase";

export default function ProfilScreen() {
  const { theme } = useTheme();
  const modalPhoto = useModal();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupérer l'avatar de l'utilisateur connecté
  useEffect(() => {
    const fetchAvatar = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        if (error) console.error("Erreur de récupération:", error);
        else setAvatarUrl(data?.avatar_url || null);
      }
      setLoading(false);
    };

    fetchAvatar();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.photo}>
        <View style={styles.userAvatar}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={50} color="#FFF" />
          )}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={modalPhoto.open}>
          <View style={styles.edit}>
            <Ionicons name="create-outline" size={20} color="#FFF" />
          </View>
          <ModalPhoto 
            visible={modalPhoto.isOpen} 
            setVisible={modalPhoto.close} 
            avatarUrl={avatarUrl || ""} 
            updateAvatar={setAvatarUrl} // Met à jour l'avatar après upload
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
  },
  photo: {
    position: "relative",
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#a18cd1",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  edit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6a11cb",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
});
