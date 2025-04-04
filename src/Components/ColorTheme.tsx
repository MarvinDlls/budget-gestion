import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export default function ColorTheme() {

  const lightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#6200EE", // Couleur principale personnalisée
      secondary: "#03DAC6", // Couleur secondaire
      background: "#FFFFFF", // Couleur de fond
      surface: "#F5F5F5", // Couleur des surfaces
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "#BB86FC", // Couleur principale pour le thème sombre
      secondary: "#03DAC6", // Couleur secondaire
      background: "#121212", // Fond sombre
      surface: "#1E1E1E", // Surfaces sombres
    },
  };
}