import { pagesStore } from "@/shared/store";
import {
  Button,
  ButtonGroup,
  Kbd,
  KbdGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui";
import {
  ChevronDown,
  MonitorIcon,
  MoonIcon,
  PlayIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useEffect } from "react";

interface EditorControls {
  scale: number;
  onResetScale: () => void;
}

export function EditorControls({ scale, onResetScale }: EditorControls) {
  const { activeBreakpoint, activePage, setActiveBreakpoint, loadPageContent } =
    pagesStore((state) => state);

  const pageContent = loadPageContent(activePage || "");

  useEffect(() => {
    const onChangeActiveBreakpoint = (e: KeyboardEvent) => {
      if (e.key === "1" && pageContent) {
        setActiveBreakpoint("desktop");
      }
      if (e.key === "2" && pageContent) {
        setActiveBreakpoint("tablet");
      }
      if (e.key === "3" && pageContent) {
        setActiveBreakpoint("mobile");
      }
    };

    window.addEventListener("keydown", onChangeActiveBreakpoint);
    return () =>
      window.removeEventListener("keydown", onChangeActiveBreakpoint);
  }, [pageContent, setActiveBreakpoint]);

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 cursor-default">
      <section className="bg-background shadow-2xl px-2 rounded-xl text-muted-foreground">
        <ul className="flex flex-row py-2 gap-2">
          <li>
            <Button variant="outline" size="icon">
              <MoonIcon />
            </Button>
          </li>

          <li>
            <Button variant="outline" size="icon">
              <PlayIcon />
            </Button>
          </li>

          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!pageContent}
                  variant={
                    activeBreakpoint === "desktop" ? "default" : "outline"
                  }
                  size="icon"
                  onClick={() => setActiveBreakpoint("desktop")}
                >
                  <MonitorIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row items-center gap-1">
                <p>Desktop</p>
                <Kbd>1</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!pageContent}
                  variant={
                    activeBreakpoint === "tablet" ? "default" : "outline"
                  }
                  size="icon"
                  onClick={() => setActiveBreakpoint("tablet")}
                >
                  <TabletIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row items-center gap-1">
                <p>Tablet</p>
                <Kbd>2</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!pageContent}
                  variant={
                    activeBreakpoint === "mobile" ? "default" : "outline"
                  }
                  size="icon"
                  onClick={() => setActiveBreakpoint("mobile")}
                >
                  <SmartphoneIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-row items-center gap-1">
                <p>Mobile</p>
                <Kbd>3</Kbd>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-22">
                <p>{Math.round(scale * 100)}%</p>
                <ChevronDown className="size-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="text-xs w-[200px] space-y-2">
              <div className="flex flex-row justify-between">
                <p>Zoom In</p>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>+</Kbd>
                </KbdGroup>
              </div>
              <div className="flex flex-row justify-between">
                <p>Zoom Out</p>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>-</Kbd>
                </KbdGroup>
              </div>
              <div
                className="flex flex-row justify-between"
                onClick={onResetScale}
              >
                <p>Zoom to 100%</p>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>0</Kbd>
                </KbdGroup>
              </div>
              <Separator />
              <div className="flex flex-row justify-between">
                <p>Pan</p>
                <p className="text-muted-foreground">Space + Drag</p>
              </div>
            </PopoverContent>
          </Popover>
        </ul>
      </section>
    </div>
  );
}
