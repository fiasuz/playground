import { SectionsTab } from "./sections-tab";

export function LeftSidebar() {
  return (
    <aside className="w-64 border-r bg-white h-full overflow-hidden flex flex-col">
      {/* <Tabs defaultValue="sections" className="flex-1 flex flex-col">
             <TabsList className="w-full">
               <TabsTrigger value="sections">Sections</TabsTrigger>
               <TabsTrigger value="settings">Settings</TabsTrigger>
             </TabsList>
             
             <TabsContent value="sections" className="flex-1 overflow-auto">
               <SectionsTab />
             </TabsContent>
             
             <TabsContent value="settings" className="flex-1 overflow-auto">
               <SettingsTab />
             </TabsContent>
           </Tabs> */}
      <SectionsTab />
    </aside>
  );
}
