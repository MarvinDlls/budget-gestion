import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; 
import SideMenu from '../SideMenu';

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleMenuItemPress = (route: string) => {
    // Naviguer vers la route spécifiée
    router.navigate(route);
  };

  return (
    <>
      <SideMenu 
        visible={menuVisible} 
        onClose={closeMenu}
        onMenuItemPress={handleMenuItemPress}
      />
      
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Accueil",
            headerLeft: () => (
              <TouchableOpacity onPress={openMenu} style={{ marginLeft: 15 }}>
                <Ionicons name="menu" size={24} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Paramètres",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}