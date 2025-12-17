import { breakpoints, pages, type BreakpointsKey } from "@/shared/constants";
import { actionsStore, pagesStore, type ActionsType } from "@/shared/store";
import { useEditor } from "@craftjs/core";
import { Badge, ButtonGroup } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { Button, buttonVariants } from "@repo/ui/ui/button";
import {
  Bird,
  CogIcon,
  CopyIcon,
  Database,
  DownloadCloudIcon,
  GlobeIcon,
  LaptopIcon,
  PlayIcon,
  Plus,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import lz from "lzutf8";

export function EditorHeader() {
  const { change: changeAction, active: activeAction } = actionsStore(
    (state) => state,
  );

  const {
    activePage,
    activeBreakpoint,
    setActiveBreakpoint,
    addBreakpointToPage,
    loadPageContent,
  } = pagesStore();

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

  const getBreakpointIcon = (breakpoint: BreakpointsKey) => {
    switch (breakpoint) {
      case "mobile":
        return <SmartphoneIcon className="size-4" />;
      case "tablet":
        return <TabletIcon className="size-4" />;
      case "desktop":
        return <LaptopIcon className="size-4" />;
    }
  };

  const handleBreakpointChange = (breakpoint: BreakpointsKey) => {
    if (!activePage) return;

    const pageContent = loadPageContent(activePage);
    const breakpointExists = pageContent?.[breakpoint];

    if (!breakpointExists) {
      // Ask user if they want to add this breakpoint
      const currentBreakpoint = activeBreakpoint;
      const shouldCopy = window.confirm(
        `Breakpoint "${breakpoint}" does not exist for this page. Do you want to create it by copying content from "${currentBreakpoint}"?`,
      );

      if (shouldCopy) {
        addBreakpointToPage(activePage, breakpoint, currentBreakpoint);
      } else {
        addBreakpointToPage(activePage, breakpoint);
      }
    }

    setActiveBreakpoint(breakpoint);
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
        <Button variant="outline" size="icon">
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
        <Button>
          <DownloadCloudIcon /> Yuklab olish
        </Button>
      </div>
    </header>
  );
}
