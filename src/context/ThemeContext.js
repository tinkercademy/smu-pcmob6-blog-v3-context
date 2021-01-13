import React, { useState, useEffect, createContext, useContext } from "react";
import { useColorScheme } from "react-native-appearance";
import { lightColors, darkColors } from "../../styles/colorThemes";

export const ThemeContext = createContext({
  isDark: false,
  color: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();

  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme) => setIsDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
