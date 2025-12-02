import { Input, Separator } from "@repo/ui";
import { PlusIcon } from "lucide-react";

export function PagesTab() {
  return (
    <div className="space-y-2">
      <Input placeholder="Search..." />
      <Separator />
      <div className="flex flex-row justify-between">
        <p className="text-sm">Pages</p>
        <button className="cursor-pointer">
          <PlusIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
