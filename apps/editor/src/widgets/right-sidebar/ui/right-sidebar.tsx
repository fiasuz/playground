import { useEditor } from "@craftjs/core";
import { createElement } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Button as ShadcnButton,
} from "@repo/ui";
import { PaletteIcon } from "lucide-react";
import { useResize } from "@/shared/hooks";
import { cn } from "@repo/ui/lib/utils";

export function RightSidebar() {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  const { width, isResizing, handleMouseDown } = useResize({
    minWidth: 200,
    maxWidth: 700,
    initialWidth: 250,
    direction: "right",
  });

  return (
    <aside
      className="p-3 border-l bg-white h-full flex flex-col absolute top-0 right-0 z-100"
      style={{ width: width + "px" }}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500",
          isResizing && "bg-blue-500"
        )}
        onMouseDown={handleMouseDown}
      />

      {isEnabled && selected ? (
        <>
          <div data-cy="settings-panel">
            {selected.settings && createElement(selected.settings)}
          </div>
          {selected.isDeletable ? (
            <ShadcnButton
              variant="destructive"
              color="default"
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </ShadcnButton>
          ) : null}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Empty className="p-0!">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PaletteIcon />
              </EmptyMedia>
              <EmptyTitle>Hechnima tanlanmagan</EmptyTitle>
              <EmptyDescription>
                Ma&apos;lumotlarga qo&apos;shimcha stil berish uchun uni tanlang
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </aside>
  );
}
