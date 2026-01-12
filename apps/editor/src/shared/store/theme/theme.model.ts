import type { ColorShades } from "@/shared/utils/color-generator";

export interface ColorConfig {
  base: string;
  shades: ColorShades;
}

export interface ThemeColors {
  primary: ColorConfig;
  secondary?: ColorConfig;
  tertiary?: ColorConfig;
}

export interface ThemeTypography {
  fontFamily: {
    base: string;
    heading: string;
  };
}

export interface IThemeStoreState {
  colors: ThemeColors;
  typography: ThemeTypography;
}

export interface IThemeStoreActions {
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setTertiaryColor: (color: string) => void;
  removeSecondaryColor: () => void;
  removeTertiaryColor: () => void;

  setFontFamily: (type: "base" | "heading", fontFamily: string) => void;

  resetTheme: () => void;
}
