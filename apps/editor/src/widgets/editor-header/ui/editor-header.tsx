import { useEditor } from "@craftjs/core";
import { Button } from "@repo/ui/ui/button";
import copy from "copy-to-clipboard";
import {
  CopyIcon,
  DownloadCloudIcon,
  EyeIcon,
  RedoIcon,
  UndoIcon,
} from "lucide-react";
import lz from "lzutf8";
import { toast } from "sonner";

export function EditorHeader() {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  return (
    <header className="h-16 bg-gray-100 border-b flex justify-between items-center px-4">
      <h1>Editor App</h1>
      <div className="flex flex-row gap-1">
        <Button
          size="icon"
          variant="outline"
          disabled={!canUndo}
          onClick={actions.history.undo}
        >
          <UndoIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={!canRedo}
          onClick={actions.history.redo}
        >
          <RedoIcon />
        </Button>
        <Button variant="outline" onClick={actions.history.redo}>
          <EyeIcon />
          Ko&apos;rish
        </Button>
        <Button
          onClick={() => {
            const json = query.serialize();
            copy(lz.encodeBase64(lz.compress(json)));
            toast("State copied to clipboard");
          }}
        >
          <CopyIcon /> Saqlash
        </Button>
        <Button>
          <DownloadCloudIcon /> Yuklab olish
        </Button>
      </div>
    </header>
  );
}
