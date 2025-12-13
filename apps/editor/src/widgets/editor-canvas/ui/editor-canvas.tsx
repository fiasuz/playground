import { Breakpointer, CanvasWrapper } from "@/components";
import { initialPageContent, pagesStore } from "@/shared/store";
import { Element, Frame, useEditor } from "@craftjs/core";
import { useEffect, type ElementType } from "react";
import lz from "lzutf8";

export function EditorCanvas() {
  const { activePage, loadPageContent, savePageContent } = pagesStore(
    (state) => state
  );
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
      } catch (error) {
        actions.deserialize("");
      }
    } else {
      const json = lz.decompress(lz.decodeBase64(initialPageContent));

      try {
        actions.deserialize(json);
      } catch (error) {
        actions.deserialize("");
      }
    }
  }, [activePage]);

  useEffect(() => {
    if (!activePage) return;

    const json = query.serialize();
    savePageContent(activePage, lz.encodeBase64(lz.compress(json)));
  }, [serializedState, activePage]);

  return (
    <CanvasWrapper>
      <Frame>
        <Element
          canvas
          is={Breakpointer as ElementType}
          padding={5}
          data-cy="root-container"
        />
      </Frame>
    </CanvasWrapper>
  );
}
