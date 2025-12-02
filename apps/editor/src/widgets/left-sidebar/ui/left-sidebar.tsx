import { MainSidebarActions } from "./main-actions/main-sidebar-actions";

export function LeftSidebar() {
  return (
    <aside className="absolute z-10 top-0 left-0 w-[250px] h-full bg-background border-r p-3">
      <MainSidebarActions />
    </aside>
  );
}
