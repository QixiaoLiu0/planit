import { get, set, STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeName =
  | "teal"
  | "terracotta"
  | "olive"
  | "mustard"
  | "lavender"
  | "mauve";

interface ThemeContextType {
  themeName: ThemeName;
  activeColors: { primary: string; light: string };
  changeTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("teal");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await get<ThemeName>(STORAGE_KEYS.THEME);

        if (savedTheme) {
          setThemeName(savedTheme);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (name: ThemeName) => {
    setThemeName(name);
    try {
      await set(STORAGE_KEYS.THEME, name);
    } catch (error) {
      console.error(error);
    }
  };

  const activeColors = useMemo(() => {
    return {
      primary: theme.themeColors[themeName],
      light:
        theme.themeColors[
          `${themeName}Light` as keyof typeof theme.themeColors
        ],
    };
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, activeColors, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be wrappered with ThemeProvider");
  }

  return context;
};
