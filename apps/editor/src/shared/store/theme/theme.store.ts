import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { generateColorShades } from "@/shared/utils/color-generator";
import type { IThemeStoreState, IThemeStoreActions } from "./theme.model";

const DEFAULT_THEME: IThemeStoreState = {
  colors: {
    primary: {
      base: "#3b82f6",
      shades: generateColorShades("#3b82f6"),
    },
  },
  typography: {
    fontFamily: {
      base: "system-ui, -apple-system, sans-serif",
      heading: "system-ui, -apple-system, sans-serif",
    },
  },
};

export const useThemeStore = create<IThemeStoreState & IThemeStoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...DEFAULT_THEME,

        // Color actions
        setPrimaryColor: (color: string) => {
          try {
            const shades = generateColorShades(color);
            set({
              colors: {
                ...get().colors,
                primary: {
                  base: color,
                  shades,
                },
              },
            });
          } catch (error) {
            console.error("Invalid color format:", error);
          }
        },

        setSecondaryColor: (color: string) => {
          try {
            const shades = generateColorShades(color);
            set({
              colors: {
                ...get().colors,
                secondary: {
                  base: color,
                  shades,
                },
              },
            });
          } catch (error) {
            console.error("Invalid color format:", error);
          }
        },

        setTertiaryColor: (color: string) => {
          try {
            const shades = generateColorShades(color);
            set({
              colors: {
                ...get().colors,
                tertiary: {
                  base: color,
                  shades,
                },
              },
            });
          } catch (error) {
            console.error("Invalid color format:", error);
          }
        },

        removeSecondaryColor: () => {
          set({
            colors: {
              ...get().colors,
              secondary: undefined,
            },
          });
        },

        removeTertiaryColor: () => {
          set({
            colors: {
              ...get().colors,
              tertiary: undefined,
            },
          });
        },

        // Typography actions
        setFontFamily: (type: "base" | "heading", fontFamily: string) => {
          set({
            typography: {
              ...get().typography,
              fontFamily: {
                ...get().typography.fontFamily,
                [type]: fontFamily,
              },
            },
          });
        },

        // Utility actions
        resetTheme: () => {
          set(DEFAULT_THEME);
        },
      }),
      {
        name: "theme-store",
      },
    ),
    {
      name: "ThemeStore",
    },
  ),
);
