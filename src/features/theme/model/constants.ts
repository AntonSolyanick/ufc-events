export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Theme = keyof typeof THEMES;
export type ThemeValue = (typeof THEMES)[keyof typeof THEMES];

export const DEFAULT_THEME = THEMES.LIGHT;
export const STORAGE_KEY = "theme-preference";
