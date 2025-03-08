import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../../services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onMenuItemPress: (route: string) => void;
}

export default function SideMenu({ visible, onClose, onMenuItemPress }: SideMenuProps) {
  const router = useRouter();
  const [animation] = useState(new Animated.Value(-300));
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const updateAvatar = async (newUrl: string) => {
    try {
      await AsyncStorage.setItem('userAvatar', newUrl);
      
      setAvatarUrl(newUrl);
      
      // Éventuellement, mettre à jour les métadonnées utilisateur dans Supabase
      // const { error } = await supabase.auth.updateUser({
      //   data: { avatar_url: newUrl }
      // });
      // if (error) console.error("Erreur lors de la mise à jour des métadonnées:", error);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer l'avatar depuis AsyncStorage
        const storedAvatar = await AsyncStorage.getItem('userAvatar');
        if (storedAvatar) {
          setAvatarUrl(storedAvatar);
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.error("Erreur lors de la récupération de l'utilisateur : ", authError);
          return;
        }
        
        setEmail(user.email ?? null);
        
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Erreur lors de la récupération des données utilisateur:", userError);
        } else if (userData.user) {
          const metadata = userData.user.user_metadata;
          setUsername(metadata?.username || metadata?.full_name || "Utilisateur");
          
          // Si vous stockez l'avatar dans les métadonnées utilisateur, vous pouvez le récupérer ici
          if (metadata?.avatar_url && !storedAvatar) {
            setAvatarUrl(metadata.avatar_url);
          }
        }
      } catch (error) {
        console.error("Erreur générale:", error);
      }
    };
    
    if (visible) {
      fetchUserData();
    }
  }, [visible]);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 0 : -300,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [visible]);

  const menuItems: { title: string; icon: 'heart' | 'mail' | 'time' | 'person-circle' | 'help-circle'; route: string }[] = [
    { title: 'Mes Favoris', icon: 'heart', route: '/favorites' },
    { title: 'Messages', icon: 'mail', route: '/messages' },
    { title: 'Historique', icon: 'time', route: '/history' },
    { title: 'Mon Compte', icon: 'person-circle', route: '/account' },
    { title: 'Aide', icon: 'help-circle', route: '/help' },
  ];

  const handleMenuItemPress = (route: string) => {
    onClose();
    onMenuItemPress(route);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.closeArea} 
            activeOpacity={1} 
            onPress={onClose}
          />
          
          <Animated.View 
            style={[
              styles.menuContainer,
              { transform: [{ translateX: animation }] }
            ]}
          >
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.menuHeader}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.menuTitle}>Menu</Text>
              </View>
              
              <View style={styles.userSection}>
                <View style={styles.userAvatar}>
                  {avatarUrl ? (
                    <Image 
                      source={{ uri: avatarUrl }} 
                      style={styles.avatarImage}
                    />
                  ) : (
                    <Ionicons name="person" size={40} color="#FFF" />
                  )}
                </View>
                <Text style={styles.userName}>{username || "Chargement..."}</Text>
                <Text style={styles.userEmail}>{email || "chargement..."}</Text>
              </View>
              
              <View style={styles.menuItems}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item.route)}
                  >
                    <Ionicons name={item.icon} size={24} color="#333" />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  closeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 280,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  closeButton: {
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#a18cd1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden', // Pour s'assurer que l'image reste dans le cercle
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuItems: {
    marginTop: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  }
});