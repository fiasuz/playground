import { pagesStore, type IPage } from "@/shared/store";
import { cn } from "@repo/ui/lib/utils";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  HomeIcon,
} from "lucide-react";
import { useBoolean } from "minimal-shared";
import { PageActions } from "./PageActions";
import { DetailsPageItem } from "./DetailsPageItem";
import { useState, useEffect } from "react";
import { indexPage } from "@/shared/store/pages/pages.store";

interface IPageItem {
  data: IPage;
}

export function PageItem({ data }: IPageItem) {
  const { activePage, setActivePage, hasDetailPage, updatePageRoute } =
    pagesStore((state) => state);
  const showDetails = useBoolean();
  const editPageName = useBoolean();
  const [routeValue, setRouteValue] = useState(data.route);

  useEffect(() => {
    setRouteValue(data.route);
  }, [data.route]);

  const handleSaveRoute = () => {
    if (routeValue.trim() && routeValue !== data.route) {
      updatePageRoute(data.id, routeValue);
    }
    editPageName.onFalse();
  };

  const handleCancelEdit = () => {
    setRouteValue(data.route);
    editPageName.onFalse();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      handleSaveRoute();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (editPageName.value) {
        handleCancelEdit();
      }
    }, 100);
  };

  return (
    <>
      <div
        role="button"
        onClick={() => setActivePage(data.id)}
        className={cn(
          "hover:bg-muted p-1 rounded-lg cursor-default flex flex-row items-center text-muted-foreground hover:[&>.page-actions]:opacity-100",
          activePage === data.id && "bg-muted text-black"
        )}
      >
        <div className="w-6 flex items-center justify-center text-muted-foreground hover:text-black">
          {hasDetailPage(data.id) && (
            <button onClick={showDetails.onToggle}>
              {showDetails.value ? (
                <ChevronDownIcon className="size-3" />
              ) : (
                <ChevronRightIcon className="size-3" />
              )}
            </button>
          )}
        </div>
        <div className="flex flex-row items-center gap-1 flex-1">
          {data.route === indexPage ? (
            <HomeIcon className="size-4" />
          ) : (
            <FileIcon className="size-4" />
          )}
          {editPageName.value ? (
            <input
              className="w-full text-sm bg-transparent border rounded-sm border-primary outline-none px-1"
              value={routeValue}
              onChange={(e) => setRouteValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <p
              className="text-sm"
              onDoubleClick={() =>
                data.route !== indexPage && editPageName.onTrue()
              }
            >
              {data.route === indexPage ? "Home" : data.route}
            </p>
          )}
        </div>

        <PageActions
          data={data}
          openDetailsPage={showDetails}
          onEditRoute={editPageName.onTrue}
        />
      </div>

      {showDetails.value && data.child && <DetailsPageItem data={data} />}
    </>
  );
}
