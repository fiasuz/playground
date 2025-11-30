import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { SectionsTab } from "./sections-tab";
import { PagesTab } from "./pages-tab";
import { SettingsTab } from "./settings-tab";

export function LeftSidebar() {
  return (
    <aside className="w-64 border-r bg-white h-full overflow-hidden flex flex-col">
      <Tabs defaultValue="sections" className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b bg-gray-50 grid grid-cols-3">
          <TabsTrigger value="sections" className="flex-1 text-xs">
            Sections
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex-1 text-xs">
            Pages
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 text-xs">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="sections"
          className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <SectionsTab />
        </TabsContent>

        <TabsContent
          value="pages"
          className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <PagesTab />
        </TabsContent>

        <TabsContent
          value="settings"
          className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
