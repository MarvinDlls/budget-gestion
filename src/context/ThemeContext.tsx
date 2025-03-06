import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};