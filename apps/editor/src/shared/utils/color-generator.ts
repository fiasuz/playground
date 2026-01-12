import tinycolor from "tinycolor2";

export type ColorShades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export function generateColorShades(baseColor: string): ColorShades {
  const color = tinycolor(baseColor);

  if (!color.isValid()) {
    throw new Error(`Invalid color: ${baseColor}`);
  }

  const hsl = color.toHsl();
  const { h, s } = hsl;

  const lightnessMap: Record<keyof ColorShades, number> = {
    50: 0.95,
    100: 0.9,
    200: 0.8,
    300: 0.7,
    400: 0.6,
    500: 0.5, // base color
    600: 0.4,
    700: 0.3,
    800: 0.2,
    900: 0.1,
    950: 0.05,
  };

  const shades: Partial<ColorShades> = {};

  for (const [shade, lightness] of Object.entries(lightnessMap)) {
    const shadeColor = tinycolor({ h, s, l: lightness });
    shades[shade as unknown as keyof ColorShades] = shadeColor.toHexString();
  }

  return shades as ColorShades;
}

export function shadesToTailwindFormat(shades: ColorShades) {
  return {
    50: shades[50],
    100: shades[100],
    200: shades[200],
    300: shades[300],
    400: shades[400],
    500: shades[500],
    DEFAULT: shades[500], // default qiymat
    600: shades[600],
    700: shades[700],
    800: shades[800],
    900: shades[900],
    950: shades[950],
  };
}

export function getContrastText(color: string): "white" | "black" {
  const tc = tinycolor(color);
  return tc.isLight() ? "black" : "white";
}
