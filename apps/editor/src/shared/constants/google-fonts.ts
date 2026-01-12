/**
 * Eng mashhur Google Fonts ro'yxati
 * Google Fonts API'dan olingan va curated
 */

export interface GoogleFont {
  family: string;
  category: "sans-serif" | "serif" | "display" | "monospace" | "handwriting";
  variants: string[];
}

export const POPULAR_GOOGLE_FONTS: GoogleFont[] = [
  // Sans-serif
  {
    family: "Inter",
    category: "sans-serif",
    variants: ["400", "500", "600", "700"],
  },
  {
    family: "Roboto",
    category: "sans-serif",
    variants: ["300", "400", "500", "700"],
  },
  {
    family: "Open Sans",
    category: "sans-serif",
    variants: ["300", "400", "600", "700"],
  },
  {
    family: "Poppins",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  { family: "Lato", category: "sans-serif", variants: ["300", "400", "700"] },
  {
    family: "Montserrat",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  { family: "Nunito", category: "sans-serif", variants: ["400", "600", "700"] },
  {
    family: "Raleway",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    variants: ["400", "500", "600", "700"],
  },
  { family: "Ubuntu", category: "sans-serif", variants: ["400", "500", "700"] },
  { family: "Mulish", category: "sans-serif", variants: ["400", "600", "700"] },
  {
    family: "DM Sans",
    category: "sans-serif",
    variants: ["400", "500", "700"],
  },

  // Serif
  {
    family: "Playfair Display",
    category: "serif",
    variants: ["400", "600", "700"],
  },
  { family: "Merriweather", category: "serif", variants: ["400", "700"] },
  { family: "Lora", category: "serif", variants: ["400", "600", "700"] },
  { family: "PT Serif", category: "serif", variants: ["400", "700"] },
  { family: "Libre Baskerville", category: "serif", variants: ["400", "700"] },
  {
    family: "Crimson Text",
    category: "serif",
    variants: ["400", "600", "700"],
  },
  { family: "EB Garamond", category: "serif", variants: ["400", "600"] },

  // Display
  { family: "Bebas Neue", category: "display", variants: ["400"] },
  { family: "Righteous", category: "display", variants: ["400"] },
  { family: "Comfortaa", category: "display", variants: ["400", "600", "700"] },
  { family: "Alfa Slab One", category: "display", variants: ["400"] },

  // Monospace
  {
    family: "Fira Code",
    category: "monospace",
    variants: ["400", "500", "700"],
  },
  {
    family: "JetBrains Mono",
    category: "monospace",
    variants: ["400", "500", "700"],
  },
  {
    family: "Source Code Pro",
    category: "monospace",
    variants: ["400", "600"],
  },
  {
    family: "IBM Plex Mono",
    category: "monospace",
    variants: ["400", "500", "600"],
  },
  {
    family: "Roboto Mono",
    category: "monospace",
    variants: ["400", "500", "700"],
  },
];

export const DEFAULT_SYSTEM_FONTS = [
  { family: "System Default", value: "system-ui, -apple-system, sans-serif" },
  { family: "Sans Serif", value: "ui-sans-serif, sans-serif" },
  { family: "Serif", value: "ui-serif, serif" },
  { family: "Monospace", value: "ui-monospace, monospace" },
];

/**
 * Google Font URL generator
 * @param fontFamily - Font family name
 * @param variants - Weight variants (default: ["400", "700"])
 * @returns Google Fonts CSS URL
 */
export function getGoogleFontUrl(
  fontFamily: string,
  variants: string[] = ["400", "700"],
): string {
  const family = fontFamily.replace(/ /g, "+");
  const weights = variants.join(",");
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`;
}

/**
 * Converts Font family to CSS format
 * @param fontFamily - Font family name
 * @returns CSS font-family value
 */
export function getFontFamilyValue(fontFamily: string): string {
  return `"${fontFamily}", sans-serif`;
}
