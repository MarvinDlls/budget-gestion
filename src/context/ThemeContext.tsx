import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';

// Définition des types pour les thèmes
interface Theme {
  backgroundColor: string;
  textColor: string;
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Valeur par défaut du contexte
const defaultTheme: Theme = {
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
};

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
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Définition des thèmes pour React Native Paper
  const paperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.backgroundColor,
      text: theme.textColor,
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};