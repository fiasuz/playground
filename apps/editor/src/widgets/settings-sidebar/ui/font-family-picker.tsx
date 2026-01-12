/* eslint-disable */

import { useEffect, useState } from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import {
  POPULAR_GOOGLE_FONTS,
  DEFAULT_SYSTEM_FONTS,
  getGoogleFontUrl,
  getFontFamilyValue,
} from "@/shared/constants/google-fonts";

interface FontFamilyPickerProps {
  label: string;
  description?: string;
  value: string;
  onChange: (fontFamily: string) => void;
  type: "base" | "heading";
}

export function FontFamilyPicker({
  label,
  description,
  value,
  onChange,
  type,
}: FontFamilyPickerProps) {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // Extract font family name from CSS value
  const getCurrentFontFamily = () => {
    const match = value.match(/^"([^"]+)"/);
    return match ? match[1] : value.split(",")[0].trim();
  };

  const currentFont = getCurrentFontFamily();

  // Load Google Font dynamically
  const loadGoogleFont = (fontFamily: string) => {
    if (loadedFonts.has(fontFamily)) return;

    const font = POPULAR_GOOGLE_FONTS.find((f) => f.family === fontFamily);
    if (!font) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = getGoogleFontUrl(font.family, font.variants);
    document.head.appendChild(link);

    setLoadedFonts((prev) => new Set([...prev, fontFamily]));
  };

  useEffect(() => {
    const font = POPULAR_GOOGLE_FONTS.find((f) => f.family === currentFont);
    if (font) {
      loadGoogleFont(font.family);
    }
  }, [currentFont]);

  const handleFontChange = (selectedValue: string) => {
    const systemFont = DEFAULT_SYSTEM_FONTS.find(
      (f) => f.value === selectedValue,
    );
    if (systemFont) {
      onChange(systemFont.value);
      return;
    }

    const font = POPULAR_GOOGLE_FONTS.find((f) => f.family === selectedValue);
    if (font) {
      loadGoogleFont(font.family);
      onChange(getFontFamilyValue(font.family));
    }
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}

      <Select value={currentFont} onValueChange={handleFontChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Font tanlang" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
            System fonts
          </div>
          {DEFAULT_SYSTEM_FONTS.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              <span style={{ fontFamily: font.value }}>{font.family}</span>
            </SelectItem>
          ))}

          {/* Google Fonts by Category */}
          {["sans-serif", "serif", "display", "monospace"].map((category) => {
            const fontsInCategory = POPULAR_GOOGLE_FONTS.filter(
              (f) => f.category === category,
            );
            if (fontsInCategory.length === 0) return null;

            return (
              <div key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2 capitalize">
                  {category === "sans-serif"
                    ? "Sans Serif"
                    : category === "serif"
                      ? "Serif"
                      : category === "display"
                        ? "Display"
                        : "Monospace"}
                </div>
                {fontsInCategory.map((font) => (
                  <SelectItem key={font.family} value={font.family}>
                    <span
                      style={{
                        fontFamily: loadedFonts.has(font.family)
                          ? getFontFamilyValue(font.family)
                          : "inherit",
                      }}
                    >
                      {font.family}
                    </span>
                  </SelectItem>
                ))}
              </div>
            );
          })}
        </SelectContent>
      </Select>

      {/* Preview */}
      <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="text-xs text-gray-500 mb-2">Preview:</div>
        <div
          style={{ fontFamily: value }}
          className={
            type === "heading" ? "text-2xl font-semibold" : "text-base"
          }
        >
          The quick brown fox jumps over the lazy dog
        </div>
        <div
          style={{ fontFamily: value }}
          className={
            type === "heading" ? "text-lg mt-1" : "text-sm mt-1 text-gray-600"
          }
        >
          The quick brown fox jumps over the lazy dog
        </div>
        <div
          style={{ fontFamily: value }}
          className={
            type === "heading" ? "text-lg mt-1" : "text-sm mt-1 text-gray-600"
          }
        >
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        </div>
      </div>
    </Field>
  );
}
