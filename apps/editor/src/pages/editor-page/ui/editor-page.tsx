import { EditorProvider } from "@/app/providers/editor-provider";
import { EditorHeader } from "@/widgets/editor-header";
import { LeftSidebar } from "@/widgets/left-sidebar";
import { EditorCanvas } from "@/widgets/editor-canvas";
import { RightSidebar } from "@/widgets/right-sidebar";

export function EditorPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col relative">
        <EditorHeader />

        <div className="flex-1 flex overflow-hidden relative">
          <LeftSidebar />
          <EditorCanvas />
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
}
