import { breakpoints, type BreakpointsKey } from "@/shared/constants";
import { pagesStore } from "@/shared/store";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { PlayIcon, PlusIcon } from "lucide-react";

export function BreakpointerHeader() {
  const { activeBreakpoint, loadPageContent, activePage, addBreakpointToPage } =
    pagesStore((state) => state);
  const pageContent = loadPageContent(activePage || "");

  return (
    <header className="p-3 bg-white/60 hover:bg-primary/40 cursor-default w-full rounded-2xl flex flex-row items-center justify-between mb-4 group">
      <div className="flex flex-row items-center gap-2">
        <div className="bg-gray-500 group-hover:bg-primary w-fit p-1.5 rounded-lg">
          <PlayIcon className="size-4 fill-white stroke-white" />
        </div>
        <p className="text-sm text-gray-500 group-hover:text-primary capitalize">
          {activeBreakpoint}
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-gray-500 group-hover:text-primary">
              Breakpoint
            </p>
            <div className="size-6 flex items-center justify-center bg-gray-300 group-hover:bg-primary rounded-md">
              <PlusIcon className="size-4 text-gray-500 group-hover:text-white" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-xs w-[150px] p-1">
          {Object.keys(breakpoints)
            .reverse()
            .map((key) => {
              const value = breakpoints[key as BreakpointsKey];

              return (
                <PopoverClose asChild key={key}>
                  <button
                    onClick={() =>
                      addBreakpointToPage(
                        activePage || "",
                        key as BreakpointsKey,
                      )
                    }
                    className={cn(
                      "flex flex-row justify-between w-full p-2 hover:bg-primary hover:text-white rounded-md cursor-default",
                      pageContent?.[key as BreakpointsKey] &&
                        "pointer-events-none opacity-50",
                    )}
                  >
                    <p className="capitalize">{key}</p>
                    <span className="opacity-50">{value.width}</span>
                  </button>
                </PopoverClose>
              );
            })}
        </PopoverContent>
      </Popover>
    </header>
  );
}
