import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définition des types pour les thèmes
interface Theme {
  backgroundColor: string;
  textColor: string;
  name?: string;
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Valeur par défaut du contexte
const defaultTheme: Theme = {
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  name: 'Par défaut'
};

// Clé pour stocker le thème dans AsyncStorage
const THEME_STORAGE_KEY = 'app_theme';

// Création du contexte
const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);

// Composant Provider pour envelopper l'application
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Charger le thème depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('Erreur lors du chargement du thème :', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Fonction pour définir et sauvegarder le thème
  const setTheme = async (newTheme: Theme) => {
    try {
      // Mettre à jour l'état
      setThemeState(newTheme);
      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème :', error);
    }
  };

  // Définition des thèmes pour React Native Paper
  const paperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.backgroundColor,
      text: theme.textColor,
    },
  };

  // Attendre que le thème soit chargé avant de rendre les enfants
  if (!isThemeLoaded) {
    // Vous pouvez ajouter un écran de chargement ici si nécessaire
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};