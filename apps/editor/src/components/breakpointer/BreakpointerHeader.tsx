import { breakpoints } from "@/shared/constants";
import { pagesStore } from "@/shared/store";
import { PlayIcon } from "lucide-react";

export function BreakpointerHeader() {
  const { activeBreakpoint } = pagesStore((state) => state);

  return (
    <header className="p-3 bg-white/60 hover:bg-primary/40 cursor-default w-full rounded-2xl flex flex-row items-center justify-start mb-4 group">
      <div className="flex flex-row items-center gap-2">
        <div className="bg-gray-500 group-hover:bg-primary w-fit p-1.5 rounded-lg">
          <PlayIcon className="size-4 fill-white stroke-white" />
        </div>
        <p className="text-sm text-gray-500 group-hover:text-primary capitalize">
          {activeBreakpoint}{" "}
          <span className="opacity-50">
            - {breakpoints[activeBreakpoint].width}
          </span>
        </p>
      </div>
    </header>
  );
}
