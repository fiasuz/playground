import { Toaster } from "@repo/ui";
import { EditorProvider } from "./providers/editor-provider";
import { RouteProvider } from "./providers/route-provider";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <EditorProvider>
        <Toaster />
        <RouteProvider />
      </EditorProvider>
    </BrowserRouter>
  );
}
