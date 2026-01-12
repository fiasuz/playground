import { settingsStore } from "@/shared/store";
import { TogglerGroup } from "@/widgets/left-sidebar/ui/insert-action/togglers";
import { CogIcon, PaletteIcon } from "lucide-react";

export function SettingsSidebar() {
  const { onChangeActiveBlock } = settingsStore((state) => state);
  return (
    <aside className="h-full bg-background border-r p-3 w-[300px]">
      <ul className="space-y-4">
        <li>
          <TogglerGroup title="Site settings">
            <button
              onClick={() => onChangeActiveBlock("general")}
              className="w-full flex flex-row justify-between items-center hover:bg-muted p-2 rounded-lg cursor-default"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="size-6 bg-gray-600/20 flex items-center justify-center rounded-sm">
                  <CogIcon className="size-4" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  General
                </p>
              </div>
            </button>

            <button
              onClick={() => onChangeActiveBlock("theme")}
              className="w-full flex flex-row justify-between items-center hover:bg-muted p-2 rounded-lg cursor-default"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="size-6 bg-gray-600/20 flex items-center justify-center rounded-sm">
                  <PaletteIcon className="size-4" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Theme
                </p>
              </div>
            </button>
          </TogglerGroup>
        </li>
      </ul>
    </aside>
  );
}
