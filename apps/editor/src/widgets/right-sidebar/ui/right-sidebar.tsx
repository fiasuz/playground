import { useEditor } from "@craftjs/core";
import { createElement } from "react";
import { Button as ShadcnButton } from "@repo/ui";

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
    <aside className="w-80 border-l bg-white h-full flex flex-col overflow-hidden">
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
        <h1>elementni tanlang</h1>
      )}
    </aside>
  );
}
