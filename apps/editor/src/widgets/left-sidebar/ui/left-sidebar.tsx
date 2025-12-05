import { actionsStore } from "@/shared/store";
import { useResize } from "@/shared/hooks";
import { MainSidebarActions } from "./main-actions/main-sidebar-actions";
import { useMemo } from "react";
import { InsertAction } from "./insert-action/insert-action";
import { CmsAction } from "./cms-action/cms-action";
import { cn } from "@repo/ui/lib/utils";

export function LeftSidebar() {
  const { active: activeAction } = actionsStore((state) => state);
  const { width, isResizing, handleMouseDown } = useResize({
    minWidth: 200,
    maxWidth: 700,
    initialWidth: 250,
  });

  const renderAction = useMemo(() => {
    switch (activeAction) {
      case "insert":
        return <InsertAction />;
      case "cms":
        return <CmsAction />;

      default:
        return <MainSidebarActions />;
    }
  }, [activeAction]);

  return (
    <aside
      className="absolute z-10 top-0 left-0 h-full bg-background border-r p-3"
      style={{ width: width + "px" }}
    >
      {renderAction}
      <div
        className={cn(
          "absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500",
          isResizing && "bg-blue-500"
        )}
        onMouseDown={handleMouseDown}
      />
    </aside>
  );
}
