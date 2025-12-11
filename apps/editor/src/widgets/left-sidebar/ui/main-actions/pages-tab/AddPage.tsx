import { pagesStore } from "@/shared/store";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui";
import { PlusIcon } from "lucide-react";

export function AddPage() {
  const { addPage } = pagesStore((state) => state);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer">
          <PlusIcon className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-100 text-sm w-[160px] p-1" align="start">
        <button
          onClick={() => addPage({ route: "/page", type: "default" })}
          className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
        >
          New Page
        </button>

        <button
          onClick={() => addPage({ route: "/404", type: "not_found" })}
          className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
        >
          New 404 Page
        </button>

        <button
          onClick={() => addPage({ route: "/500", type: "server_error" })}
          className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
        >
          New 500 Page
        </button>
      </PopoverContent>
    </Popover>
  );
}
