import { useState } from "react";
import { Button, FieldGroup, FieldSet, Separator } from "@repo/ui";
import { useThemeStore } from "@/shared/store";
import { ColorPickerWithShades } from "./color-picker-with-shades";
import { FontFamilyPicker } from "./font-family-picker";
import { ContentWrapper } from "./content-wrapper";

export function ThemeSettings() {
  const {
    colors,
    typography,
    setPrimaryColor,
    setSecondaryColor,
    setTertiaryColor,
    removeSecondaryColor,
    removeTertiaryColor,
    setFontFamily,
    resetTheme,
  } = useThemeStore();

  const [showSecondary, setShowSecondary] = useState(!!colors.secondary);
  const [showTertiary, setShowTertiary] = useState(!!colors.tertiary);

  const handleAddSecondaryColor = () => {
    setShowSecondary(true);
    setSecondaryColor("#10b981");
  };

  const handleAddTertiaryColor = () => {
    setShowTertiary(true);
    setTertiaryColor("#f59e0b");
  };

  const handleRemoveSecondaryColor = () => {
    setShowSecondary(false);
    removeSecondaryColor();
  };

  const handleRemoveTertiaryColor = () => {
    setShowTertiary(false);
    removeTertiaryColor();
  };

  return (
    <ContentWrapper>
      {/* Header */}
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">Theme Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetTheme}>
            Reset
          </Button>
          <Button>Save</Button>
        </div>
      </header>

      <Separator />

      {/* Colors Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Colors</h2>
        <FieldSet>
          <FieldGroup>
            {/* Primary Color */}
            <ColorPickerWithShades
              label="Primary color"
              description="The main brand color of your project. Used for buttons, links, and active items."
              value={colors.primary.base}
              onChange={setPrimaryColor}
            />

            {/* Secondary Color */}
            {showSecondary && colors.secondary ? (
              <ColorPickerWithShades
                label="Secondary color"
                description="Additional accent color. Used to complement primary color."
                value={colors.secondary.base}
                onChange={setSecondaryColor}
                onRemove={handleRemoveSecondaryColor}
                showRemoveButton
              />
            ) : (
              <Button
                variant="outline"
                onClick={handleAddSecondaryColor}
                className="w-full"
              >
                + Add secondary color
              </Button>
            )}

            {/* Tertiary Color */}
            {showTertiary && colors.tertiary ? (
              <ColorPickerWithShades
                label="Tertiary color"
                description="Additional accent color."
                value={colors.tertiary.base}
                onChange={setTertiaryColor}
                onRemove={handleRemoveTertiaryColor}
                showRemoveButton
              />
            ) : showSecondary ? (
              <Button
                variant="outline"
                onClick={handleAddTertiaryColor}
                className="w-full"
              >
                + Add tertirary color
              </Button>
            ) : null}
          </FieldGroup>
        </FieldSet>
      </section>

      <Separator />

      {/* Typography Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <FieldSet>
          <FieldGroup>
            <FontFamilyPicker
              label="Body Text"
              description="Used for simple text (paragraphs, lists, etc.)"
              value={typography.fontFamily.base}
              onChange={(font) => setFontFamily("base", font)}
              type="base"
            />

            <FontFamilyPicker
              label="Headings"
              description="Used for headers (h1, h2, h3, etc.)"
              value={typography.fontFamily.heading}
              onChange={(font) => setFontFamily("heading", font)}
              type="heading"
            />
          </FieldGroup>
        </FieldSet>
      </section>
    </ContentWrapper>
  );
}
