import { EditorPage } from "@/pages/editor-page";
import { EditorProvider } from "./providers/editor-provider";

export function App() {
  return (
    <EditorProvider>
      <EditorPage />
    </EditorProvider>
  );
}
