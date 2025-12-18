import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";
import { LayersIcon } from "lucide-react";

export function LayersTab() {
  return (
    <div className="space-y-2 h-full mt-10">
      <Empty className="p-0!">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LayersIcon />
          </EmptyMedia>
          <EmptyTitle>Tez orada</EmptyTitle>
          <EmptyDescription>
            Ushbu bo'lim tez orada tayyor bo'ladi
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
