import { pages } from "@/shared/constants";
import {
  actionsStore,
  pagesStore,
  settingsStore,
  type ActionsType,
} from "@/shared/store";
import { useEditor } from "@craftjs/core";
import { Badge } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { Button, buttonVariants } from "@repo/ui/ui/button";
import {
  Bird,
  CogIcon,
  CopyIcon,
  Database,
  DownloadCloudIcon,
  GlobeIcon,
  PlayIcon,
  Plus,
  TypeOutlineIcon,
} from "lucide-react";
import lz from "lzutf8";

export function EditorHeader() {
  const { change: changeAction, active: activeAction } = actionsStore(
    (state) => state,
  );
  const { pages: createdPages } = pagesStore((state) => state);
  const { onToggle: onToggleSettingsOpen } = settingsStore((state) => state);

  const { query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  const onChangeAction = (action: ActionsType) => {
    if (action === activeAction) {
      changeAction("default");
    } else {
      changeAction(action);
    }
  };

  const onDownload = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/export", {
        method: "POST",
        body: JSON.stringify({
          projectName: "test",
          framework: "vite",
          pages: createdPages,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "test";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Yuklab olishda xatolik:", error);
      alert(
        "Faylni yuklab olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
      );
    }
  };

  return (
    <header className="h-15 bg-background border-b flex justify-between items-center px-4 relative">
      <div className="flex flex-row gap-3 items-center">
        <Bird className="size-5 text-primary" />
        <button
          className={cn(
            "flex flex-row items-center gap-1 cursor-pointer hover:text-black",
            activeAction === "insert" ? "text-text" : "text-muted-foreground",
          )}
          onClick={() => onChangeAction("insert")}
        >
          <Plus className="size-5" />
          <p className="text-sm font-medium">Insert</p>
        </button>
        <button
          className={cn(
            "flex flex-row items-center gap-1 cursor-pointer hover:text-black",
            activeAction === "text" ? "text-text" : "text-muted-foreground",
          )}
          onClick={() => onChangeAction("text")}
        >
          <TypeOutlineIcon className="size-5" />
          <p className="text-sm font-medium">Text</p>
        </button>
        <button
          className={cn(
            "flex flex-row items-center gap-1 cursor-pointer hover:text-black",
            activeAction === "cms" ? "text-text" : "text-muted-foreground",
          )}
          onClick={() => onChangeAction("cms")}
        >
          <Database className="size-5" />
          <p className="text-sm font-medium">CMS</p>
        </button>
      </div>

      <div className="flex flex-row items-center gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-sm">Untitled</p>
        <Badge variant="outline">Free</Badge>
      </div>

      <div className="flex flex-row gap-1">
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "shadow-none overflow-hidden border-none",
          )}
        >
          <img src="https://placehold.co/400x400" />
        </div>
        <Button variant="outline" size="icon" onClick={onToggleSettingsOpen}>
          <CogIcon />
        </Button>
        <Button variant="outline" size="icon">
          <GlobeIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const json = query.serialize();
            window.navigator.clipboard.writeText(
              lz.encodeBase64(lz.compress(json)),
            );
          }}
        >
          <CopyIcon />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const json = query.serialize();
            const encoded = lz.encodeBase64(lz.compress(json));
            const previewUrl = `${pages.preview}?state=${encodeURIComponent(encoded)}`;
            window.open(previewUrl, "_blank");
          }}
        >
          <PlayIcon />
        </Button>

        <Button
          onClick={() => {
            onDownload();
            console.log("pages", JSON.stringify(createdPages));
          }}
        >
          <DownloadCloudIcon /> Yuklab olish
        </Button>
      </div>
    </header>
  );
}
