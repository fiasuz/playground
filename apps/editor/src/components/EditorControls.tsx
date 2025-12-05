import { Popover, PopoverContent, PopoverTrigger, Separator } from "@repo/ui";
import {
  ChevronDown,
  CommandIcon,
  MinusIcon,
  MoonIcon,
  PlayIcon,
  PlusIcon,
} from "lucide-react";

interface EditorControls {
  scale: number;
  onResetScale: () => void;
}

export function EditorControls({ scale, onResetScale }: EditorControls) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 cursor-default">
      <section className="bg-background shadow-2xl px-4 rounded-2xl text-muted-foreground">
        <ul className="flex flex-row py-2 gap-2">
          <li className="size-7 bg-muted flex items-center justify-center rounded-md">
            <MoonIcon className="size-5" />
          </li>
          <li className="size-7 bg-muted flex items-center justify-center rounded-md">
            <PlayIcon className="size-5" />
          </li>
          <Popover>
            <PopoverTrigger asChild>
              <li className="h-7 w-18 px-2 bg-muted text-xs flex flex-row items-center justify-between gap-2 rounded-md">
                <p>{Math.round(scale * 100)}%</p>
                <ChevronDown className="size-3" />
              </li>
            </PopoverTrigger>
            <PopoverContent className="text-xs w-[200px] space-y-2">
              <div className="flex flex-row justify-between">
                <p>Zoom In</p>
                <div className="flex flex-row text-muted-foreground">
                  <CommandIcon className="size-3" />
                  <PlusIcon className="size-3" />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <p>Zoom Out</p>
                <div className="flex flex-row text-muted-foreground">
                  <CommandIcon className="size-3" />
                  <MinusIcon className="size-3" />
                </div>
              </div>
              <div
                className="flex flex-row justify-between"
                onClick={onResetScale}
              >
                <p>Zoom to 100%</p>
                <div className="flex flex-row gap-1 items-center text-muted-foreground">
                  <CommandIcon className="size-3" />
                  <p>0</p>
                </div>
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
