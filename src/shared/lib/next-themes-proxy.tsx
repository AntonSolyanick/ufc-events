"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import {
  DEFAULT_THEME,
  STORAGE_KEY,
} from "@/features/ThemeSwitcher/model/constants";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      storageKey={STORAGE_KEY}
    >
      {children}
    </NextThemesProvider>
  );
}
