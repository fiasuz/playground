import { pagesStore, type IPage } from "@/shared/store";
import { cn } from "@repo/ui/lib/utils";
import { DatabaseIcon } from "lucide-react";
import { DetailsPageActions } from "./DetailsPageActions";
import { memo } from "react";

interface DetailsPageItemProps {
  data: IPage;
}

export const DetailsPageItem = memo(function DetailsPageItem({
  data,
}: DetailsPageItemProps) {
  const activePage = pagesStore((state) => state.activePage);
  const setActivePage = pagesStore((state) => state.setActivePage);

  return (
    <div
      role="button"
      onClick={() => setActivePage(data.child?.id || "")}
      className={cn(
        "hover:bg-muted p-1 rounded-lg cursor-default flex flex-row items-center text-muted-foreground hover:[&>.page-actions]:opacity-100",
        activePage === data.child?.id && "bg-muted text-black"
      )}
    >
      <div className="w-12"></div>
      <div className="flex flex-row items-center gap-1 flex-1">
        <DatabaseIcon className="size-4" />
        <p className="text-sm">{data.child?.route}</p>
      </div>
      <DetailsPageActions data={data} />
    </div>
  );
});
