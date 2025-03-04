import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { supabase } from '../services/supabase';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onMenuItemPress: (route: string) => void;
}

export default function SideMenu ({ visible, onClose, onMenuItemPress }: SideMenuProps) {
  const router = useRouter();
  const [animation] = useState(new Animated.Value(-300));

  const handleLogout = async () => {
      await supabase.auth.signOut();
      router.navigate("/Home");
    };
  
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
                <Ionicons name="person" size={40} color="#FFF" />
              </View>
              <Text style={styles.userName}>Utilisateur</Text>
              <Text style={styles.userEmail}>utilisateur@example.com</Text>
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
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out" size={24} color="#FFF" />
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

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
    },
    logoutButton: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: '#a18cd1',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 30,
    },
    logoutText: {
      marginLeft: 10,
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });