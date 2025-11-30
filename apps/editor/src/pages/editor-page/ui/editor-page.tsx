import { EditorProvider } from "@/app/providers/editor-provider";
import { EditorHeader } from "@/widgets/editor-header";
import { LeftSidebar } from "@/widgets/left-sidebar";
import { EditorCanvas } from "@/widgets/editor-canvas";
import { RightSidebar } from "@/widgets/right-sidebar";

export function EditorPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col">
        <EditorHeader />

        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar />
          <EditorCanvas />
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
}
