import { settingsStore } from "@/shared/store";
import { GeneralSettings } from "./general-settings";
import { ThemeSettings } from "./theme-settings";

export function SettingsContent() {
  const { activeBlock } = settingsStore((state) => state);
  return (
    <main
      className="relative w-full h-full overflow-hidden flex justify-center pt-20 pb-2"
      style={{
        backgroundColor: "#eeeeee",
        backgroundImage: `radial-gradient(circle, #d0d0d0 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0px 0px",
      }}
    >
      <div className="max-w-[600px] w-full">
        {activeBlock === "general" && <GeneralSettings />}
        {activeBlock === "theme" && <ThemeSettings />}
      </div>
    </main>
  );
}
