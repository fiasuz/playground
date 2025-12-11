import { pagesStore, type IPage } from "@/shared/store";
import { Popover, PopoverContent, PopoverTrigger, Separator } from "@repo/ui";
import { EllipsisIcon } from "lucide-react";

interface DetailsPageActionsProps {
  data: IPage;
}

export function DetailsPageActions({ data }: DetailsPageActionsProps) {
  const { duplicatePage, removeDetailPage } = pagesStore((state) => state);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="size-6 flex items-center justify-center text-muted-foreground hover:text-black opacity-0 page-actions">
          <EllipsisIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="z-100 text-sm w-[160px] p-1 space-y-2"
        align="start"
      >
        <div>
          <button className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md">
            Settings
          </button>
          <button className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md">
            Replace content
          </button>
        </div>
        <Separator />
        <div>
          <button className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md">
            Rename
          </button>
          <button
            onClick={() => duplicatePage(data.id)}
            className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
          >
            Duplicate
          </button>
        </div>
        <Separator />
        <button
          onClick={() => removeDetailPage(data.id)}
          className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
        >
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
