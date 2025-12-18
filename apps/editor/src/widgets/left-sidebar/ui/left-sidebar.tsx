import { actionsStore } from "@/shared/store";
import { useResize } from "@/shared/hooks";
import { MainSidebarActions } from "./main-actions/main-sidebar-actions";
import { useEffect, useMemo } from "react";
import { InsertAction } from "./insert-action/insert-action";
import { CmsAction } from "./cms-action/cms-action";
import { cn } from "@repo/ui/lib/utils";

export function LeftSidebar() {
  const { active: activeAction, change: setActiveAction } = actionsStore(
    (state) => state,
  );
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

  useEffect(() => {
    const onEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeAction !== "default") {
        setActiveAction("default");
      }
    };

    window.addEventListener("keyup", onEscKeyPress);
    return () => {
      window.removeEventListener("keyup", onEscKeyPress);
    };
  }, []);

  return (
    <aside
      className="absolute z-100 top-0 left-0 h-full bg-background border-r p-3"
      style={{ width: width + "px" }}
    >
      {renderAction}
      <div
        className={cn(
          "absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500",
          isResizing && "bg-blue-500",
        )}
        onMouseDown={handleMouseDown}
      />
    </aside>
  );
}
