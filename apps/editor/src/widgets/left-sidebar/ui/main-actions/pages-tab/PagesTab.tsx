import { pagesStore } from "@/shared/store";
import { Input, Separator } from "@repo/ui";
import { PageItem } from "./PageItem";
import { AddPage } from "./AddPage";

export function PagesTab() {
  const { pages } = pagesStore();

  return (
    <div className="space-y-2">
      <Input placeholder="Search..." />
      <Separator />
      <div className="flex flex-row justify-between">
        <p className="text-sm">Pages</p>
        <AddPage />
      </div>
      <ul>
        {pages.map((e) => (
          <li key={e.id}>
            <PageItem data={e} />
          </li>
        ))}
      </ul>
    </div>
  );
}
