import { useState } from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@repo/ui";
import {
  generateColorShades,
  getContrastText,
} from "@/shared/utils/color-generator";
import type { ColorShades } from "@/shared/utils/color-generator";

interface ColorPickerWithShadesProps {
  label: string;
  description?: string;
  value: string;
  onChange: (color: string) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export function ColorPickerWithShades({
  label,
  description,
  value,
  onChange,
  onRemove,
  showRemoveButton = false,
}: ColorPickerWithShadesProps) {
  const [shades, setShades] = useState<ColorShades>(() =>
    generateColorShades(value),
  );

  const handleColorChange = (newColor: string) => {
    try {
      const newShades = generateColorShades(newColor);
      setShades(newShades);
      onChange(newColor);
    } catch (error) {
      console.error("Invalid color:", error);
    }
  };

  const shadeEntries = Object.entries(shades) as unknown as [
    keyof ColorShades,
    string,
  ][];

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        {showRemoveButton && onRemove && (
          <Button
            onClick={onRemove}
            className="text-sm h-7 px-3"
            variant="destructive"
          >
            Delete
          </Button>
        )}
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}

      {/* Color Picker Input */}
      <div className="flex items-center gap-3 mt-2">
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
          style={{ padding: 0 }}
        />
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700">
            Selected color
          </div>
          <div className="text-xs text-gray-500 font-mono uppercase">
            {value}
          </div>
        </div>
      </div>

      {/* Shades Preview */}
      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium text-gray-700">
          Generated color shades
        </div>
        <div className="grid grid-cols-11 gap-1">
          {shadeEntries.map(([shade, color]) => {
            const textColor = getContrastText(color);
            return (
              <Tooltip key={shade}>
                <TooltipTrigger asChild>
                  <div
                    key={shade}
                    className="group relative aspect-square rounded-md flex items-center justify-center text-xs font-medium cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all"
                    style={{
                      backgroundColor: color,
                      color: textColor,
                    }}
                    title={`${shade}: ${color}`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {shade}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">
                    {shade} <span className="font-regular">{color}</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </Field>
  );
}
