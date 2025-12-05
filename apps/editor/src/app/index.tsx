import { Toaster } from "@repo/ui";
import { EditorProvider } from "./providers/editor-provider";
import { RouteProvider } from "./providers/route-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/query-provider";

export function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <EditorProvider>
          <Toaster />
          <RouteProvider />
        </EditorProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
