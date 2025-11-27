import { EditorProvider } from "@/app/providers/editor-provider";
import { EditorHeader } from "@/widgets/editor-header";
import { LeftSidebar } from "@/widgets/left-sidebar";

export function EditorPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col">
        <EditorHeader />

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Canvas */}
          {/* <EditorCanvas /> */}

          {/* Right Sidebar */}
          {/* <RightSidebar /> */}
        </div>
      </div>
    </EditorProvider>
  );
}
