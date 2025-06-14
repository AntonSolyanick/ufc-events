"use client";

import { MdLightMode } from "react-icons/md";

import { useTheme } from "../lib/use-theme";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      size={ButtonSize.XL}
      theme={ButtonTheme.SOLID}
    >
      <MdLightMode />
    </Button>
  );
};
