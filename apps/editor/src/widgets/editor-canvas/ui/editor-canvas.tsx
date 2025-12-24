import { BreakpointerHeader, CanvasWrapper } from "@/components";
import { initialPageContent, pagesStore, actionsStore } from "@/shared/store";
import { Frame, useEditor } from "@craftjs/core";
import { useEffect, useRef } from "react";
import lz from "lzutf8";
import { Text } from "@/widgets/left-sidebar/ui/insert-action";

export function EditorCanvas() {
  const { activePage, loadPageContent, savePageContent } = pagesStore(
    (state) => state,
  );
  const { active: activeAction, change: changeAction } = actionsStore(
    (state) => state,
  );

  const frameWrapperRef = useRef<HTMLDivElement>(null);

  const { actions, query } = useEditor();
  const { serializedState } = useEditor((_, query) => ({
    serializedState: query.serialize(),
  }));

  useEffect(() => {
    if (!activePage) return;

    const content = loadPageContent(activePage);

    if (content) {
      const json = lz.decompress(lz.decodeBase64(content));

      try {
        actions.deserialize(json);
      } catch {
        actions.deserialize("");
      }
    } else {
      const json = lz.decompress(lz.decodeBase64(initialPageContent));

      try {
        actions.deserialize(json);
      } catch {
        actions.deserialize("");
      }
    }
  }, [activePage]);

  useEffect(() => {
    if (!activePage) return;

    const json = query.serialize();
    savePageContent(activePage, lz.encodeBase64(lz.compress(json)));
  }, [serializedState, activePage]);

  // Text mode
  useEffect(() => {
    if (activeAction !== "text" || !frameWrapperRef.current) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Get ROOT node ID
      const rootNodeId = query.getOptions().enabled
        ? Object.keys(query.getSerializedNodes())[0]
        : null;

      if (!rootNodeId) return;

      // ===================================
      // TODO: We can create craft js node using: parseReactElement
      // ===================================
      const textNodeTree = query
        .parseReactElement(
          <Text
            fontSize={16}
            text=""
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
            }}
          />,
        )
        .toNodeTree();

      // Add the node
      actions.addNodeTree(textNodeTree, rootNodeId);
      // Select text element
      const newNodeId = textNodeTree.rootNodeId;
      actions.selectNode(newNodeId);
      changeAction("default");
    };

    const wrapper = frameWrapperRef.current;
    wrapper.addEventListener("click", handleClick);

    return () => {
      wrapper.removeEventListener("click", handleClick);
    };
  }, [activeAction, actions, query, changeAction]);

  // Handle ESC key to exit text mode
  useEffect(() => {
    if (activeAction !== "text") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        changeAction("default");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAction, changeAction]);

  return (
    <CanvasWrapper>
      <BreakpointerHeader />
      <div
        ref={frameWrapperRef}
        style={{
          cursor: activeAction === "text" ? "text" : "default",
        }}
      >
        <Frame />
      </div>
    </CanvasWrapper>
  );
}
