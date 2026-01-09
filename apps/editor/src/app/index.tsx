import { Toaster } from "@repo/ui";
import { EditorProvider } from "./providers/editor-provider";
import { RouteProvider } from "./providers/route-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/query-provider";
import { SettingsPage } from "@/pages/settings-page";

export function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <EditorProvider>
          <Toaster richColors theme="light" position="bottom-center" />
          <RouteProvider />
          {/* INFO: Manabu settings page aslida (hozir) dialog ko'rinishida */}
          <SettingsPage />
        </EditorProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
