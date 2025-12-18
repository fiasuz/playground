import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { PagesTab } from "./pages-tab/PagesTab";
import { LayersTab } from "./layers-tab/LayersTab";

export function MainSidebarActions() {
  return (
    <Tabs defaultValue="pages" className="full">
      <TabsList className="w-full">
        <TabsTrigger value="pages">Pages</TabsTrigger>
        <TabsTrigger value="layers">Layers</TabsTrigger>
        {/*<TabsTrigger value="assets">Assets</TabsTrigger>*/}
      </TabsList>
      <Separator />
      <TabsContent value="pages">
        <PagesTab />
      </TabsContent>
      <TabsContent value="layers">
        <LayersTab />
      </TabsContent>
      {/*<TabsContent value="assets">
        <AssetsTab />
      </TabsContent>*/}
    </Tabs>
  );
}
