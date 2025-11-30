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

  return (
    <aside className="w-100 border-l bg-white h-full flex flex-col overflow-hidden">
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
          <Empty>
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
