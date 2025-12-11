import { pagesStore, type IPage } from "@/shared/store";
import { indexPage } from "@/shared/store/pages/pages.store";
import { Popover, PopoverContent, PopoverTrigger, Separator } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { EllipsisIcon } from "lucide-react";
import { useBoolean, type UseBooleanReturn } from "minimal-shared";

interface PageActionsProps {
  data: IPage;
  openDetailsPage: UseBooleanReturn;
  onEditRoute: () => void;
}

export function PageActions({
  data,
  openDetailsPage,
  onEditRoute,
}: PageActionsProps) {
  const { deletePage, duplicatePage, addDetailPage } = pagesStore();
  const open = useBoolean();

  return (
    <Popover open={open.value} onOpenChange={open.setValue}>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className="size-6 flex items-center justify-center text-muted-foreground hover:text-black opacity-0 page-actions">
          <EllipsisIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="z-100 text-sm w-[160px] p-1 space-y-2"
        align="start"
      >
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addDetailPage(data.id, data.route);
              openDetailsPage.onTrue();
            }}
            disabled={data.route === indexPage}
            className={cn(
              "px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md",
              data.route === indexPage && "opacity-50 pointer-events-none"
            )}
          >
            Add Details Page
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
          >
            Settings
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
          >
            Replace content
          </button>
        </div>
        <Separator />
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditRoute();
            }}
            disabled={data.route === indexPage}
            className={cn(
              "px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md",
              data.route === indexPage && "pointer-events-none opacity-50"
            )}
          >
            Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicatePage(data.id);
            }}
            className="px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md"
          >
            Duplicate
          </button>
        </div>
        <Separator />
        <button
          onClick={(e) => {
            e.stopPropagation();
            deletePage(data.id);
            open.onFalse();
          }}
          disabled={data.route === indexPage}
          className={cn(
            "px-3 py-1 hover:bg-primary hover:text-white w-full text-start rounded-md",
            data.route === indexPage && "pointer-events-none opacity-50"
          )}
        >
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
