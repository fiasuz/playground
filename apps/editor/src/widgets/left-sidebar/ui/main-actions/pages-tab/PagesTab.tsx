import { pagesStore } from "@/shared/store";
import { Input, Separator } from "@repo/ui";
import { PageItem } from "./PageItem";
import { AddPage } from "./AddPage";
import { useState } from "react";

export function PagesTab() {
  const { pages } = pagesStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter((page) => {
    if (searchTerm.length === 0) return true;
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const normalizedRoute = page.route.toLowerCase();
    return normalizedRoute.includes(normalizedSearchTerm);
  });

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search pages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Separator />
      <div className="flex flex-row justify-between">
        <p className="text-sm">Pages</p>
        <AddPage />
      </div>
      {filteredPages.length > 0 ? (
        <ul>
          {filteredPages.map((e) => (
            <li key={e.id}>
              <PageItem data={e} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          {searchTerm ? "Hech narsa topilmadi" : "Sahifalar yo'q"}
        </div>
      )}
    </div>
  );
}
