import { Button } from "@repo/ui";
import {
  AppWindowMacIcon,
  BlocksIcon,
  CogIcon,
  DatabaseIcon,
  GitBranchIcon,
  HistoryIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { SectionsTab } from "./sections-tab";
import { PagesTab } from "./pages-tab";
import { SettingsTab } from "./settings-tab";
import { GitTab } from "./git-tab";
import { HistoryTab } from "./history-tab";
import { DatabaseTab } from "./database-tab";

type Tabs =
  | "add"
  | "artworks"
  | "database"
  | "git"
  | "history"
  | "settings"
  | "pages";

export function LeftSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tabs | undefined>(
    (searchParams.get("active-action") as Tabs) || undefined
  );

  const onSelectAction = (action: Tabs) => {
    if (action === activeTab) {
      setSearchParams({});
      setActiveTab(undefined);
    } else {
      setSearchParams({ "active-action": action });
      setActiveTab(action);
    }
  };

  const onCloseSidebar = () => {
    setSearchParams({});
    setActiveTab(undefined);
  };

  const activeTabContents = (): ReactNode | undefined => {
    switch (activeTab) {
      case "pages":
        return <PagesTab onClose={onCloseSidebar} />;
      case "artworks":
        return <SectionsTab onClose={onCloseSidebar} />;
      case "database":
        return <DatabaseTab onClose={onCloseSidebar} />;
      case "git":
        return <GitTab onClose={onCloseSidebar} />;
      case "history":
        return <HistoryTab onClose={onCloseSidebar} />;
      case "settings":
        return <SettingsTab onClose={onCloseSidebar} />;

      default:
        break;
    }
  };

  return (
    <aside className="relative">
      <div className="border-r h-full w-[90px]">
        <div className="py-4 px-6 space-y-2 flex flex-col">
          <Button
            size="icon-lg"
            variant={activeTab === "pages" ? "default" : "secondary"}
            onClick={() => onSelectAction("pages")}
          >
            <AppWindowMacIcon />
          </Button>

          <Button
            size="icon-lg"
            variant={activeTab === "artworks" ? "default" : "secondary"}
            onClick={() => onSelectAction("artworks")}
          >
            <BlocksIcon />
          </Button>

          <Button
            size="icon-lg"
            variant={activeTab === "database" ? "default" : "secondary"}
            onClick={() => onSelectAction("database")}
          >
            <DatabaseIcon />
          </Button>

          <Button
            size="icon-lg"
            variant={activeTab === "git" ? "default" : "secondary"}
            onClick={() => onSelectAction("git")}
          >
            <GitBranchIcon />
          </Button>

          <hr />
          <Button
            size="icon-lg"
            variant={activeTab === "history" ? "default" : "secondary"}
            onClick={() => onSelectAction("history")}
          >
            <HistoryIcon />
          </Button>

          <Button
            size="icon-lg"
            variant={activeTab === "settings" ? "default" : "secondary"}
            onClick={() => onSelectAction("settings")}
          >
            <CogIcon />
          </Button>
        </div>
      </div>

      {activeTab && activeTabContents() && (
        <div className="w-[300px] h-full bg-white absolute top-0 z-10 left-[90px] rounded-tr-2xl border-r px-4 py-4">
          {activeTabContents()}
        </div>
      )}
    </aside>
  );
}
