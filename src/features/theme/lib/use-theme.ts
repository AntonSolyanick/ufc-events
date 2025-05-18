"use client";
import { useTheme as useNextTheme } from "next-themes";
import { THEMES } from "../model/constants";

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return {
    theme,
    toggleTheme,
  };
};
